import sqlite3 from "sqlite3"
import { open } from "sqlite"

async function setup() {
    const db = await open({
        filename: "./shopifyData.db",
        driver: sqlite3.Database,
    })

    await db.migrate({
        migrationsPath: "./migrations",
    })

    console.log("Database setup completed.")
}

setup().catch(console.error)
