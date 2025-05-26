import { validateMaterial } from "../validations/battery-type-validator.js";
import { StatusCodes as HTTP_STATUS } from 'http-status-codes';

export async function generateInvoice(req, res){
    try {
        // Validate the form inputs and all the material fields using Joi
        const { error, value } = validateMaterial(req.body);
        
        // If validation fails return the error with bad request
        if (error) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.details[0].message });
        }
    
        const calculatePrice = calculatePricing(value);
        data = { ...value, totalPrice: calculatePrice.toFixed(2)}
    
        // TODO Ashu: Generate Invoice
        // await generateEBill()
        // TODO Ashu: Send Mail to user
    
        return res.status(HTTP_STATUS.OK).json({
            message: 'Material submitted successfully.',
            data: { ...value, totalPrice: calculatePrice.toFixed(2)}
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message : "Something went wrong"
        })
        
    }
}

const calculatePricing = (data) => {
    const { material, quantity } = data;

    if (material === 'battery_scrap') {
        const rates = { 'lco-s': 120, 'nmc-s': 80, 'lfp-s': 40 };
        return rates[data.battery_type] * quantity;
    }

    if (material === 'second_life') {
        return 80 * quantity;
    }

    if (material === 'blackmass') {
        const coPercent = data.co_percent / 100;
        const niPercent = data.ni_percent / 100;
        const unitPrice = (coPercent * 21.3 * 59) + (niPercent * 15.3 * 59);
        return unitPrice * quantity;
    }

    return 0;
};