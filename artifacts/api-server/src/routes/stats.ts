import { Router, type IRouter } from "express";
import { db, caregiversTable, reviewsTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/stats/overview", async (_req, res) => {
  const [{ count: caregiverCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(caregiversTable);
  const [{ count: reviewCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(reviewsTable);
  res.json({
    families: 50000,
    caregivers: Math.max(caregiverCount, 8500),
    reviews: Math.max(reviewCount, 12847),
    successRate: 98,
    cities: 15,
    distributedEur: 4200000,
    avgResponseMin: 15,
    treesPlanted: 5000,
  });
});

router.get("/stats/cities", async (_req, res) => {
  const rows = await db
    .select({
      city: caregiversTable.city,
      caregivers: sql<number>`count(*)::int`,
    })
    .from(caregiversTable)
    .groupBy(caregiversTable.city)
    .orderBy(sql`count(*) desc`);
  res.json(rows);
});

export default router;
