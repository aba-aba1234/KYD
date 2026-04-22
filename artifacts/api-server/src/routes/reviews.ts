import { Router, type IRouter } from "express";
import { db, reviewsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/reviews/featured", async (_req, res) => {
  const rows = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.featured, true));
  res.json(rows);
});

export default router;
