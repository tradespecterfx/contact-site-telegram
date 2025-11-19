# Contact Site with Telegram Integration

This project contains a simple static website with a contact form and a Node.js
backend to forward submissions to a Telegram chat via a bot. It also
includes a privacy policy page and placeholder social media links. The
frontend is styled based on the yellow contact section shown in the user
provided design, with the form itself appearing on a dark modal overlay.

## Features

- **Contact button and modal form** – A "Contact us" button on the home page
  opens a modal containing a form. The modal has a black background and
  white text to contrast against the bright yellow page.
- **Custom form fields** – The form collects a name, a company or investor
  status, an email address and a message. There is no subject field.
- **Telegram integration** – Submissions are sent to a Telegram chat via a
  bot. Configure your bot token and chat ID in a `.env` file (see
  instructions below).
- **Privacy policy** – A separate page explains how user data is handled.
- **Social links** – Placeholder links for Facebook, Instagram and Twitter
  appear in the page footer.

## Getting started

This repository includes both frontend assets (served from the `public`
folder) and a small Express backend to handle form submissions. To run
the project locally:

1. Navigate into the project directory:

   ```sh
   cd contact_site
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a copy of the `.env.example` file named `.env` and fill in
   your Telegram bot token and chat ID:

   ```env
   BOT_TOKEN=your-telegram-bot-token
   TELEGRAM_CHAT_ID=your-chat-id
   # optionally set PORT=3000
   ```

   - To obtain a bot token, talk to [BotFather](https://t.me/botfather) on
     Telegram and create a new bot.
   - To find your chat ID, send a message to your bot and then visit
     `https://api.telegram.org/bot&lt;BOT_TOKEN&gt;/getUpdates` in your
     browser. Look for `"chat":{"id": ...}` in the JSON response.

4. Start the server:

   ```sh
   npm start
   ```

5. Open your browser to `http://localhost:3000` to view the site.

## Deployment

To deploy this site on a hosting service (for example, GitHub Pages for
the static files and a separate backend on a service like Heroku or
Vercel), you will need to serve the `public` directory and run the
Express server. Ensure that your environment variables are set on the
server for Telegram integration.

## Customization

Feel free to adjust the styles in `public/style.css` to better match
your brand colours. Update the placeholder URLs in the footer to link to
your actual social media profiles. Edit `public/privacy.html` to tailor
the privacy policy to your own policies and legal requirements.
