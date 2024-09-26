import { Client, GatewayIntentBits, TextChannel, NewsChannel, ChannelType } from 'discord.js';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const env = process.env.ENVIRONMENT;

export const channels = {
    general: '1287663267509960827',
    test_channel: '1287672860780789782',
}

export default async function sendDiscordMessage(channelId: string, message: string, bypass: Boolean = false): Promise<void> {
    console.log("Env:", env);
    if (env !== "PRODUCTION" && !bypass) {
        channelId = channels.test_channel;
    }

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages
        ],
    });

    try {
        console.log("Attempting to log in...");
        await client.login(DISCORD_TOKEN);
        console.log('Discord bot is online!');

        console.log(`Attempting to fetch channel: ${channelId}`);
        const channel = await client.channels.fetch(channelId);
        
        if (!channel) {
            throw new Error(`Channel not found: ${channelId}`);
        }

        console.log(`Channel type: ${channel.type}`);
        if (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.GuildNews) {
            throw new Error(`Channel is not a text channel: ${channelId}`);
        }

        const textChannel = channel as TextChannel | NewsChannel;
        console.log(`Sending message to channel: ${textChannel.name}`);
        await textChannel.send(message);
        console.log(`Successfully sent message to channel ${channelId}`);
    } catch (error) {
        console.error('Error:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Stack trace:', error.stack);
        }
    } finally {
        await client.destroy();
    }
}