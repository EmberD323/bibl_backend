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


async function findListByName(name,userId) {
    const list = await prisma.list.findMany({
        include: {
            books:{
                include:{
                    book:{
                        include:{
                            ratings:{
                                where:{
                                    userId
                                }
                            }
                        }
                    }
                }
            }
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
                  book:{
                    include:{
                        ratings:{
                            where:{
                                userId
                            }
                        }
                    }
                  },
                  list:true
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
                  book:{
                    include:{
                        ratings:{
                            where:{
                                userId
                            }
                        }
                    }
                  },
                  list:true
                }
              }
        },
        where: {
          id:listId
        },
    })
    return list
}
async function addBook(listId,title,name,imageURL,category,description,pageCount,publishDate) {
    //check if book exists
    const book = await prisma.book.findMany({
        where: {
            title: title,
            author_name:name,
        },
    })
    let bookId;
    //if it doesnt create book
    if (book[0] == undefined){
        const newBook = await prisma.book.createManyAndReturn({
            data: {
               title,
               author_name:name,
               imageURL,
               category,
               description,
               pageCount,
               publishDate
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
async function addBookNoList(title,name,imageURL,category,description,pageCount,publishDate) {
    //check if book exists
    const book = await prisma.book.findMany({
        where: {
            title: title,
            author_name:name,
        },
    })
    //if it doesnt create book
    if (book[0] == undefined){
        await prisma.book.create({
            data: {
               title,
               author_name:name,
               imageURL,
               category,
               description,
               pageCount,
               publishDate
        }})
    }
    
    return 
}
async function deleteBook(listId,bookId) {
    const book = await prisma.booksOnLists.findUnique({
        where: {
            bookId_listId: {
                listId,
                bookId
            },
        },
    });
    if(book){
        await prisma.booksOnLists.delete({
            where: {
                bookId_listId: {
                    listId,
                    bookId
                },
            },
        });
    }
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
    return
}
async function findRating(userId,bookId){
    const rating = await prisma.rating.findMany({
        where: {
          userId,
          bookId
        },
    })
    return rating[0]
}
async function updateRating(userId,bookId,rating){
    await prisma.rating.update({
        where: {
          userId_bookId:{
            userId,
            bookId
        },
        },
        data:{
            rating,
            assignedAt:now()
        }
    })
    return
}
async function addRating(userId,bookId,rating){
    console.log(rating)
    const thisRating = await prisma.rating.createManyAndReturn({
        data:{
            rating,
            userId,
            bookId,
            user:{
                connect: {
                    id:userId
                }
            },
            book:{
                connect: {
                    id:bookId
                }
            },
        }
    })
    return thisRating
   
}

module.exports = {
    findUserByUsername,
    createUser,
    findListByName,
    createList,
    findLists,
    findList,
    addBook,
    addBookNoList,
    deleteList,
    deleteAllBooksFromList,
    deleteBook,
    findRating,
    updateRating,
    addRating
}
