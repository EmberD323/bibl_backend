const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
        first_name:"TEST",
        last_name:"TEST",
        username:"TEST@test.com",
        password:"hashedPassword",
    }})
  // await prisma.rating.deleteMany({
    
  // })  
  // await prisma.book.delete({
  //   where:{
  //     id:21
  //   }
  // })
  // const books =await prisma.user.findMany({
  //   include:{
  //     lists:{
  //       include:{
  //         books:true
  //       }
  //     }
  //   }
      
  //   })
  //   console.log(books)

  //   console.log(books[1].lists[0].books)
  // await prisma.user.delete({
  //   where:{
  //     id:7
  //   }
    
  //   })
    //  const lists =await prisma.list.findMany({
    //   include: {
    //     books:true
    // },
    // })
    // console.log(lists)
    // const booklists =await prisma.list.findMany({
      
    // })
    // console.log(booklists)
  // const lists =await prisma.list.findMany({
  //     include: {
  //       books:true
  //   },
  //   })
  //   console.log(lists)
    // const books =await prisma.book.findMany({
    //   include: {
    //     lists:true
    // },
    // })
    // console.log(books)
    
  // const users =await prisma.user.findMany({
  //     include: {
  //       lists:true
  //   },
  //   })
  //   console.log(users)
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