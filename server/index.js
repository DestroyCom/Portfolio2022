require("dotenv").config();

const HTTP = require("http");
const PG = require("pg");
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const helmet = require("helmet");

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
    ssl: false,
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
    DISCORDJS.GatewayIntentBits.Guilds,
    DISCORDJS.GatewayIntentBits.DirectMessages,
    DISCORDJS.GatewayIntentBits.DirectMessageTyping,
    DISCORDJS.GatewayIntentBits.DirectMessageReactions,
  ],
});

discordClient.on("ready", () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());
app.use(helmet());

app.post("/api/sent-message", async (req, res) => {
  const { name, mail, message } = req.body;

  const user = await discordClient.users
    .fetch(process.env.DISCORD_USER_ID)
    .catch(() => null);

  if (!user)
    return res
      .status(500)
      .send("Impossible d'envoyer le message. Raison : User not found");

  const embed = new DISCORDJS.EmbedBuilder()
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

app.get("/api/get-single-project", async (req, res) => {
  const { projectId } = req.query;
  const query = {
    text: `SELECT * FROM public.projects WHERE id = ${projectId}`,
  };

  try {
    const result = await postgrestClient.query(query);
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/get-social-links", async (req, res) => {
  const query = {
    text: `SELECT * FROM public.sociallinks`,
  };

  try {
    const result = await postgrestClient.query(query);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello this is the server",
    ip: req.headers.host,
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

discordClient.login(process.env.DISCORD_TOKEN);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
