import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Stripe (optional - falls back to sandbox/mock mode if key is missing/invalid)
let stripe = null;
if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.startsWith('your_')) {
  try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    console.log('Stripe initialized successfully.');
  } catch (err) {
    console.error('Error initializing Stripe:', err.message);
  }
} else {
  console.log('Running in Sandbox Mode (no valid STRIPE_SECRET_KEY found).');
}

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false,
});

// Define Booking model
const Booking = sequelize.define('Booking', {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  ticketType: { type: DataTypes.STRING, allowNull: false }, // silver, gold, vip, vvip
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  totalPrice: { type: DataTypes.INTEGER, allowNull: false },
  txnId: { type: DataTypes.STRING, allowNull: false, unique: true },
  paymentMethod: { type: DataTypes.STRING, allowNull: false }, // Card, UPI
  paymentStatus: { type: DataTypes.STRING, defaultValue: 'completed' }, // completed, pending
});

// Sync database
sequelize.sync({ alter: true })
  .then(() => console.log('SQLite database synced successfully.'))
  .catch(err => console.error('Database sync failed:', err));

// API: Create a new booking
app.post('/api/bookings', async (req, res) => {
  const { name, phone, email, ticketType, quantity, totalPrice, paymentMethod } = req.body;

  if (!name || !phone || !email || !ticketType || !quantity || !totalPrice || !paymentMethod) {
    return res.status(400).json({ error: 'Missing required booking fields.' });
  }

  try {
    const txnId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const booking = await Booking.create({
      name,
      phone,
      email,
      ticketType,
      quantity,
      totalPrice,
      txnId,
      paymentMethod,
      paymentStatus: 'completed' // In this setup, we assume payment success on front-end checkout
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Failed to save booking to database.' });
  }
});

// API: List all bookings (for verification/admin panel if needed)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.findAll({ order: [['createdAt', 'DESC']] });
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings.' });
  }
});

// API: Create Stripe Payment Intent (for card payments)
app.post('/api/checkout', async (req, res) => {
  const { amount } = req.body; // amount in Rupees

  if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
  }

  // Convert Rupees to Cents (or equivalent smallest currency unit for Stripe)
  const amountCents = Math.round(amount * 100);

  if (stripe) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountCents,
        currency: 'inr',
        payment_method_types: ['card'],
      });
      return res.json({
        sandbox: false,
        clientSecret: paymentIntent.client_secret
      });
    } catch (err) {
      console.error('Stripe Payment Intent error:', err);
      // Fallback to sandbox if stripe call fails
    }
  }

  // Sandbox mode fallback
  res.json({
    sandbox: true,
    clientSecret: 'mock_secret_' + Math.random().toString(36).substr(2, 9)
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', database: 'connected', mode: stripe ? 'production' : 'sandbox' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
