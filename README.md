# Discord ↔️ Slack Relay Bot

Relays messages between our Discord and Slack channels.

## Getting Started

Requires Node.js to run.

`npm install` to grab dependencies, then `npm start` to setup.

Requires a `.env` file with the following variables:

- `SLACK_TOKEN`, API token from Slack
- `SLACK_CHANNEL`, name of target channel in Slack workspace
- `DISCORD_TOKEN`, API token from Discord
- `DISCORD_CHANNEL`, id (NOT name) of target channel in Discord server

You'll also need to grant permissions to the bot, once you have it hosted somewhere, in both Slack and Discord.

## Usage

Will automatically broadcast messages received in either the target Slack or Discord channel into the other.

Does not handle formatting particularly nicely. Intended really for plain text.
