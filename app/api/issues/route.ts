import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssuesSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssuesSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newIssue = await prisma.post.create({
    data: { title: body.title, decription: body.decription },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
