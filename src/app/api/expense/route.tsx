import { NextResponse } from "next/server";
import { Expenses } from "@/lib/model/pocketbase";

export async function POST(req: Request) {
  const { page } = await req.json();
  const items: any = await Expenses.findPaginated(page, 10, {
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
