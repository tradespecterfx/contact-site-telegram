/*
 * Simple Express server to handle contact form submissions and forward them to a
 * Telegram chat via a bot. The bot token and target chat ID are read from
 * environment variables BOT_TOKEN and TELEGRAM_CHAT_ID. Do not commit your
 * secrets directly to this file—use a .env file or host environment instead.
 */

const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON bodies (contact form submissions are sent as JSON)
app.use(express.json());

// Serve static files from the `public` directory
app.use(express.static(path.join(__dirname, 'public')));

// Read sensitive configuration values from environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.warn(
    'Warning: BOT_TOKEN or TELEGRAM_CHAT_ID environment variables are not set.\n' +
      'Submissions will not be forwarded to Telegram. Set these values in a .env file or environment to enable Telegram integration.'
  );
}

// Endpoint to accept contact form submissions
app.post('/contact', async (req, res) => {
  const { name, company, email, message } = req.body || {};
  // Validate required fields
  if (!name || !company || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  // Send the message to Telegram if credentials are configured
  try {
    if (BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const text =
        `\u270D New contact submission:\n` +
        `*Name:* ${name}\n` +
        `*Company or Investor:* ${company}\n` +
        `*Email:* ${email}\n` +
        `*Message:* ${message}`;
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      await axios.post(url, {
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'Markdown'
      });
    } else {
      console.log('Telegram integration is disabled; received submission:', {
        name,
        company,
        email,
        message
      });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error('Failed to forward message to Telegram:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to send message to Telegram' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
