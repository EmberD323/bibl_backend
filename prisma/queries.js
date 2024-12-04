const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function findUserByUsername(username) {
    const user = await prisma.user.findUnique({
        include: {
            lists:true
        },
        where: {
          username,
        },
    })
    return user
}
async function createUser(first_name,last_name,username,password) {
    await prisma.user.create({
        data: {
            first_name,
            last_name,
            username,
            password,
        }})
  
    return 
}

db.getUserId(username);

async function findListByName(name,userId) {
    const list = await prisma.list.findMany({
        include: {
            books:true
        },
        where: {
          name,
          userId
        },
    })
    return list[0]
}
async function createList(name,userId) {
    await prisma.list.create({
        data: {
           name,
           userId 
        }})
    return 
}
async function findLists(userId) {
    const lists = await prisma.list.findMany({
        include: {
            books:{
                include:{
                  book:true
                }
              }
        },
        where: {
          userId
        },
    })
    return lists
}
async function findList(listId) {
    const list = await prisma.list.findUnique({
        include: {
            books:{
                include:{
                  book:true
                }
              }
        },
        where: {
          id:listId
        },
    })
    return list
}
async function addBook(listId,title,firstName,lastName) {
    //check if book exists
    const book = await prisma.book.findMany({
        where: {
            title: title,
            author_first_name:firstName,
            author_last_name:lastName
        },
    })
    let bookId;
    //if it doesnt create book
    if (book[0] == undefined){
        const newBook = await prisma.book.createManyAndReturn({
            data: {
               title,
               author_first_name:firstName,
               author_last_name:lastName
            }})

        bookId = newBook[0].id;
    }
    else{
        bookId = book[0].id;
    }
    //check if book is already on list
    const checkIfOnList = await prisma.booksOnLists.findUnique({
        where: {
            bookId_listId: {
                listId,
                bookId
            },
        },

    })
    if(checkIfOnList){
        console.log("already on list")
        return
    }
    //add book to list
    await prisma.booksOnLists.create({
        data: {
            book:{
                connect: {
                    id:bookId
                }
            },
            list:{
                connect: {
                    id:listId
                }
            }
        },
    });
    
    return 
}
async function deleteBook(listId,bookId) {
    await prisma.booksOnLists.delete({
        where: {
            bookId_listId: {
                listId,
                bookId
            },
        },
    });
}
async function deleteList(id) {
    await prisma.list.delete({
        where: {
          id
        },
    })
    return 
}
async function deleteAllBooksFromList(listId) {
    await prisma.booksOnLists.deleteMany({
        where: {
            listId
        },
    });
}

module.exports = {
    findUserByUsername,
    createUser,
    findListByName,
    createList,
    findLists,
    findList,
    addBook,
    deleteList,
    deleteAllBooksFromList
}
