import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { customers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/customers/[id]">
) {
  const { id } = await ctx.params;
  const result = await db
    .select()
    .from(customers)
    .where(eq(customers.id, Number(id)));

  if (result.length === 0) {
    return Response.json({ error: "Customer not found" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function PUT(
  request: NextRequest,
  ctx: RouteContext<"/api/customers/[id]">
) {
  const { id } = await ctx.params;
  const body = await request.json();
  const result = await db
    .update(customers)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(customers.id, Number(id)))
    .returning();

  if (result.length === 0) {
    return Response.json({ error: "Customer not found" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/customers/[id]">
) {
  const { id } = await ctx.params;
  const result = await db
    .delete(customers)
    .where(eq(customers.id, Number(id)))
    .returning();

  if (result.length === 0) {
    return Response.json({ error: "Customer not found" }, { status: 404 });
  }
  return Response.json({ message: "Deleted" });
}
