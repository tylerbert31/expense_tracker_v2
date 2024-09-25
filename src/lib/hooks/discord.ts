import { Client, GatewayIntentBits, TextChannel, NewsChannel } from 'discord.js';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN; // Replace with your bot's token
const env = process.env.ENVIRONMENT;

export const channels = {
    general: '1287663267509960827',
    test_channel: '1287672860780789782',
}

export default function sendDiscordMessage(channelId: string, message: string) {
    console.log("Env : ", env);
    if (env !== "PRODUCTION") {
        channelId = channels.test_channel;
    }

    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });

    client.login(DISCORD_TOKEN);

    client.once('ready', async () => {
        console.log('Discord bot is online!');

        const channel = client.channels.cache.get(channelId);

        if (channel && (channel instanceof TextChannel || channel instanceof NewsChannel)) {
            try {
                await channel.send(message);
                console.log(`Sent message to channel ${channelId}`);
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        } else {
            console.error('Channel not found or is not a text channel');
        }

        client.destroy(); // Properly close the connection
    });

    client.on('error', (error) => {
        console.error('Discord client error:', error);
        client.destroy();
    });
}