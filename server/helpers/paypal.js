const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox',
    client_id: 'AZadGGh3WgHpiOTa98stDxW_1w3ygcrS9G91uhmEZWxxB6oemZ6gTuPmEFytggJQ-sPraO2zv20u2pkc',
    client_secret: 'EGR5iKX4Jbd18Clyf11cZMc77rRnC_g_D5390X5cV-iFWV4jI2SoNzCJkk6iEVThwq7uooz4AXD4k3Ax',
});

module.exports = paypal;