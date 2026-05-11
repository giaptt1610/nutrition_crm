import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { measurements } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/measurements/[id]">
) {
  const { id } = await ctx.params;
  const result = await db
    .select()
    .from(measurements)
    .where(eq(measurements.id, Number(id)));

  if (result.length === 0) {
    return Response.json({ error: "Measurement not found" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function PUT(
  request: NextRequest,
  ctx: RouteContext<"/api/measurements/[id]">
) {
  const { id } = await ctx.params;
  const body = await request.json();
  const result = await db
    .update(measurements)
    .set(body)
    .where(eq(measurements.id, Number(id)))
    .returning();

  if (result.length === 0) {
    return Response.json({ error: "Measurement not found" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/measurements/[id]">
) {
  const { id } = await ctx.params;
  const result = await db
    .delete(measurements)
    .where(eq(measurements.id, Number(id)))
    .returning();

  if (result.length === 0) {
    return Response.json({ error: "Measurement not found" }, { status: 404 });
  }
  return Response.json({ message: "Deleted" });
}
