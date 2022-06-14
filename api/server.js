const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")

const carRouter = require("./cars/cars-router")

const server = express()

server.use(express.json())
server.use(helmet())
server.use(morgan("dev"))
server.use(cors())

server.use('/api/cars', carRouter)


module.exports = server
