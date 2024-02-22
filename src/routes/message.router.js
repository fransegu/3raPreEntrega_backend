import { Router } from "express";
import { transporter } from "../nodemailers.js";

const router = Router();

router.get("/", async (req, res) => {
  const mailOptions = {
    from: "fran",
    to: "francisco.segu@gmail.com",
    subject: "Succesfull registration",
    text: "Welcome, you have registered succesfully",
  };
  await transporter.sendMail(mailOptions);
  res.send("email enviado");
});

export default router;