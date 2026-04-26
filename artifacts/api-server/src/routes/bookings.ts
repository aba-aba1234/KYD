import { Router, type IRouter } from "express";
import { db, bookingsTable, caregiversTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { CreateBookingBody } from "@workspace/api-zod";

const router: IRouter = Router();

const COMMISSION_RATE = 0.15;

function generateBookingId(): string {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const a = letters[Math.floor(Math.random() * letters.length)];
  const b = letters[Math.floor(Math.random() * letters.length)];
  const num = Math.floor(Math.random() * 90000) + 10000;
  return `KYD-${a}${b}${num}`;
}

function serializeBooking(row: typeof bookingsTable.$inferSelect) {
  return {
    ...row,
    id: row.id,
    startTime: row.startTime ?? undefined,
    address: row.address ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.createdAt.toISOString(),
  };
}

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
  const subtotal = Math.round(cg.pricePerHour * body.hours * 100) / 100;
  const commission = Math.round(subtotal * COMMISSION_RATE * 100) / 100;
  const total = Math.round((subtotal + commission) * 100) / 100;
  const [row] = await db
    .insert(bookingsTable)
    .values({
      id: generateBookingId(),
      caregiverId: cg.id,
      caregiverName: cg.name,
      familyName: body.familyName,
      service: body.service,
      date: body.date,
      startTime: body.startTime ?? null,
      hours: body.hours,
      address: body.address ?? null,
      subtotal,
      commission,
      total,
      status: "confirmed",
      notes: body.notes ?? null,
    })
    .returning();
  res.status(201).json(serializeBooking(row));
});

router.get("/bookings/recent", async (_req, res) => {
  const rows = await db
    .select()
    .from(bookingsTable)
    .orderBy(desc(bookingsTable.createdAt))
    .limit(20);
  res.json(rows.map(serializeBooking));
});

export default router;
