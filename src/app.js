import express from "express";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import cookieRouter from "./routes/cookie.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js"
import session from "express-session";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import MongoStore from 'connect-mongo'

import passport from "passport";
import config from "./config.js"
const URI = config.mongo_uri
const PORT = config.port


import "./config/configDB.js";
import "./passport.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(cookieParser("SecretCookie"));

app.use(
  session({
   store: new MongoStore({
      mongoUrl: config.mongo_uri,
    }),
    secret: "secretSession",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
  );

app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);
app.use("/api/users", usersRouter)

app.listen(PORT, () => {
  console.log("Escuchando al puerto 8080");
});