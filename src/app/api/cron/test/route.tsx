import { NextResponse } from "next/server";
import sendDiscordMessage, { channels } from "@/lib/hooks/discord";

export async function GET() {

    let message = '@here cc: <@680040840592490534>';
    message += '\nThis is a test message from the API.';

    const channelId = channels.test_channel;

    await sendDiscordMessage(channelId, message);

    return NextResponse.json({message: "Test message sent to #test-channel!"},{ status: 200 });
}

export async function POST(req: Request) {
    // Tinamaran code - temporary
    const data = await req.json();
    const { message, channelId } = data;

    if(!message || !channelId) {
        return NextResponse.json({message: "Missing message or channelId."},{ status: 400 });
    }

    try {
        await sendDiscordMessage(channelId, message, true);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({message: "Error sending message.", error: error},{ status: 400 });
    }

    return NextResponse.json({message: `Test message sent to ${channelId}`},{ status: 200 });
}
