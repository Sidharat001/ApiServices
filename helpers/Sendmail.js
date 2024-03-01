const nodemailer = require("nodemailer");
const HttpsStatus = require("../HttpsStatus/HttpsStatusCode")
const {registerMailBody} = require("./mailBody")

const sendMail = async function sendMail(req) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "dr.sidharat@gmail.com",
                pass: "zqnzkouwvyffcxfx",
            },
        });   

        // create mailBody Template
        const { htmlBody, textBody } = registerMailBody(req);

        // create mailOptions 
        const mailOptions = {
            from: 'Codexces@infotec.solution.com',
            to: `${req?.email}`,
            subject: `Welcome to ShopYourTrip - Your Registration is Complete! [${req.username}]`,
            text: textBody,
            // html: htmlBody,
        };
        const info = await transporter.sendMail(mailOptions);
        return { status: HttpsStatus.OK, success: true, message: "Registration mail sent successfully" };
        // Code comment: Karthik 2-Feb-2024
        // await transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         return ({status: error.responseCode, success: false, message: error.message});
        //     } else {
        //         return ({status: HttpsStatus.OK, success: true, message: "Registration mail sent successfully"});
        //     }
        // });
    } catch (error) {
        console.error(error);
        return { status: HttpsStatus.Internal_Server_Error, success: false, message: "Error occurred while sending registration mail" };
    }

};


module.exports = sendMail