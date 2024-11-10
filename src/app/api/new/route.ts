import { NextResponse } from "next/server";
import { Expenses, Today } from "@/lib/model/pocketbase";
import type { NextRequest } from "next/server";

const _API_TOKEN = Number(process.env.API_TOKEN);

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { amount, description, API_TOKEN } = data;

  let status = 200;
  let success = true;
  let message = "Success";
  let resData = {};

  if (!API_TOKEN || Number(API_TOKEN) !== _API_TOKEN) {
    success = false;
    status = 401;
    message = "Unauthorized";
  }

  if (!amount || !description || isNaN(Number(amount)) || Number(amount) < 0) {
    success = false;
    status = 400;
    message = "Bad Request";
  }

  if (success) {
    try {
      await Expenses.save({
        amount: Number(amount),
        description: description,
      });

      const total: number = await Today.afterSaveSum();
      resData = { total: total };
    } catch (error) {
      success = false;
      status = 500;
      message = JSON.stringify(error);
    }
  }
  return NextResponse.json(
    { success: success, message: message, ...resData },
    { status: status }
  );
}
