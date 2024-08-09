const express = require('express');
const twilio = require('twilio');

const app = express();

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

app.post('/send-sms', async (req, res) => {
  const { numbers, message } = req.body;

  try {
    const numberArray = numbers.split(',').map(num => num.trim());

    for (const number of numberArray) {
      await client.messages.create({
        body: message,
        from: 'YOUR_TWILIO_PHONE_NUMBER',
        to: number
      });
    }

    res.json({ message: 'SMS sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
