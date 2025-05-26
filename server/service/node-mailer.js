import nodemailer from 'nodemailer';
import path from 'path';

const __dirname = path.resolve();

// Email configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // e.g., smtp.gmail.com
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'ashunegi070@gmail.com',
        pass: 'manchester07'
    }
});

export async function sendInvoiceEmail(customerData, invoiceDetails) {
    try {
        const mailOptions = {
            from: '"EkCycle" <your-email@example.com>',
            to: customerData.email,
            subject: `Your Invoice #${invoiceDetails?.invoiceNumber} - Order Confirmation`,
            text: `Dear Valued Customer,\n\nThank you for your order! Your order has been successfully placed.\n\nPlease find attached your invoice for reference.\n\nOrder Details:\nMaterial Type: ${customerData.material}\nQuantity: ${customerData.quantity}\nTotal Amount: $${customerData.pricing.toFixed(2)}\n\nIf you have any questions, please contact our support team.\n\nBest regards,\nEkCycle Team`,
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
                            <li><strong>Total Amount:</strong> $${customerData?.pricing.toFixed(2)}</li>
                            <li><strong>Invoice Number:</strong> ${invoiceDetails?.invoiceNumber}</li>
                        </ul>
                        
                        <p>If you have any questions, please contact our support team.</p>
                        
                        <p style="margin-top: 30px;">Best regards,<br>
                        <strong>EkCycle Team</strong></p>
                        
                        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                            <p>EkCycle Battery Recycling Solutions</p>
                            <p>123 Green Tech Park, Sector 22, Gurugram, Haryana 122001, India</p>
                            <p>Phone: +91 9876543210 | Email: info@ekcycle.com</p>
                        </div>
                    </div>
                `,
            attachments: [
                {
                    filename: invoiceDetails.fileName,
                    path: invoiceDetails.filePath,
                    contentType: 'application/pdf'
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${customerData.email} with invoice ${invoiceDetails.fileName}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

const mockCustomer = {
    material: "Battery Scrap",
    quantity: 100,
    pricing: 4500,
    email: "customer@example.com"
};

const mockInvoice = {
    invoiceNumber: "INV-001",
    fileName: "blackmass_invoice.pdf",
    filePath: "server/blackmass_invoice.pdf"
};

sendInvoiceEmail(mockCustomer, mockInvoice);
