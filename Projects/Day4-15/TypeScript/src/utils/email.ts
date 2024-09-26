import nodemailer from "nodemailer";
import config from "../config/env";
import { error, info } from "console";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASS
  }
});

export const welcome = async (email:string, name:string) => {
  const mailOptions = {
    from: config.EMAIL,
    to: email,
    subject: `Welcome to Airbnb, ${name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Welcome to Airbnb, ${name}!</h2>
        <p>We're excited to have you on board. Your journey to discovering amazing places starts here.</p>
        <p>Whether you're looking for a cozy apartment in the heart of the city or a beachside retreat, we've got you covered.</p>
        <p>Here’s what you can do next:</p>
        <ul>
          <li><strong>Explore new destinations:</strong> Browse and discover places around the world.</li>
          <li><strong>Set up your profile:</strong> Complete your profile to help others get to know you.</li>
          <li><strong>Host your own space:</strong> List your property and start earning money!</li>
        </ul>
        <p>We’re here for you every step of the way. If you need help, don’t hesitate to reach out.</p>
        <p>Happy traveling,<br> The Airbnb Team</p>
        <footer style="font-size: 12px; color: #aaa;">
          <p>If you didn’t sign up for an Airbnb account, please ignore this email.</p>
          <p>Airbnb, Inc. | 888 Brannan Street, San Francisco, CA 94103</p>
        </footer>
      </div>`
  };

  // Step 3: Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Welcome email sent: ' + info.response);
    return info.response
  });
}

export async function sendResetLinkMail (email:string, name:string, token:string) {
  const mailOptions = {
    from: 'support@airbnb.com',
    to: email,
    subject: 'Reset Your Airbnb Password',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hello, ${name}</h2>
        <p>We received a request to reset your Airbnb password.</p>
        <p>Please click the link below to reset your password:</p>
        <a href="http://localhost:${config.PORT}/auth/reset/${token}" style="background-color: #ff5a5f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you did not request a password reset, you can safely ignore this email. Your password will not be changed.</p>
        <p>Thank you,<br>The Airbnb Team</p>
        <footer style="font-size: 12px; color: #aaa;">
          <p>Airbnb, Inc. | 888 Brannan Street, San Francisco, CA 94103</p>
        </footer>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Welcome email sent: ' + info.response);
    return info.response
  });
}

// Send password reset confirmation email
export const sendResetConfirmationEmail = async (recipientEmail: string, recipientName: string) => {
  const mailOptions = {
    from: 'support@airbnb.com',
    to: recipientEmail,
    subject: 'Your Airbnb Password Has Been Reset',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hello, ${recipientName}</h2>
        <p>Your Airbnb password has been successfully reset.</p>
        <p>If you did not perform this action, please <a href="https://www.airbnb.com/help">contact our support team</a> immediately.</p>
        <p>Thank you for using Airbnb.<br>We’re here to help if you need anything.</p>
        <p>Best regards,<br>The Airbnb Team</p>
        <footer style="font-size: 12px; color: #aaa;">
          <p>Airbnb, Inc. | 888 Brannan Street, San Francisco, CA 94103</p>
        </footer>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Welcome email sent: ' + info.response);
    return info.response
  });
};

// Send account deletion confirmation email
export const sendAccountDeletionEmail = async (recipientEmail: string, recipientName: string) => {
  const mailOptions = {
    from: 'support@airbnb.com',
    to: recipientEmail,
    subject: 'Your Airbnb Account Has Been Deleted',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hello, ${recipientName}</h2>
        <p>We’re writing to confirm that your Airbnb account has been successfully deleted.</p>
        <p>If you change your mind, you’re always welcome to create a new account with us and continue discovering amazing places and experiences worldwide.</p>
        <p>If you need any further assistance or have any questions regarding your account, please don’t hesitate to <a href="https://www.airbnb.com/help">contact our support team</a>.</p>
        <p>Thank you for being a part of our community. We hope to see you again soon.</p>
        <p>Best regards,<br>The Airbnb Team</p>
        <footer style="font-size: 12px; color: #aaa;">
          <p>Airbnb, Inc. | 888 Brannan Street, San Francisco, CA 94103</p>
        </footer>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Welcome email sent: ' + info.response);
    return info.response
  });
};
