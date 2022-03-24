const request = require('request');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
let names = [];

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    request('https://www.generatore-di-nomi.it/categoria/popolo/vichingo.html', (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            $('li>p').each((index, value) => {
                // console.log(value.children[0].data);
                names[index] = value.children[0].data;
            });
        } else {
            console.log('Error loading names, please try again');
        }
        const randomNumber = Math.floor(Math.random() * 12);
        res.send(`<div style="position: absolute;left: 40%;top: 40%"><h1 style="font-size: 100px">${names[randomNumber]}</h1></div>`);
    });
});

app.listen(80);

