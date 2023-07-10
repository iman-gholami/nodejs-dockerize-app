const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


// تنظیمات فایل ایستاتیک
app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// اتصال به دیتابیس
const dbConnected = async () => {
    try {
        await mongoose.connect("mongodb://Iman:iman213213@127.0.0.1:27017/Testdatabase");
        console.log('Db is connected');
    } catch (error) {
        console.log('Db connection error');
    }
};
dbConnected();


// تعریف مدل
const userSchema = new mongoose.Schema({
    name: String
});
const User = mongoose.model('User', userSchema);

// روت برای پردازش داده‌های فرم ارسال شده
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const user = new User({ name });
    user.save().then(() => {
        res.send({ message: `سلام ${name}!` });
    }).catch((err) => {
        console.error(err);
        res.status(500).send({ error: 'error store in database' });
    });
});

// شروع سرور
app.listen(port, () => {
    console.log(`server is listening on  ${port}`);
});