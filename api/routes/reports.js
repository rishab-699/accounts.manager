const express = require("express");
const router = express.Router();
const booktransactions = require('../lib/book');
const mongoose = require('mongoose')
const { verifyToken } = require("../lib/jwtAuth");
const reports = require('../lib/reports')


router.get('/home/:id', async (req, res) => {
    try {
        //console.log("Received request for ID:", req.params.id);

        const getData = await reports.quickActions(req.params.id, 'yearly');
        if (!getData || getData.length === 0) {
            //console.log("No data found, sending 400 response");
            return res.status(400).json({ message: 'No books found!' });
        }

        //console.log("Sending 200 response with data");
        res.status(200).json(getData);

    } catch (error) {
        //console.error("Error fetching book data:", error);
        
        if (!res.headersSent) {  // Ensure response is not sent twice
            return res.status(500).json({ message: 'Internal Server Error!' });
        }
    }
});
router.get('/home/salesReport/:id', async(req,res)=>{
    try {
        //console.log("Received request for ID:", req.params.id);

        const getData = await reports.salesChart(req.params.id);
        if (!getData || getData.length === 0) {
            //console.log("No data found, sending 400 response");
            return res.status(400).json({ message: 'No sales data found!' });
        }

        console.log("Sending 200 response with data");
        console.log(getData);
        res.status(200).json(getData);

    } catch (error) {
        //console.error("Error fetching book data:", error);
        
        if (!res.headersSent) {  // Ensure response is not sent twice
            return res.status(500).json({ message: 'Internal Server Error!' });
        }
    }
})


module.exports = router;