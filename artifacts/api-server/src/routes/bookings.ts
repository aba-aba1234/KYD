import { Router, type IRouter } from "express";
import { db, bookingsTable, caregiversTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { CreateBookingBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/bookings", async (req, res) => {
  const body = CreateBookingBody.parse(req.body);
  const [cg] = await db
    .select()
    .from(caregiversTable)
    .where(eq(caregiversTable.id, body.caregiverId))
    .limit(1);
  if (!cg) {
    res.status(404).json({ message: "Caregiver not found" });
    return;
  }
  const total = Math.round(cg.pricePerHour * body.hours * 1.05 * 100) / 100;
  const [row] = await db
    .insert(bookingsTable)
    .values({
      caregiverId: cg.id,
      caregiverName: cg.name,
      familyName: body.familyName,
      service: body.service,
      date: body.date,
      hours: body.hours,
      total,
      status: "confirmed",
      notes: body.notes ?? null,
    })
    .returning();
  res.status(201).json({
    ...row,
    id: String(row.id),
    createdAt: row.createdAt.toISOString(),
  });
});

router.get("/bookings/recent", async (_req, res) => {
  const rows = await db
    .select()
    .from(bookingsTable)
    .orderBy(desc(bookingsTable.createdAt))
    .limit(20);
  res.json(
    rows.map((r) => ({
      ...r,
      id: String(r.id),
      createdAt: r.createdAt.toISOString(),
    })),
  );
});

export default router;
