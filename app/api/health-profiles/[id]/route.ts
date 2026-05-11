import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { healthProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/health-profiles/[id]">
) {
  const { id } = await ctx.params;
  const result = await db
    .select()
    .from(healthProfiles)
    .where(eq(healthProfiles.id, Number(id)));

  if (result.length === 0) {
    return Response.json(
      { error: "Health profile not found" },
      { status: 404 }
    );
  }
  return Response.json(result[0]);
}

export async function PUT(
  request: NextRequest,
  ctx: RouteContext<"/api/health-profiles/[id]">
) {
  const { id } = await ctx.params;
  const body = await request.json();
  const result = await db
    .update(healthProfiles)
    .set(body)
    .where(eq(healthProfiles.id, Number(id)))
    .returning();

  if (result.length === 0) {
    return Response.json(
      { error: "Health profile not found" },
      { status: 404 }
    );
  }
  return Response.json(result[0]);
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/health-profiles/[id]">
) {
  const { id } = await ctx.params;
  const result = await db
    .delete(healthProfiles)
    .where(eq(healthProfiles.id, Number(id)))
    .returning();

  if (result.length === 0) {
    return Response.json(
      { error: "Health profile not found" },
      { status: 404 }
    );
  }
  return Response.json({ message: "Deleted" });
}
