const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req, res) {

    console.log(req.url, req.method);
    res.setHeader('Content-Type', 'text/html');

    let path = './';
    switch(req.url) {
        case '/':
            path += 'Proiect.html';
            break;
        case '/Beginner':
            path += 'Beginner.html';
            break;
        case '/Intermediate':
            path += 'Intermediate.html';
            break;
        case '/Advanced':
            path += 'Advanced.html';
            break;
        case '/QA':
            path += 'QA.html';
            break;
    }

    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })
});

server.listen(5500, '127.0.0.1');
console.log("heiheiheiiiii");
