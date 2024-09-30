import sendDiscordMessage from "@/lib/hooks/discord";
import { NextResponse } from "next/server";

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


  const lunchChoices = await fetch(
    `${FDC_PB_URL}/fdc_lunch_choices/records?filter=(id!='${prevLunch}')&fields=name,weight`
  )
    .then((res) => res.json())
    .then((data) => data.items);


  const totalWeight = lunchChoices.reduce(
    (sum: any, choice: any) => sum + choice.weight,
    0
  );
  let randomWeight = Math.random() * totalWeight;

  const selectedChoice = lunchChoices.find((choice: any) => {
    if (randomWeight < choice.weight) {
      return true;
    }
    randomWeight -= choice.weight;
    return false;
  });

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  message += '\n```Date: ' + formattedDate;
  message += "\nToday's Lunch: " + selectedChoice.name + "```";

  try {
    await sendDiscordMessage("1287663632859140147", message);
  } catch (error) {
    //
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
