import { NextResponse } from "next/server";
import sendDiscordMessage, { channels } from "@/lib/hooks/discord";

export async function GET() {
  let message = "@here cc: <@680040840592490534>";
  message += "\nThis is a test message from the API.";

  const channelId = channels.test_channel;

  await sendDiscordMessage(channelId, message);

  return NextResponse.json(
    { message: "Test message sent to #test-channel!" },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  // Tinamaran code - temporary
  const data = await req.json();
  const { message, channelId } = data;
  let success = true;
  let status = 200;
  let res = {
    message: "Test message sent to #test-channel!",
    success: success,
  };

  if (!message || !channelId) {
    success = false;
    status = 400;
    res = {
      message: "Message and channelId are required.",
      success: success,
    };
  }

  if (success) {
    try {
      await sendDiscordMessage(channelId, message, true);
    } catch (error) {
      console.error("Error:", error);

      success = false;
      status = 400;
      res = {
        message: "Error sending message to channel.",
        success: success,
      };
    }
  }

  return NextResponse.json(res, { status: status });
}
