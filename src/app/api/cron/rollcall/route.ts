import { NextResponse } from "next/server";
import sendDiscordMessage, { channels } from "@/lib/hooks/discord";

export async function POST() {

    let message =   `@here`;
        message +=  `\nRollcall!`;

    const channelId = channels.general; //General

    await sendDiscordMessage(channelId, message);

    return NextResponse.json({message: "message sent to channel!"},{ status: 200 });
}
