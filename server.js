const express = require('express');
const app = express();
app.use(express.json());

// Viwango vya Commission kulingana na andiko la biashara la 2026 [cite: 18, 21]
const COMMISSIONS = {
    "Lori": 0.05,       // 5% kwa mizigo mizito [cite: 18]
    "Bajaj": 0.06,      // 6% kwa abiria/mizigo midogo [cite: 21]
    "BodaBoda": 0.07,   // 7% kwa delivery haraka [cite: 21]
    "Guta": 0.04,       // 4% kwa masoko [cite: 21]
    "Ambulance": 0.03,  // 3% kwa dharura za afya [cite: 21]
    "Gari": 0.08,       // 8% kwa safari ndefu [cite: 21]
    "Pikipiki": 0.07    // 7% kwa vifurushi [cite: 21]
};

app.post('/request-trip', (req, res) => {
    const { vehicle, amount } = req.body;
    const rate = COMMISSIONS[vehicle] || 0.05; // Default ni 5% kama chombo hakijatajwa
    const connectorFee = amount * rate;
    const driverPay = amount - connectorFee;

    res.json({
        status: "Success",
        message: "Safari imepokelewa Connector TZ",
        summary: {
            total: `TZS ${amount.toLocaleString()}`,
            fee: `TZS ${connectorFee.toLocaleString()} (${rate * 100}%)`,
            payout: `TZS ${driverPay.toLocaleString()}`
        }
    });
});

app.listen(3000, () => console.log("Connector TZ Server is running..."));
