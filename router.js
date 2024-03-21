const url = require('url')
const qs = require('querystring')
const repository = require('./repository')

module.exports = {
	GET: (request, response) => {
		const query = url.parse(request.url).query
		
		response.writeHead(200, { 'Content-Type': 'application/json' })
		response.write(JSON.stringify({ message: 'Thanks for GETing!', query }))
		response.end()
	},
	POST: (request, response) => {
		let body = []
		
		request.on('data', (data) => {
			body.push(data)
		})
		
		request.on('end', () => {
			const parsedPostData = qs.parse(
				Buffer.concat(body).toString()
			)
			
			let responseCode
		
			try {
				repository.save(parsedPostData)
				responseCode = 201
			} catch (err) {
				console.log(`Error saving to database: ${err}`)
				responseCode = 500
			}
			
			response.writeHead(responseCode)
			response.write(JSON.stringify(
				JSON.parse(Buffer.concat(body).toString())
			))
			response.end()
		})
	}

}
