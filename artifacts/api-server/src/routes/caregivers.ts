import { Router, type IRouter } from "express";
import { db, caregiversTable, reviewsTable } from "@workspace/db";
import { eq, and, lte, ilike } from "drizzle-orm";
import {
  ListCaregiversQueryParams,
  GetCaregiverParams,
  ListCaregiverReviewsParams,
  CreateCaregiverBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Milano: { lat: 45.4642, lng: 9.19 },
  Roma: { lat: 41.9028, lng: 12.4964 },
  Torino: { lat: 45.0703, lng: 7.6869 },
  Bologna: { lat: 44.4949, lng: 11.3426 },
  Firenze: { lat: 43.7696, lng: 11.2558 },
  Napoli: { lat: 40.8518, lng: 14.2681 },
  Verona: { lat: 45.4384, lng: 10.9916 },
  Genova: { lat: 44.4056, lng: 8.9463 },
  Venezia: { lat: 45.4408, lng: 12.3155 },
  Bari: { lat: 41.1171, lng: 16.8719 },
  Palermo: { lat: 38.1157, lng: 13.3615 },
};

const AVATAR_PALETTE = [
  "#cc6a3d",
  "#d4a017",
  "#6b8e6b",
  "#9d6b53",
  "#3d6b8e",
  "#b35c4a",
  "#8a7355",
];

function makeId(name: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${slug || "caregiver"}-${suffix}`;
}

function defaultAvailability() {
  const days = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
  const hours = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];
  return days.map((day) => ({
    day,
    slots: hours.map((hour) => ({ hour, free: day !== "Dom" })),
  }));
}

router.get("/caregivers", async (req, res) => {
  const params = ListCaregiversQueryParams.parse(req.query);
  const conditions = [];
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

router.post("/caregivers", async (req, res) => {
  const body = CreateCaregiverBody.parse(req.body);
  const coords = CITY_COORDS[body.city] ?? { lat: 41.9028, lng: 12.4964 };
  const jitter = () => (Math.random() - 0.5) * 0.04;
  const avatarColor =
    AVATAR_PALETTE[Math.floor(Math.random() * AVATAR_PALETTE.length)];
  const id = makeId(body.name);
  const [row] = await db
    .insert(caregiversTable)
    .values({
      id,
      name: body.name,
      city: body.city,
      bio: body.bio,
      services: body.services,
      pricePerHour: body.pricePerHour,
      rating: 5,
      reviewCount: 0,
      availableNow: true,
      verified: false,
      avatarColor,
      lat: coords.lat + jitter(),
      lng: coords.lng + jitter(),
      radiusKm: body.radiusKm ?? 8,
      certifications: body.certifications ?? [],
      yearsExperience: body.yearsExperience,
      availability: defaultAvailability(),
    })
    .returning();
  res.status(201).json(row);
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
