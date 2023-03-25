import prisma from './prisma'

const connectDB = async (callback: () => void) => {
  try {
    await prisma.$connect()
    Promise.resolve(callback()).catch((err) => {
      console.error('Unkown Error', err)
    })
  } catch (err) {
    console.error(err)
    prisma.$disconnect()
    process.exit(1)
  }
}

export default connectDB
