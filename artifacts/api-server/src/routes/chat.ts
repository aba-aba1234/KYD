import { Router, type IRouter } from "express";
import { db, chatMessagesTable } from "@workspace/db";
import { asc, eq } from "drizzle-orm";
import {
  ListChatMessagesParams,
  SendChatMessageParams,
  SendChatMessageBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/chat/:room/messages", async (req, res) => {
  const { room } = ListChatMessagesParams.parse(req.params);
  const rows = await db
    .select()
    .from(chatMessagesTable)
    .where(eq(chatMessagesTable.room, room))
    .orderBy(asc(chatMessagesTable.createdAt));
  res.json(
    rows.map((r) => ({
      ...r,
      id: String(r.id),
      createdAt: r.createdAt.toISOString(),
    })),
  );
});

router.post("/chat/:room/messages", async (req, res) => {
  const { room } = SendChatMessageParams.parse(req.params);
  const body = SendChatMessageBody.parse(req.body);
  const [row] = await db
    .insert(chatMessagesTable)
    .values({ room, author: body.author, text: body.text })
    .returning();
  res.status(201).json({
    ...row,
    id: String(row.id),
    createdAt: row.createdAt.toISOString(),
  });
});

export default router;
