const http = require('http')

const server = http.createServer((request, response) => {
	response.writeHead(200, {'Content-Type': 'application/json'})
	response.write(JSON.stringify({message: 'Hello, World!'}))
	response.end()
})

const port = 8000

server.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
