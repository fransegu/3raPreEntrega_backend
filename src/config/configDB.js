import mongoose from "mongoose";
import config from "../config.js"
const URI = config.mongo_uri


mongoose
.connect(URI)
.then(()=> console.log ("Conectado a DB"))
.catch((error)=> console.log (error));