import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'hieunguyenm2.dev@gmail.com' },
    update: {},
    create: {
        email: 'hieunguyenm2.dev@gmail.com',
        fullName: 'Hieu Nguyen',
        password: "1233455"
    },
  })
  const profileLink = await prisma.profileLink.create({
    data: {
        userId: user.id,
        links: '{"google": "https://google.com/x"}'
    },
  })
  console.log({ user });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });