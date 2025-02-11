import { readdir } from "fs/promises";
import { resolve, extname, join } from "path";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Running seeders...");

  try {
    // Path ke folder seeds
    const seedsPath = resolve(__dirname);

    // Membaca semua file di folder seeds
    const files = await readdir(seedsPath);

    // Memfilter hanya file seeder (.ts atau .js)
    const seederFiles = files.filter((file) =>
      [".ts", ".js"].includes(extname(file))
    );

    // Menjalankan semua file seeder
    for (const file of seederFiles) {
      if (file !== "seed.ts") {
        const seederPath = join(seedsPath, file);

        console.log(`Running seeder: ${seederPath}`);
        const seeder = await import(seederPath);

        if (typeof seeder.default === "function") {
          await seeder.default(prisma);
        } else {
          console.warn(`Seeder ${file} tidak memiliki ekspor default.`);
        }
      }
    }

    console.log("All seeds completed.");
  } catch (error) {
    console.error("Error running seeders:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
