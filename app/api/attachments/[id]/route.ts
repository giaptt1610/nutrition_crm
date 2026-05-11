import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { attachments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/attachments/[id]">
) {
  const { id } = await ctx.params;
  const result = await db
    .select()
    .from(attachments)
    .where(eq(attachments.id, Number(id)));

  if (result.length === 0) {
    return Response.json({ error: "Attachment not found" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function PUT(
  request: NextRequest,
  ctx: RouteContext<"/api/attachments/[id]">
) {
  const { id } = await ctx.params;
  const body = await request.json();
  const result = await db
    .update(attachments)
    .set(body)
    .where(eq(attachments.id, Number(id)))
    .returning();

  if (result.length === 0) {
    return Response.json({ error: "Attachment not found" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/attachments/[id]">
) {
  const { id } = await ctx.params;
  const result = await db
    .delete(attachments)
    .where(eq(attachments.id, Number(id)))
    .returning();

  if (result.length === 0) {
    return Response.json({ error: "Attachment not found" }, { status: 404 });
  }
  return Response.json({ message: "Deleted" });
}
