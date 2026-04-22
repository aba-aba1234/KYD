import { Router, type IRouter } from "express";
import { db, caregiversTable, reviewsTable } from "@workspace/db";
import { eq, and, lte, ilike } from "drizzle-orm";
import {
  ListCaregiversQueryParams,
  GetCaregiverParams,
  ListCaregiverReviewsParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/caregivers", async (req, res) => {
  const params = ListCaregiversQueryParams.parse(req.query);
  const conditions = [];
  if (params.service && params.service !== "all") {
    // services is a JSONB array; filter post-query for simplicity
  }
  if (params.city) {
    conditions.push(ilike(caregiversTable.city, `%${params.city}%`));
  }
  if (params.maxPrice !== undefined) {
    conditions.push(lte(caregiversTable.pricePerHour, params.maxPrice));
  }
  if (params.availableNow) {
    conditions.push(eq(caregiversTable.availableNow, true));
  }
  let rows = await db
    .select()
    .from(caregiversTable)
    .where(conditions.length ? and(...conditions) : undefined);
  if (params.service && params.service !== "all") {
    rows = rows.filter((r) => r.services.includes(params.service as string));
  }
  res.json(rows);
});

router.get("/caregivers/:id", async (req, res) => {
  const { id } = GetCaregiverParams.parse(req.params);
  const [row] = await db
    .select()
    .from(caregiversTable)
    .where(eq(caregiversTable.id, id))
    .limit(1);
  if (!row) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(row);
});

router.get("/caregivers/:id/reviews", async (req, res) => {
  const { id } = ListCaregiverReviewsParams.parse(req.params);
  const rows = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.caregiverId, id));
  res.json(rows);
});

export default router;
