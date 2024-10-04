import sendDiscordMessage from "@/lib/hooks/discord";
import { NextResponse } from "next/server";
import axios from "axios";
import { format } from "date-fns";

const FDC_PB_URL = process.env.FDC_PB_URL;
const devs_url = `${FDC_PB_URL}/fdc_devs/records?fields=discord_id`;

export async function POST() {
  let userIds = [];

  if(process.env.ENVIRONMENT == "PRODUCTION"){
    userIds = await fetch(devs_url)
      .then((res) => res.json())
      .then((data) => data.items.map((dev: any) => dev.discord_id));
  } else {
    userIds = ["680040840592490534"];
  }

  const dayNum = Number(format(new Date(), 'i'));
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  let random_beta = {
    id: null,
    name: null
  };


  let message = `<@${userIds.join("> <@")}>`;
  message += '\n```Date: ' + formattedDate;

  if(dayNum !== 5){
    random_beta = await axios.get(`${FDC_PB_URL}/random_lunch_beta/records`)
    .then((res) => res.data.items[0]);

    message += "\nToday's Lunch: " + random_beta.name + "```";
  } else {
    message += "\nToday's Lunch: Pater Friday!```";
  }

  try {
    await sendDiscordMessage("1287663632859140147", message)
      .then(async () => {
        if(process.env.ENVIRONMENT == "PRODUCTION" && dayNum !== 5){
          await axios.post(`${FDC_PB_URL}/fdc_prev_lunch/records`, {
            choice: random_beta.id
          }).then((res) => {
            console.log(res.data);
          });
        }
      });
  } catch (error) {
    //
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
