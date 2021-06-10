const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const url = 'https://uzhnu.edu.ua/uk/infocentre/30472'

const nightmare = Nightmare({show:true});
const data = []


nightmare
    .goto(url)
    .wait('body')
    .evaluate(()=> document.querySelector('body').innerHTML)
    .end()
    .then(response => console.log(getData(response)))
    .catch(err => console.log(err));

let getData = html =>{
    const $ = cheerio.load(html);
    let folders = $('.row div div.folder a');
    for (let i = 0; i < folders.length; i++) {
        data.push({
            title: folders[i+''].children[0].data,
            link:'https://uzhnu.edu.ua'+  folders[i+''].attribs.href
        })
    }
    return data
}
module.exports={
    data
}