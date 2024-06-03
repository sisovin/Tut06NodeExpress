// import the http module
//const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
// Define the port to listen on
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, `/public`)));

app.get('^/$|/index(.html)?', (req, res) => {
    /*res.sendFile(`./views/index.html`, { root: __dirname });*/
    res.sendFile(path.join(__dirname, `views`, `index.html`));
});

app.get(`/new-page(.html)?`, (req, res) => {
    res.sendFile(path.join(__dirname, `views`, `new-page.html`));
});

app.get(`/old-page(.html)?`, (req, res) => {
    res.redirect(301, `/new-page.html`);
});

// Talking about the route handlers
app.get(`/hello(.hyml)?`, (req, res, next) => {
    console.log(`attempted to load hello.html`);
    next()
}, (req, res) => {
    res.send(`hello world!`);
})


// changing the route handlers to a function
const one = (req, res, next) => {
    console.log(`one`);
    next();
}

const two = (req, res, next) => {
    console.log(`two`);
    next();
}

const three = (req, res) => {
    console.log(`three`);
    res.send(`Finished!`);
}

app.get(`/change(.html)?`, [one, two, three]);

app.get(`/*`, (req, res) => {
    res.status(404).sendFile(path.join(__dirname, `views`, `404.html`));
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

