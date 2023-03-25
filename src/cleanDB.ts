import prisma from './prisma'

const main = async () => {
  try {
    await prisma.$connect()
    await prisma.message.deleteMany()
    console.log('Cleaned Database successfully!')
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

console.log('Cleaning DB...')
main()
