import { db } from "@/lib/db";
import { events } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Wrzucamy dane prosto do bazy
    const newEvent = await db.insert(events).values({
      userId: body.userId, // Tu podaj ręcznie ID z bazy/Clerka
      text: body.text,
      duration: body.duration,
      slug: body.slug,
      description: body.description,
    }).returning(); // .returning() zwraca nam to, co właśnie stworzyliśmy

    return NextResponse.json({ success: true, data: newEvent });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}