const Discord = require('discord.io');
const SlackBot = require('slackbots');
const dotenv = require('dotenv');
dotenv.config();


// =========================
//     DISCORD BOT SETUP
// =========================

// Initialize Discord Bot
const discordBot = new Discord.Client({
   token: `${process.env.DISCORD_TOKEN}`,
   autorun: true
});

discordBot.on('ready', function (evt) {
    console.log(`Discord Bot Connected - Logged in as: ${discordBot.username} (${discordBot.id})`);
});

const discordChannel = `${process.env.DISCORD_CHANNEL}`;



// =========================
//      SLACK BOT SETUP
// =========================

const slackBot = new SlackBot({
	token: `${process.env.SLACK_TOKEN}`,
	name: 'onewordstudios Relay Bot'
});

slackBot.on('error', (err) => {
    console.log(err);
});

slackBot.on('start', () => {
    console.log("Slack Bot Started");
});

// Build lookup table of Slack IDs to Usernames
const slackUsers = new Map();
slackBot.getUsers().then(
	res => res.members.forEach(
		x => slackUsers.set(x.id, x.real_name)
	)
);

const slackChannel = `${process.env.SLACK_CHANNEL}`;



// =========================
//       MESSAGE RELAY
// =========================

// SLACK => DISCORD
slackBot.on("message", (data) => {
	if(data.type !== "message") { return; }
	if(data.subtype === "bot_message") { return; }
	
	const user = slackUsers.get(data.user);
	if(!user) {
		console.log("Unknown Slack User");
		return;
	}
	
	discordBot.sendMessage({
		to: discordChannel,
		message: `**${user}**\n${data.text}`
	});
});

// DISCORD => SLACK
discordBot.on('message', function (user, userID, channelID, message, evt) {
	if(channelID !== discordChannel) { return; }
	if(userID === discordBot.id) { return; }
	
	const userName = discordBot.servers[discordBot.channels[channelID].guild_id].members[userID].nick;
	
	slackBot.postMessageToChannel(
        slackChannel,
        `*${userName ? userName : user}*\n${message}`,
        {}
    );
});