const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const { Client } = require("pg");
const os = require("os");
//init app
const PORT = process.env.PORT || 4000;
const app = express();

// connect to redis
const Redis_PORT = 6379;
const Redis_HOST = "redis";
const redisClint = redis.createClient({
  url: `redis://${Redis_HOST}:${Redis_PORT}`,
});
redisClint.on("error", (err) => console.log("Redis Client Error", err));
redisClint.on("connect", () => console.log("connected to redis..."));
redisClint.connect();

//connect to postgres DB

//const DB_USER = "root";

//const DB_PASSWARD = "example";
//const DB_PORT = 5432;
//const DB_HOST = "postgres";
//
//const URI = `postgresgl://${DB_USER}:${DB_PASSWARD}@${DB_HOST}:${DB_PORT}`;
//const client = new Client({
//  connectionString: URI,
//});
//client
//  .connect()
//  .then(() => console.log("connected to postgres DB ..."))
//  .catch((err) => console.log("falid to connected to postgres DB ... ", err));

const DB_USER= 'root';
const DB_PASSWARD= 'example';
const DB_PORT =27017;
const DB_HOST ='mongo'

//const URI=`mongodb://${DB_USER}:${DB_PASSWARD}@${DB_HOST}:${DB_PORT}`
//mongoose.connect(URI).then(()=>console.log('connected to DB ...')).catch((err)=>console.log('falid to connected to DB ... ',err));
app.get("/", (req, res) => {
  redisClint.set("product", "product...");
  console.log(`traffic from ${os.hostname}`)
  res.send("Hello, World! alezz in dev");
});

app.get("/data", async (req, res) => {
  const product = await redisClint.get("prduct");

  res.send(`Hello, World!hi hi hi hi alezz in dev <h1>${product}</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
