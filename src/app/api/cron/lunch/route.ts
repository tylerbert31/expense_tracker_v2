import sendDiscordMessage from "@/lib/hooks/discord";
import { NextResponse } from "next/server";
import axios from "axios";

const FDC_PB_URL = process.env.FDC_PB_URL;
const devs_url = `${FDC_PB_URL}/fdc_devs/records?fields=discord_id`;

export async function POST() {
  const userIds = await fetch(devs_url)
    .then((res) => res.json())
    .then((data) => data.items.map((dev: any) => dev.discord_id));

  let message = `<@${userIds.join("> <@")}>`;

  const prevLunch = await fetch(
    `${FDC_PB_URL}/fdc_prev_lunch/records?sort=-created&perPage=1&fields=choice`
  )
    .then((res) => res.json())
    .then((data) => data.items[0].choice);

  const random_beta = await axios.get(`${FDC_PB_URL}/random_lunch_beta/records`)
    .then((res) => res.data.items[0]);

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  message += '\n```Date: ' + formattedDate;
  message += "\nToday's Lunch: " + random_beta.name + "```";

  try {
    await sendDiscordMessage("1287663632859140147", message)
      .then(async () => {
        if(process.env.ENVIRONMENT == "PRODUCTION") {
          await axios.post(`${FDC_PB_URL}/fdc_prev_lunch/records`, {
            choice: random_beta.id
          });
        }
      });
  } catch (error) {
    //
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
