import { NextRequest, NextResponse } from "next/server";
import {
  Today,
  ThisWeek,
  ThisMonth,
  PastWeek,
  PastMonth,
} from "@/lib/model/pocketbase";

export async function GET(req: NextRequest) {
  const today = await Today.getToday();
  return NextResponse.json({ data: today }, { status: 200 });
}
