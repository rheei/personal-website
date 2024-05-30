
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const { readFileSync } = require('fs');
const { compile, compileSsr, render } = require('svelte/compiler');
app.use(cors());

app.use(express.static('public'));
app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});

//load compiled components
// const { Home, About } = require('./public/build/bundle.js');
//routes
app.get('/', (req, res) => {
    const { html, css } = render(createElement(Home, { props: { name: 'Home' } }));
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Home</title>
            <link rel="stylesheet" href="/build/bundle.css">
            <style>${css.code}</style>
        </head>
        <body>
            ${html}
            <script src="/build/bundle.js"></script>
        </body>
        </html>
    `);
});
app.get('/about', (req, res) => {
    const { html, css } = render(createElement(About, { props: { name: 'About' } }));
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>About</title>
            <link rel="stylesheet" href="/build/bundle.css">
            <style>${css.code}</style>
        </head>
        <body>
            ${html}
            <script src="/build/bundle.js"></script>
        </body>
        </html>
    `);
});

// app.get('/giphy', (req, res) => {
//     console.log(`Searching for a gif with the term: ${req.query.term}`);

//     let params = req.query.term.replace(/ /g, '+');
//     params += '&api_key=YOUR_API_KEY';
//     params += '&limit=10';

//     axios.get(`https://api.giphy.com/v1/gifs/search?q=${params}`)
//     .then(function (response) {
//         res.send({
//         success: true,
//         data: response.data.data
//         })
//     })
//     .catch(function (error) {
//         res.send({
//         success: false,
//         data: []
//         })
//     });
  
//   });
