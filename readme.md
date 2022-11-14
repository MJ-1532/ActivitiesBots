# Discord Activities Bot V2
A simple slash command bot for opening Discord voice channel activities, Using [Harmony](https://github.com/harmonyland/harmony) and [Deno Deploy](https://deno.com/deploy).

**[Add the bot](https://discord.com/api/oauth2/authorize?client_id=911590387859226645&permissions=1025&scope=applications.commands%20bot)**  

After adding, use `/activity`

Bot code is in [mod.ts](https://github.com/MJ1532/ActivitiesBots/blob/main/mod.ts)

Originaly Made By [Advaith](https://github.com/advaith1/Activities).

## Deployments
This bot is deployed to [Deno Deploy](https://deno.com/deploy). You can also deploy it yourself in few clicks!

- [Click here to Deploy.](https://dash.deno.com/new?url=https://raw.githubusercontent.com/MJ1532/ActivitiesBots/main/mod.ts&env=TOKEN,PUBLIC_KEY). Go to [Discord Developer Portal](https://discord.com/developers/applications). and enter your bots token (Bot -> Copy Token) and public key (General Information -> Copy Public Key).
- Add the project's domain to Interactions Endpoint URL in Developer Portal. (General Informations -> Interactions Endpoint Url
- Invite your bot from URL `https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&permissions=1025&scope=bot%20applications.commands` and don't forget to replace `YOUR_CLIENT_ID_HERE` with the bot's Applications ID

## Tutorials
- Tutorials Can Be Found [Here](https://youtu.be/CyTwfTmF0O0).

### But why bot scope?

Application's bot user must be in the guild to create activity invite.

## Legal

- [MIT License](https://github.com/MJ1532/ActivitiesBots/blob/main/LICENSE)

Copyright 2022 © MJ1532.
