import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { hotels } from "../src/lib/data/hotels";
import { packages } from "../src/lib/data/packages";
import { offers } from "../src/lib/data/offers";

const prisma = new PrismaClient();

async function main() {
  // Demo account for quick sign-in during testing.
  const passwordHash = await bcrypt.hash("password123", 10);
  await prisma.user.upsert({
    where: { email: "demo@flyin.com" },
    update: {},
    create: {
      name: "Demo Traveller",
      email: "demo@flyin.com",
      phone: "+966500000000",
      passwordHash,
    },
  });

  for (const h of hotels) {
    await prisma.hotel.upsert({
      where: { slug: h.slug },
      update: {
        ...h,
        images: JSON.stringify(h.images),
        amenities: JSON.stringify(h.amenities),
      },
      create: {
        ...h,
        images: JSON.stringify(h.images),
        amenities: JSON.stringify(h.amenities),
      },
    });
  }

  for (const p of packages) {
    await prisma.package.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  for (const o of offers) {
    const { validDays, ...rest } = o;
    const validUntil = new Date(Date.now() + validDays * 24 * 60 * 60 * 1000);
    await prisma.offer.upsert({
      where: { slug: o.slug },
      update: { ...rest, validUntil },
      create: { ...rest, validUntil },
    });
  }

  console.log(
    `Seeded ${hotels.length} hotels, ${packages.length} packages, ${offers.length} offers and 1 demo user.`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
