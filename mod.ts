import * as slash from "https://code.harmony.rocks/v2.0.0/deploy";

// Pick up TOKEN and PUBLIC_KEY from ENV.
slash.init({ env: true });

const ACTIVITIES: {
  [name: string]: {
    id: string;
    name: string;
  };
} = {
  watchTogether: {
    id: "880218394199220334",
    name: "Watch Together",
  },
  blazing: {
    id: "832025144389533716",
    name: "Blazing 8s",
  },
  knowWhat: {
    id: "950505761862189096",
    name: "Know What I Meme",
  },
  askAway: {
    id: "976052223358406656",
    name: "Ask Away",
  },
  bobbleLeague: {
    id: "947957217959759964",
    name: "Bobble League (Requires Boost Level 1)",
  },
  bashOut: {
    id: "1006584476094177371",
    name: "Bash Out (Requires Boost Level 1)",
  },
  sketchHeads: {
    id: "902271654783242291",
    name: "Sketch Heads (Requires Nitro)",
  },
  puttParty: {
    id: "945737671223947305",
    name: "Putt Party (Requires Nitro)",
  },
  pokerNight: {
    id: "755827207812677713",
    name: "Poker Night (Requires Nitro)",
  },
  chess: {
    id: "832012774040141894",
    name: "Chess In The Park (Requires Nitro)",
  },
  landIo: {
    id: "903769130790969345",
    name: "Land-io (Requires Nitro)",
  },
  spellCast: {
    id: "852509694341283871",
    name: "SpellCast (Requires Nitro)",
  },
  letterLeague: {
    id: "879863686565621790",
    name: "Letter League (Requires Nitro)",
  },
  checkers: {
    id: "832013003968348200",
    name: "Checkers in the Park (Requires Nitro)",
  },
};

const commands = [
   {
     name: "invite",
     description: "Invite me to your server.",
   },
   {
     name: "activity",
     description: "Start an Activity in a Voice Channel.",
     options: [
      {
        name: "channel",
        type: "CHANNEL",
        description: "Voice Channel to start activity in.",
        required: true,
      },
      {
        name: "activity",
        type: "STRING",
        description: "Activity to start.",
        required: true,
        choices: Object.entries(ACTIVITIES).map((e) => ({
          name: e[1].name,
          value: e[0],
        })),
      },
    ],
  },
];

// Create Slash Commands if not present
slash.commands.all().then((e) => {
  let cmd;
  if (
    e.size !== commands.length || 
    !(cmd = e.find(e => e.name === "activity")) 
    || cmd?.options[1]?.choices?.length !== Object.keys(ACTIVITIES)
    || cmd.options[1].choices.some(e => ACTIVITIES[e.value] !== e.name)
  ) {
    slash.commands.bulkEdit(commands);
  }
});

slash.handle("activity", (d) => {
  if (!d.guild) return;
  const channel = d.option<slash.InteractionChannel>("channel");
  const activity = ACTIVITIES[d.option<string>("activity")];
  if (!channel || !activity) return;
  
  if (channel.type !== slash.ChannelTypes.GUILD_VOICE) {
    return d.reply("Activities can only be started in Voice Channels!", {
      ephemeral: true,
    });
  }

  // POST /channels/{channel.id}/invites
  // with target_type: 2,
  // and target_appliation_id: app_id of activity
  
  // Wanna curl?
  /* 
     curl -X POST \
       -H "Authorization: Bot $TOKEN" \
       -H "Content-Type: application/json" \
       https://discord.com/api/v9/channels/$CHANNEL_ID/invites \
       -d "{ \"max_age\": 604800, \"max_uses\": 0, \"target_type\": 2, \"target_application_id\": \"$APP_ID\", \"temporary\": false }"
  */
  return slash.client.rest.api.channels[channel.id].invites
    .post({
      max_age: 604800,
      max_uses: 0,
      target_application_id: activity.id,
      target_type: 2,
      temporary: false,
    })
    .then((inv) => {
      return d.reply(
        `[Click here to start ${activity.name} in ${channel.name}.](<https://discord.gg/${inv.code}>)`
      );
    })
    .catch((e) => {
      console.error("Starting Activity Failed", e);
      return d.reply("Failed to start Activity.", { ephemeral: true });
    });
});

slash.handle("invite", (d) => {
  return d.reply(
    `> [Click Me to invite.](<https://discord.com/api/oauth2/authorize?client_id=911444805618401290&permissions=1025&scope=applications.commands%20bot>)\n` +
      `> [Source Code.](<https://github.com/MJ1532/ActivitiesBots>)\n` +
      `> Originally made by [Advaith](<https://github.com/advaith1/Activities>) and [DjDeveloper](<https://github.com/DjDeveloperr/ActivitiesBot>).`,
    { ephemeral: true },
  );
});

// Handle for any other commands received.
slash.handle("*", (d) => d.reply("Unhandled Command", { ephemeral: true }));
// Log all errors.
slash.client.on("interactionError", console.error);
