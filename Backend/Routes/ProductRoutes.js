const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY); 

router.get('/products', async (req, res) => {
  try {
    const products = await stripe.products.list({
      limit: 10, 
    });

    res.status(200).json({
        success: true,
        products,
        message: "Producs fetched successfully",
      });;
  } catch (err) {
    console.error("Error fetching products from Stripe:", err);
    res.status(500).send('Error fetching products');
  }
});

module.exports = router;
