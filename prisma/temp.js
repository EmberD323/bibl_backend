const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {

   
    // await prisma.book.deleteMany({
    
    // })
    //  const lists =await prisma.list.findMany({
    //   include: {
    //     books:true
    // },
    // })
    // console.log(lists)
    // const booklists =await prisma.booksOnLists.findMany({
    //   include: {
    //     book:true,
    //     list:true
    // },
    // })
    // console.log(booklists)

    const list = await prisma.list.findUnique({
      include: {
          books:{
            include:{
              book:true
            }
          }
      },
      where: {
        id:1
      },
  })
  console.log(list.books[0])
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })