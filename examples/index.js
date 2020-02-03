
const {
  bigimportProto,
  getClient
} = require('../src/index.js')
console.log(bigimportProto)

const client = getClient('127.0.0.1:50051', '5e1c390fa625ed00194043ae')
console.log(client)
