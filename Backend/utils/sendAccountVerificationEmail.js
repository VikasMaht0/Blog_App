const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

//Load dotenv into process object
dotenv.config();

const sendAccountVerificationEmail = async(to, verificationToken)=>{
    try{
        //create a transport object
        const transport = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:process.env.GMAIL_USER,
                pass:process.env.APP_PWD
            },
             tls: {
              rejectUnauthorized: false, // 👈 ignore self-signed certs
           },
        });
        //Create the message you have to send
        const message = {
            to,
            subject:"Account verification Token",
            html:`<p>You are receiving this email because you (or someone else) have requested to verify your account</p>
            <p>Please click on the following link , or paste this into your browser to complete</p>
            <p>https://localhost:3000/reset-password/${verificationToken}</p>
            <p>If you did not require this ,please ignore this email and your password will remail same </p>`
        };
        //NOw we are going to sent the mail
        const info = await transport.sendMail(message);
        console.log("Email send",info.messageId);
    }catch(error){
       console.error("Nodemailer error details:", error);
       throw new Error("Email sending failed");
    }
};


module.exports = sendAccountVerificationEmail;