const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {

   
    await prisma.user.deleteMany({
    
    })
    //  const lists =await prisma.list.findMany({
    //   include: {
    //     books:true
    // },
    // })
    // console.log(lists)
    const booklists =await prisma.list.findMany({
      
    })
    console.log(booklists)

    
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