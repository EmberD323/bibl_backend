const db = require("../prisma/queries.js");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const validateList= [
    body("name").trim()
      .isLength({ min: 1, max: 25 }).withMessage(`Last name must be between 1 and 25 characters.`)
      .custom(async value => {
        const list = await db.findListByName(value);
        if (list) {
          throw new Error('List name is already in use');
        }
      }),
    
];
createList =[
    validateList,
    async function (req, res) {
        jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                const userid = authData.user.id;
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json(errors.array())
                }
                let {name} = req.body;
                const list = await db.findListByName(name,userid);
                if (list) {
                    errors = [{msg:"List name is already in use"}]
                    return res.status(400).json(errors)
                }
                await db.createList(name,userid);
                res.sendStatus(200)
            }
        })
    }
]
async function getLists (req, res) {
  jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
      if(err){
          res.sendStatus(403)
      }else{
        const userid = authData.user.id;
        const lists = await db.findLists(userid);
        res.json(lists);
      }   
  })
}

async function getList (req, res) {
    jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
          const listId = Number(req.params.listId);
          const list = await db.findList(listId);
          res.json(list);
        }   
    })
  }
async function listAddBook (req, res) {
    jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            const listId = Number(req.params.listId);
            let {title,name,imageURL,averageRating,category,description,pageCount,publishDate} = req.body;
            await db.addBook(listId,title,name,imageURL,averageRating,category,description,pageCount,publishDate);
            res.sendStatus(200)
        }   
    })
}
async function listDeleteBook (req, res) {
    jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            const listId = Number(req.params.listId);
            const bookId = Number(req.params.bookId);
            await db.deleteBook(listId,bookId);
            res.sendStatus(200)

        }   
    })
}
async function deleteList (req, res) {
  jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
      if(err){
          res.sendStatus(403)
      }else{
        const listId = Number(req.params.listId);
        await db.deleteAllBooksFromList(listId);
        await db.deleteList(listId);
        res.sendStatus(200)

      }   
  })
}
// async function Name (req, res) {
//   jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
//       if(err){
//           res.sendStatus(403)
//       }else{
        
//       }   
//   })
// }

module.exports = {
    createList,
    getLists,
    getList,
    listAddBook,
    listDeleteBook,
    deleteList

  
};