const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
  'sk_test_51MWp5lKRK98X9KYiOJIJM0gNwnysXv3URv6ghNoysnZaLytkhhZqeoHoqlSDPEW58RuP1biFHUGDZVi0fdlSoL6600AxsXrZFT'
);

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/checkout', async (req, res) => {
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];

  items.forEach(item =>
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    })
  );

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(process.env.port || 4000, () =>
  console.log('Listening on port 4000')
);
