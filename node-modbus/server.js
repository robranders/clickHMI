const PORT = 3000;
const express = require("express");
const app = express();
const ModbusRTU = require("modbus-serial");
const moment = require("moment");


// Body parser middleware
app.use(express.json());

// Create modbus client (Click PLC)
const clickPLC = new ModbusRTU();
clickPLC.connectTCP("192.168.0.10", {port: 502});
clickPLC.setID(1);

let clickTimer;

const db = [];

app.get("/modbus/click/starttimer", (req, res) => {
    if (typeof clickTimer === "object"){
        return res.send("Timer already running");
    }

    clickTimer = setInterval(() => {
        clickPLC.readHoldingRegisters(0, 20, (err, data) => {
            if (err){
                db.push({d: err, t: moment().format()});
                return console.log({err});
            }
            return db.push({d: data.data, t: moment().format()});
        })
    }, 1000);

    return res.send(`Timer set`);
});

app.get("/modbus/click/history", (req, res) => {
    res.json(db);
})

app.get("/modbus/click/endtimer", (req, res) => {
    if (typeof clickTimer === "object"){
        clearInterval(clickTimer);
        clickTimer = undefined;
        return res.send("Timer cleared");
    }
    return res.send("No timer set");
})

app.get("/modbus/click/readregisters", (req, res) => {
    clickPLC.readHoldingRegisters(0, 20, (err, data) => {
        if (err) return res.status(500).json({err});
        return res.json({data: data.data});
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})