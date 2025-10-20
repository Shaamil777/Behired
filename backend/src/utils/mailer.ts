import nodemailer from "nodemailer"

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);


export const transporter = nodemailer.createTransport({
    
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, // Your sending email address (e.g., 'no-reply@behired.com')
        pass: process.env.EMAIL_PASS  // Your Google App Password or standard password
    }
});


const otpEmailTemplate = (otp: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BeHired OTP</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; background-color: #f4f4f4;">

    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center" style="padding: 20px 0; border-bottom: 1px solid #eeeeee;">
                            <h1 style="color: #1E3A8A; font-size: 24px; margin: 0;">BeHired</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="color: #1F2937; font-size: 22px; margin-top: 0;">Verify Your Email Address</h2>
                            
                            <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
                                Thank you for registering with BeHired. Please use the verification code below to complete your sign-up or process your request.
                            </p>
                            
                            <div style="background-color: #F3F4F6; padding: 20px; border-radius: 6px; text-align: center; margin: 30px 0;">
                                <p style="color: #6B7280; font-size: 14px; margin-bottom: 5px; text-transform: uppercase;">
                                    Your One-Time Password (OTP)
                                </p>
                                <h1 style="color: #10B981; font-size: 40px; margin: 0; letter-spacing: 5px; font-weight: bold;">
                                    ${otp}
                                </h1>
                            </div>

                            <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
                                This code is valid for **5 minutes** only. Please do not share this code with anyone.
                            </p>

                            <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
                                If you did not request this, please ignore this email.
                            </p>
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center" style="padding: 20px 40px; border-top: 1px solid #eeeeee;">
                            <p style="color: #9CA3AF; font-size: 12px; margin: 0;">
                                &copy; ${new Date().getFullYear()} BeHired. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
`;

// 3. Complete the Email Sending Function
export const sentOTPEmail = async (email: string, otp: string) => {
    // 1. Generate the dynamic HTML content
    const htmlContent = otpEmailTemplate(otp);

    const mailOptions = {
        // Corrected 'from' format: sender name, then email in angle brackets
        from: `"BeHired" <${process.env.EMAIL_USER}>`, 
        to: email,
        subject: "Your OTP Code - BeHired",
        html: htmlContent, // <-- NOW correctly using the dynamically generated HTML
    };

    try {
        // 2. Use the transporter to send the mail
        const info = await transporter.sendMail(mailOptions);
        console.log("OTP Email sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending OTP email:", error);
        return { success: false, error: error };
    }
};

/*
    // Example of how to call this function in another file:
    // import { sentOTPEmail } from './mailer';
    // await sentOTPEmail('user@example.com', '123456');
*/