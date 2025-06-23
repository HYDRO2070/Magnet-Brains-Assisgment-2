const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_KEY);
const Order = require('../models/orders');

router.post('/create-checkout-session', async (req, res) => {
  const { cartItems, email } = req.body;

  const line_items = cartItems.map(item => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: item.card.title,
        images: [item.card.image],
      },
      unit_amount: parseInt(item.card.price) * 100,
    },
    quantity: item.value,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: email,
      metadata: {
        productIds: cartItems.map(item => item.card.id).join(','),
        totalAmount: cartItems.reduce((sum, item) => sum + (item.card.price * item.value), 0),
      },
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment failed.' });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log("just got checkouts")
    const newOrder = new Order({
      name: session.customer_details?.name || 'Guest',
      email: session.customer_email,
      stripeProductIds: session.metadata?.productIds?.split(',') || [],
      quantity: 1,
      status: 'Completed',
      totalAmount: parseInt(session.metadata?.totalAmount || '0'),
    });
console.log(newOrder, "newOrder")
    await newOrder.save();
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object;
    console.log("just got checkouts failed")

    const failedOrder = new Order({
      name: session.customer_details?.name || 'Guest',
      email: session.customer_email,
      stripeProductIds: [],
      quantity: 0,
      status: 'Failed',
      totalAmount: 0,
    });
    console.log(failedOrder, "failedOrder")

    await failedOrder.save();
  }

  res.status(200).json({ received: true });
});

module.exports = router;
