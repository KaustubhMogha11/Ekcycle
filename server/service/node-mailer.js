import nodemailer from 'nodemailer';
import path from 'path';

const __dirname = path.resolve();

// Email configuration

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "punarchakar@gmail.com",
    pass: "ogvk sswg vgen mjcn",
  },
});

export async function sendInvoiceEmail(customerData, confirmationDetails) {
    try {
        const mailOptions = {
            from: '"PunarChakar" <punarchakar@gmail.com>',
            to: customerData.email,
            subject: `Your Order #${confirmationDetails?.confirmationNumber} - Order Confirmation`,
            text: `Dear Valued Customer,\n\nThank you for your order! Your order has been successfully placed.\n\nPlease find attached order details for reference.\n\nOrder Details:\nMaterial Type: ${customerData.material}\nQuantity: ${customerData.quantity}\nTotal Amount: $${customerData?.totalPrice?.toFixed(2)}\n\nIf you have any questions, please contact our support team.\n\nBest regards,\nPunarChakar Team`,
            html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <h2 style="color: #2e7d32;">Order Successfully Placed!</h2>
                        <p>Dear Valued Customer,</p>
                        <p>Thank you for your order! Your order has been successfully placed.</p>
                        <p>Please find attached your invoice for reference.</p>
                        
                        <h3 style="margin-top: 20px;">Order Summary</h3>
                        <ul>
                            <li><strong>Material Type:</strong> ${customerData?.material}</li>
                            <li><strong>Quantity:</strong> ${customerData?.quantity}</li>
                            <li><strong>Total Amount:</strong> $${customerData?.totalPrice?.toFixed(2)}</li>
                            <li><strong>Invoice Number:</strong> ${confirmationDetails?.confirmationNumber}</li>
                        </ul>
                        
                        <p>If you have any questions, please contact our support team.</p>
                        
                        <p style="margin-top: 30px;">Best regards,<br>
                        <strong>PunarChakar Team</strong></p>
                        
                        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                            <p>PunarChakar Battery Recycling Solutions</p>
                            <p>New Delhi, 122001, India</p>
                            <p>Phone: +91 9876543210 | Email: punarchakar@gmail.com</p>
                        </div>
                    </div>
                `,
            attachments: [
                {
                    filename: confirmationDetails.fileName,
                    path: confirmationDetails.filePath,
                    contentType: 'application/pdf'
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${customerData.email} with invoice ${confirmationDetails.fileName}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
