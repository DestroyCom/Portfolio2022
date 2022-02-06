require("dotenv").config();

const HTTP = require("http");
const PG = require("pg");
const path = require("path");
//const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

var postgrestClient = null;

setInterval(function () {
  HTTP.get(process.env.HEROKU_APP_URL);
}, 300000);

if (process.env.PROJECT_ENVIRONMENT === "dev") {
  postgrestClient = new PG.Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    host: process.env.PGHOST,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else if (process.env.PROJECT_ENVIRONMENT === "prod") {
  postgrestClient = new PG.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

postgrestClient.connect();

const DISCORDJS = require("discord.js");
const discordClient = new DISCORDJS.Client({
  intents: [
    DISCORDJS.Intents.FLAGS.GUILDS,
    DISCORDJS.Intents.FLAGS.DIRECT_MESSAGES,
    DISCORDJS.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    DISCORDJS.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
});

discordClient.on("ready", () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

/* var whitelist = ["http://localhost:3000", "http://localhost:3001"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions)); */
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());

app.post("/api/sent-message", async (req, res) => {
  const { name, mail, message } = req.body;

  const user = await discordClient.users
    .fetch(process.env.DISCORD_USER_ID)
    .catch(() => null);

  if (!user)
    return res
      .status(500)
      .send("Impossible d'envoyer le message. Raison : User not found");

  const embed = new DISCORDJS.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Message de la part de " + name + " (" + mail + ")")
    .addFields({
      name: "Message :",
      value: message,
    })
    .setTimestamp();

  await user.send({ embeds: [embed] }).catch(() => {
    return res
      .status(500)
      .send(
        "Impossible d'envoyer le message. Raison : User has close the service"
      );
  });

  return res
    .status(200)
    .json({ messageEn: "Message sent", messageFr: "Message envoyé" });
});

app.get("/api/get-project", async (req, res) => {
  const query = {
    text: `SELECT * FROM public.projects ORDER BY random() LIMIT 6`,
  };

  try {
    const result = await postgrestClient.query(query);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

/* app.get("/api", (req, res) => {
  res.json({ message: "Hello this is the server" });
}); */

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

discordClient.login(process.env.DISCORD_TOKEN);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
