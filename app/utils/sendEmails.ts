import nodemailer from "nodemailer";
const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invoice</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        padding: 20px 0;
        background-color: #f8f9fa;
      }
      .logo {
        max-width: 150px;
        height: auto;
      }
      .content {
        padding: 30px 0;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #0066cc;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        margin: 20px 0;
      }
      .button:hover {
        background-color: #0052a3;
      }
      .footer {
        text-align: center;
        padding: 20px;
        background-color: #f8f9fa;
        font-size: 12px;
        color: #666666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">
        <h2>Invoice for {{clientName}}</h2>

        <p>Dear User</p>

        <p>
          I hope this email finds you well. Please find attached your invoice
          attached below
        </p>

        <p>Invoice Details:</p>
        <ul>
          <li>Invoice Number: {{invoiceNumber}}</li>
          <li>Due Date: {{dueDate}}</li>
          <li>Total Amount: {{totalAmount}}</li>
        </ul>

        <p>You can download your invoice by clicking the button below:</p>

        <a href="{{invoiceLink}}" class="button">Download Invoice</a>

        <p>
          If you have any questions or concerns, please don't hesitate to
          contact us.
        </p>

        <p>Thank you for your business!</p>
      </div>
    </div>
  </body>
</html>
`
const updatedEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invoice</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        padding: 20px 0;
        background-color: #f8f9fa;
      }
      .logo {
        max-width: 150px;
        height: auto;
      }
      .content {
        padding: 30px 0;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #0066cc;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        margin: 20px 0;
      }
      .button:hover {
        background-color: #0052a3;
      }
      .footer {
        text-align: center;
        padding: 20px;
        background-color: #f8f9fa;
        font-size: 12px;
        color: #666666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">
        <h2>Updated Invoice for {{clientName}}</h2>

        <p>
          I hope this email finds you well. Please find the updated Invoice attached below
        </p>

        <p>Invoice Details:</p>
        <ul>
          <li>Invoice Number: {{invoiceNumber}}</li>
          <li>Due Date: {{dueDate}}</li>
          <li>Total Amount: {{totalAmount}}</li>
        </ul>

        <p>You can download your invoice by clicking the button below:</p>

        <a href="{{invoiceLink}}" class="button">Download Invoice</a>

        <p>
          If you have any questions or concerns, please don't hesitate to
          contact us.
        </p>

        <p>Thank you for your business!</p>
      </div>
    </div>
  </body>
</html>
`
const reminderEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment Reminder</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        padding: 20px 0;
        background-color: #f8d7da;
      }
      .warning {
        color: #d9534f;
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        margin: 20px 0;
      }
      .content {
        padding: 30px 0;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #d9534f;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        margin: 20px 0;
      }
      .button:hover {
        background-color: #c9302c;
      }
      .footer {
        text-align: center;
        padding: 20px;
        background-color: #f8f9fa;
        font-size: 12px;
        color: #666666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Payment Reminder</h2>
      </div>
      <div class="content">
        <p class="warning">WARNING: PAYMENT OVERDUE</p>

        <p>Dear {{clientName}},</p>

        <p>
          Our records indicate that your invoice <strong>#{{invoiceNumber}}</strong> was due on
          <strong>{{dueDate}}</strong> and remains unpaid.
        </p>

        <p>Invoice Details:</p>
        <ul>
          <li>Invoice Number: {{invoiceNumber}}</li>
          <li>Due Date: {{dueDate}}</li>
          <li>Total Amount: {{totalAmount}}</li>
        </ul>

        <p>Please make the payment immediately to avoid any late fees or service disruptions.</p>

        <a href="mailto:aryansaxenacs@gmail.com" class="button">Contact Us</a>

        <p>
          If you have already made the payment, kindly disregard this message. Otherwise,
          please complete the payment as soon as possible.
        </p>

        <p>Thank you for your prompt attention to this matter.</p>
      </div>
      <div class="footer">
        <p>For any questions, reach out to us at <a href="mailto:aryansaxenacs@gmail.com">aryansaxenacs@gmail.com</a></p>
      </div>
    </div>
  </body>
</html>
`

export const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
    }
})

export async function sendEmail({ to, clientName, invoiceNumber, dueDate, totalAmount, invoiceLink }: {
    to: string;
    clientName: string;
    invoiceNumber: number;
    dueDate: string;
    totalAmount: string;
    invoiceLink: string
}) {
    try {
        const htmlContent = emailTemplate
            .replace("{{clientName}}", clientName)
            .replace("{{invoiceNumber}}", invoiceNumber.toString())
            .replace("{{dueDate}}", dueDate)
            .replace("{{totalAmount}}", totalAmount)
            .replace("{{invoiceLink}}", invoiceLink);

        const info = await transport.sendMail({
            from: "aryansaxenacs@gmail.com",
            to,
            subject: "Invoice of your purchased item",
            html: htmlContent,
        });

        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Email error:", error);
    }
}

export async function sendUpdatedEmail({ to, clientName, invoiceNumber, dueDate, totalAmount, invoiceLink }: {
    to: string;
    clientName: string;
    invoiceNumber: number;
    dueDate: string;
    totalAmount: string;
    invoiceLink: string
}) {
    try {
        const htmlContent = updatedEmailTemplate
            .replace("{{clientName}}", clientName)
            .replace("{{invoiceNumber}}", invoiceNumber.toString())
            .replace("{{dueDate}}", dueDate)
            .replace("{{totalAmount}}", totalAmount)
            .replace("{{invoiceLink}}", invoiceLink);

        const info = await transport.sendMail({
            from: "aryansaxenacs@gmail.com",
            to,
            subject: "Updated Invoice of your purchased item",
            html: htmlContent,
        });

        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Email error:", error);
    }
}

export async function sendReminderEmail({ to, clientName, invoiceNumber, dueDate, totalAmount }: {
  to: string;
  clientName: string;
  invoiceNumber: number;
  dueDate: string;
  totalAmount: string;
}) {
  try {
      const htmlContent = reminderEmailTemplate
          .replace("{{clientName}}", clientName)
          .replaceAll("{{invoiceNumber}}", invoiceNumber.toString())
          .replaceAll("{{dueDate}}", dueDate)
          .replaceAll("{{totalAmount}}", totalAmount)

      const info = await transport.sendMail({
          from: "aryansaxenacs@gmail.com",
          to,
          subject: "Payment Overdue for Invoice",
          html: htmlContent,
      });

      console.log("Email sent:", info.messageId);
  } catch (error) {
      console.error("Email error:", error);
  }
}



