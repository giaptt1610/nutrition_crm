import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { attachments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const result = await db.select().from(attachments);
  return Response.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await db.insert(attachments).values(body).returning();
  return Response.json(result[0], { status: 201 });
}
