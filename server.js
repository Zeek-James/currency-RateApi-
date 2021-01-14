const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/rates", async (req, res) => {
  try {
    const { base, currency } = req.query;

    const response = await axios.get(
      `https://api.exchangeratesapi.io/latest?base=${base.toUpperCase()}&symbols=${currency.toUpperCase()}`
    );

    if (!response.data) {
      return res
        .status(404)
        .json({ success: false, message: "Not Found" });
    }

    const results = {
      base: response.data.base,
      date: response.data.date,
      rates: response.data.rates,
    };

    return res.status(200).json({ success: true, Data: results });
  } catch (err) {
    const { error } = err.response.data;
    return res.status(400).json({ success: false, error });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  return console.log(`App running on port ${port}`);
});
