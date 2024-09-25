import { NextResponse } from "next/server";
import sendDiscordMessage, { channels } from "@/lib/hooks/discord";

export async function POST() {

    let message = `@here\n`;
    message += `Don't forget your worklog! :DDD`;

    const channelId = channels.general; //General

    sendDiscordMessage(channelId, message);

    return NextResponse.json({message: "message sent to channel!"},{ status: 200 });
}
