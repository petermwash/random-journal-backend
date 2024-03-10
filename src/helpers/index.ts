import { getUserEmailsByUid } from "../db/users";
import { getLastDayJournals } from "../db/journals";
import nodemailer from "nodemailer";

require("dotenv").config();

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendEmail = async (jornalEntry: string, receiverEmail: string) => {
  const emailTemplate = `
  <html>
  <body>
    <p>Hello there, </br> here is a journal entry from a fellow user: </br></p>
    ${jornalEntry}
    <p> </br>Enjoy it!</p>
  </body>
  </html>`;
  
  transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: receiverEmail,
    subject: "Random Journal",
    html: emailTemplate
  }, (error, info) => {
      if (error) {
        console.log("error:", error);
      } else {
        console.log('Email Send:' + info.response);
      }
  });
 }

 const shuffleArray = <T>(array: T[]): void => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

 export const randomlyShareJournals = async () => {
    const lastDayEntries = await getLastDayJournals();
    let users = await getUserEmailsByUid(
        lastDayEntries?.map(item => item.author)
    );

    lastDayEntries?.forEach((entry) => {
        const eligibleUsers = users.filter((user) => String(user._id) !== entry.author);

        if (eligibleUsers.length > 0) {
            shuffleArray(eligibleUsers);

            const selectedUser = eligibleUsers[0];
            sendEmail(entry.content, selectedUser.email)

            users = users.filter((user) => user._id !== selectedUser._id);
        }
    })

 }