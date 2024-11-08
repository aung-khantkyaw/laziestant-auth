import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password", 10);
  try {
    console.log("User seed started");

    for (let i = 0; i < 10; i++) {
      const name = faker.person.fullName();
      const username = name.split(" ").join("").toLowerCase();
      const email = `${username}@gmail.com`;
      const verificationToken = faker.string.numeric(6);
      const verificationTokenExpiresAt = faker.date.future();

      await prisma.user.create({
        data: {
          name,
          username,
          email,
          password,
          verificationToken,
          verificationTokenExpiresAt,
        },
      });
    }

    console.log("User seed completed");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
