require("./db/connection");
const express = require("express");
// const cheerio = require('cheerio')
const userRouter = require("./user/routes");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use(userRouter);

// var request = require('request');
// var cheerio = require("cheerio");
// var request = require('request');

// request = request.defaults({jar: true});

// var options = {
//     url: 'http://www.google.com/ncr',
//     headers: {
//         'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16'
//     }
// };

// request(options, function () {

//     request('https://www.google.com/search?q=beatport+adam+bayer', function (error, response, body) {

//         var $ = cheerio.load(body);
//         console.log($.text());

        // $("").each(function() {
        //     var link = $(this);
        //     var text = link.text();

        //     console.log(text);
        // });
//     });
// });

app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${port}`);
});
