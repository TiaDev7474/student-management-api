import {PrismaClient} from "@prisma/client";


export const prisma = new PrismaClient()

export async  function connect() {
    await  prisma.$connect()
}

async function disconnect() {
    await prisma.$disconnect()
}
