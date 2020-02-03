
const path = require('path')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = path.resolve(__dirname, './proto/bigimport.proto')

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)
const bigimportProto = grpc.loadPackageDefinition(packageDefinition).bigimport

module.exports = bigimportProto
