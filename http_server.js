const http = require('http')
const router = require('./router')


const server = http.createServer((request, response) => {
	router[request.method](request, response)
})

const port = 8000
server.listen(port, () => {
	console.log(`Server started on port ${port}.`)
})
