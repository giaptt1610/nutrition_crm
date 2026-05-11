import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { customers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const result = await db.select().from(customers);
  return Response.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await db.insert(customers).values(body).returning();
  return Response.json(result[0], { status: 201 });
}
