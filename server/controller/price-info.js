// Get price information based on material type and battery type
export const getPriceInfo = async (req, res) => {
  try {
    const { materialType, batteryType } = req.query;

    if (!materialType) {
      return res.status(400).json({
        success: false,
        message: 'Material type is required'
      });
    }

    // Build query object
    const query = { materialType };
    if (batteryType) {
      query.batteryType = batteryType;
    }

    // Find matching price info
    const priceInfo = await PriceInfo.find(query)
      .sort({ updatedAt: -1 }) // Get the most recent entries first
      .limit(1); // Get only the most recent one

    if (!priceInfo || priceInfo.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No pricing information found for the specified criteria'
      });
    }

    res.status(200).json({
      success: true,
      data: priceInfo[0]
    });

  } catch (error) {
    console.error('Error fetching price info:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching price information',
      error: error.message
    });
  }
};

// Create or update price information (for admin use)
export const createOrUpdatePriceInfo = async (req, res) => {
  try {
    const { materialType, batteryType, basePrice, pricePerUnit, unit } = req.body;

    if (!materialType || basePrice === undefined || pricePerUnit === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Material type, base price and price per unit are required'
      });
    }

    // Check if price info already exists
    const query = { materialType };
    if (batteryType) query.batteryType = batteryType;

    let priceInfo = await PriceInfo.findOne(query);

    if (priceInfo) {
      // Update existing record
      priceInfo.basePrice = basePrice;
      priceInfo.pricePerUnit = pricePerUnit;
      if (unit) priceInfo.unit = unit;
    } else {
      // Create new record
      priceInfo = new PriceInfo({
        materialType,
        batteryType,
        basePrice,
        pricePerUnit,
        unit: unit || 'kg'
      });
    }

    await priceInfo.save();

    res.status(200).json({
      success: true,
      message: 'Price information saved successfully',
      data: priceInfo
    });

  } catch (error) {
    console.error('Error saving price info:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving price information',
      error: error.message
    });
  }
};
