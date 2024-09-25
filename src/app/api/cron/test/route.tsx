import { NextResponse } from "next/server";
import sendDiscordMessage, { channels } from "@/lib/hooks/discord";

export async function GET() {

    let message = '@here cc: <@680040840592490534>';
    message += '\nThis is a test message from the API.';

    const channelId = channels.test_channel;

    await sendDiscordMessage(channelId, message);

    return NextResponse.json({message: "Test message sent to #test-channel!"},{ status: 200 });
}
