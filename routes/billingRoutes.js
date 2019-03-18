const keys = require('../config/keys.js');
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    try {
      let charge = await stripe.charges.create({
        amount: 500,
        currency: "usd",
        description: "An example charge",
        source: req.body.id
      });
      req.user.credits += 5;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(500).end();
    }
  });
};