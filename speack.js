const request = require("request");
const cheerio = require("cheerio");
const say = require('say')
const schedule = require('node-schedule');

schedule.scheduleJob('*/1 * * * *', async () => {

    let names = [];
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
        /*const randomNumber = Math.floor(Math.random() * 12);
        const name = names[randomNumber];
        console.log('###',name,'###');*/
        say.speak(names.join(', '));
    })

});