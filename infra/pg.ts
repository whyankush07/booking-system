import { Pool } from "pg";
import * as path from "path";
import * as fs from "fs";

export class DB {
    client: Pool;

    constructor(dbUrl: string) {
        this.client = new Pool({
            connectionString: dbUrl,
            max: 25,
            idleTimeoutMillis: 30000
        });
    }

    async runMigrations() {
        const migDir = path.join(__dirname, "..", "migrations");
        const files = fs.readdirSync(migDir).filter((f) => f.endsWith(".sql")).sort();

        for (const file of files) {
            const filePath = path.join(migDir, file);
            console.log(`Running db migrations on ${filePath}`);
            const data = fs.readFileSync(filePath, "utf-8");
            await this.client.query(data);
        }

        console.log("Database migration completed!!");
    }

    async close() {
        await this.client.end();
    }
}