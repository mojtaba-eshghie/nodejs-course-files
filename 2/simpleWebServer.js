const http = require('http')
const url = require('url')






// This is going to be a simple http server
const server = http.createServer((req, res) => {
    const pathName = req.url;
    
    if (pathName === '/overview') {
        res.end("This is the overview")
    } else if (pathName === '/product') {
        res.end('This is the product')
    } else if (pathName === '/api') {
        res.end('API')
    } else {
        // You should always send the headers before you send the response (res.end)!
        res.writeHead(404, {
            'Content-type': 'text/html',
            'MadeUp-Header': 'Shit!'
        })
        res.end('<h1>404</br>The page you are looking for could not be found</h1>')
    }



    //if no res.end method gets invoked at the end of this callback, then, the browser does not really know 
    // what to do with the invoked url.
    //res.end("hello from the server!")
})


server.listen(80, '127.0.0.1', () => {
    console.log("server is listening!")  
})