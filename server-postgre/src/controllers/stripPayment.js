const express = require('express');
const stripe = require('stripe')('sk_test_51NlvpPI7GjHXBvB4QXekn4GwmVuMOVSz8QFPTwb08BMG9eU3GUP7oD6OM4nZRTbD6xYxRCuUCSsQrjRO6M7afHxY0029DIX9QL');

const app = express();

const YOUR_DOMAIN = process.env.YOUR_DOMAIN;



const makePayment  = async (req, res) => {
  const { items } = req.body;
  const lineItems = items.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });
  const siteFees = {
    price_data: {
      currency: 'usd',
      product_data: {
        name: "site fees",
      },
      unit_amount: 1000,
    },
    quantity: 1,
  }
  lineItems.push(siteFees)

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: YOUR_DOMAIN,
      cancel_url: 'https://www.google.com/',
    });

    res.json({ sessionUrl: session.url });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Stripe session' });
  }
}


module.exports = {makePayment};

