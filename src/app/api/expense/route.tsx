import { NextRequest, NextResponse } from "next/server";
import { Expenses } from "@/lib/model/pocketbase";

export async function GET(req: NextRequest) {
  const items: any = await Expenses.findPaginated(10, {
    sort: "-created",
    filter: "type = false",
    cache: "no-store",
  });
  return NextResponse.json(
    {
      data: items,
    },
    { status: 200 }
  );
}
