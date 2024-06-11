let express = require('express');
let bodyParser = require('body-parser');
let axios = require('axios');
let cors = require('cors');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/check-balance', async (req, res) => {
    const  accountNumber  = req.body.leco;
    let name = req.body.name;
    console.log(accountNumber);
    console.log(name);
    const url = "https://lecoapp.leco.lk/OnlineBillPay/Instant_Pay.aspx";
    const payload = `ctl00%24MainContent%24ScriptManager1=ctl00%24MainContent%24UpdatePanel1%7Cctl00%24MainContent%24BtnCheck1&__EVENTTARGET=&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=olz9nJfxWGSERICJdnlZT%2BYx4cmsdakwij7DR9BrcjLGd10t87KTeVgC2K7QBwlTuxIIYMaFiTE2OwoY1Z5lwpnKzaN273Pbnvc4eD1vqM8MIbG0YLiNE2g%2FgH%2FlwOTkvQQz8TkUWazqWrfzV1grmqkwZz6510OnW%2BSgNdXlRWZ%2BMGuGonL4ujIhweoAP7t3JepeO3O2fBwe08ECH785i3npDvWiAwzb9UmFwJkaa%2BQR20N8pELh9nSQXkjVOxafOc2uUQa1YPlq8Pd%2BN6fCrg%3D%3D&__VIEWSTATEGENERATOR=57BE4788&__EVENTVALIDATION=xi5%2FxRYJ7uZwE9b42x6M8tCzVKtG9qP8DuPHIhYwkjDPoswb4meJ0mjlIWGa0XcLPM9mVdmYqf3WiKaZPYTf61XKU3B4666Tg1i1s1sflVYN80acbikVRTIFBz3It7GpmMvnqtn7O35PmWXaHRYdSJusOaG4oZD1N0iPg7Yv5HPIDevJ%2FlHITULFytUh14EzyupOblcorpAlmC0nlrvQO5h9zIVIGpWFhjgLOgipZg495VojWQbcx7Rkr9UmNPmAvR%2Fv0b03KcIQCwm8ADA%2Bl3WchPfNrRhbAGXhcrvkHMdsKYuljgpKK8iTPGOnDWou&ctl00%24MainContent%24TxtAccount_number=${accountNumber}&ctl00%24MainContent%24TxtfAmount=&ctl00%24MainContent%24TxtvMobile=&ctl00%24MainContent%24TxtEmail=&paymentdate=&__ASYNCPOST=true&ctl00%24MainContent%24BtnCheck1=Submit`;
    const headers = {
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cache-Control': 'no-cache',
        'Referer': 'https://lecoapp.leco.lk/OnlineBillPay/Instant_Pay.aspx',
        'X-Requested-With': 'XMLHttpRequest',
        'X-MicrosoftAjax': 'Delta=true',
        'sec-ch-ua-platform': '"Windows"',
        'Cookie': 'ASP.NET_SessionId=h5ee10l0fc0qw1lfmzxen5at'
    };

    try {
        const response = await axios.post(url, payload, { headers });
        const data = response.data;

        const balance = data.split('id="MainContent_LblBalance"')[1].split(">")[1].split("<")[0];
        res.json({
            status: 'success',
            balance: balance,
            name : name
        });
    } catch (error) {
        console.error('Error fetching the account balance:', error);
        res.status(500).send('Failed to retrieve account balance. Please check your account number and try again.');
    }
});

app.post('/check-slt-balance', async (req, res) => {
    const { accountNumber } = req.body;

    const url = "https://sltapi.slt.lk/CheckBalance";
    const payload = `accountNumber=${accountNumber}&otherParams=values`;
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'X-Custom-Header': 'value'
    };
    try {
        const response = await axios.post(url, payload, { headers });
        const balance = response.data.balance;
        res.json({ balance });
    } catch (error) {
        console.error("Error fetching SLT balance:", error);
        res.status(500).json({ error: "Failed to fetch SLT balance" });
    }
});


app.listen(port, '127.0.0.1',() => {
    console.log(`Server is running at http://localhost: ${port}`);
});
