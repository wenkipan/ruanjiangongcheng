const express = require('express')
const app = express()
const mysql = require('mysql2/promise');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});



app.use(express.json())

app.get('/', function (req, res) {
    res.send('Hello World')
})
app.get('/email/deliver', async (req, res) => {
    const { sender_name, sender_number, sender_phone, sender_ID, sender_type, sender_addr, sender_payway } = req.body
    const { receiver_name, receiver_phone, receiver_addr } = req.body
    const { item_type, item_length, item_width, item_height, item_cost } = req.body
    const [rows, fields] = await connection.execute(
        ' INSERT INTO VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,)',
        [sender_name, sender_number, sender_phone, sender_ID, sender_type, sender_addr, sender_payway,
            receiver_name, receiver_phone, receiver_addr,
            item_type, item_length, item_width, item_height, item_cost]
    );
    if (rows == null) {
        res.send({ status: 0, msg: "database inserting err", data: '', })
        return
    }

    res.send({ status: 1, msg: "ok", data: rows, })

})


app.listen(3000)