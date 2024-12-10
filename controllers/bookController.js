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
async function getBooks (req, res) {
    jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            const books = await db.findBooksNotOnUsersLists();
            res.json(books);
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
            let {title,name,imageURL,category,description,pageCount,publishDate} = req.body;
            await db.addBook(listId,title,name,imageURL,category,description,Number(pageCount),publishDate);
            res.sendStatus(200)
        }   
    })
}
async function addBook (req, res) {
    jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            let {title,name,imageURL,category,description,pageCount,publishDate} = req.body;
            await db.addBookNoList(title,name,imageURL,category,description,Number(pageCount),publishDate);
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
async function deleteBookAllUserLists (req, res) {
    jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            const userid = authData.user.id;
            const bookId = Number(req.params.bookId);
            const lists = await db.findLists(userid);
            await Promise.all(lists.map(async (list) => {
                await db.deleteBook(list.id,bookId);
            }))
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
async function rateBook (req, res) {
    jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            const userid = authData.user.id;
            const bookId = Number(req.params.bookId);
            const rating = Number(req.body.rating);

             //check if rating exists
            const ratingCheck = await db.findRating(userid,bookId);
            console.log(ratingCheck)
            
            //if yes - update
            if(ratingCheck){
                console.log("hi")
                await db.updateRating(userid,bookId,rating);
                console.log("hii")
                res.sendStatus(200)

            }else{//if no - new
                let thisRating = await db.addRating(userid,bookId,rating);
                res.sendStatus(200)

            }

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
    deleteList,
    addBook,
    deleteBookAllUserLists,
    rateBook,
    getBooks

  
};