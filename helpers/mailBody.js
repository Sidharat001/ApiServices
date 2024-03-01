const registerMailBody = (req) => {

    const htmlBody = `
        <html>
        <body>
            <form action="http://localhost:8080/confirm?id=${req?.username}" method="GET">
                <button type="submit">Confirm Registration</button>
            </form>
        </body>
        </html>
    `;

    const textBody =  `
        User Register successfully

        Dear ${req.name},

        We are thrilled to welcome you to ShopYourTrip, your one-stop destination for all your travel needs.

        Your account registration is now complete. Here are your account details:
        UserName   :   ${req?.username}
        Name       :   ${req?.name}
        Password   :   ${req?.password}
        Email      :   ${req?.email}
        Status     :   Success

        Our dedicated support team is available 24/7 to assist you. If you have any questions or need assistance, you can reach us:
        Via email: contact@shopyourtrip.com
        By phone: 9999442804 / 9166868837

        Thank you for choosing ShopYourTrip. We look forward to serving you on your upcoming travel adventures!

        Best regards,
        ShopYourTrip Team
    `
    return { htmlBody, textBody };
};

module.exports = { registerMailBody }