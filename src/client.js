
const moment = require('moment')
const grpc = require('grpc')
const bigimportProto = require('./bigimportProto.js')

/**
 * 全局单例
 */
let _client = null

/**
 *
 * @param {string} connStr: '127.0.0.1:50051', 'bigproject-import:50051'
 * @param {string} db: '5e1c390fa625ed00194043ae'
 */
const getClient = (connStr, db) => {
  if (!_client) {
    _client = new bigimportProto.Greeter(
      connStr,
      grpc.credentials.createInsecure()
    )
  }

  const client = _client

  const updateDatasource = async ({ computeProcess, cron, name, unit, createdBy }) => {
    return new Promise((resolve, reject) => {
      client.updateDatasource({
        db,
        computeProcess,
        cron,
        name,
        unit,
        createdBy
      }, (err, response) => {
        if (err) {
          reject(err)
          return
        }

        const { code, message, data } = response
        if (response.code !== '0') {
          const error = new Error(message)
          error.code = code
          reject(error)
          return
        }

        resolve(data)
      })
    })
  }

  const findBySns = async sns => {
    return new Promise((resolve, reject) => {
      client.findBySns({ db, sns }, (err, response) => {
        if (err) {
          reject(err)
          return
        }

        const { code, message, data } = response
        if (response.code !== '0') {
          const error = new Error(message)
          error.code = code
          reject(error)
          return
        }

        resolve(data.list)
      })
    })
  }

  const upsertFile = async ({ sn, relativePath, mtime }) => {
    return new Promise((resolve, reject) => {
      client.upsertFile({
        db,
        sn,
        relativePath,
        mtime: new Date(mtime)
      }, (err, response) => {
        if (err) {
          reject(err)
          return
        }

        const { code, message, data } = response
        if (response.code !== '0') {
          const error = new Error(message)
          error.code = code
          reject(error)
          return
        }

        resolve(data)
      })
    })
  }

  const updateDatasourcevalue = async ({ name, time, original, upsert }) => {
    return new Promise((resolve, reject) => {
      client.updateDatasourcevalue({
        db,
        name,
        time: moment(time).toDate(),
        original,
        // value: null,
        upsert
      }, (err, response) => {
        if (err) {
          reject(err)
          return
        }

        const { code, message, data } = response
        if (response.code !== '0') {
          const error = new Error(message)
          error.code = code
          reject(error)
          return
        }

        resolve(data)
      })
    })
  }

  const updateValue = async ({ name, time }) => {
    return new Promise((resolve, reject) => {
      client.updateValue({
        db,
        name,
        time: moment(time).toDate()
      }, (err, response) => {
        if (err) {
          reject(err)
          return
        }

        const { code, message, data } = response
        if (response.code !== '0') {
          const error = new Error(message)
          error.code = code
          reject(error)
          return
        }

        resolve(data)
      })
    })
  }

  const list = async arg => {
    return new Promise((resolve, reject) => {
      const json = JSON.stringify(arg)
      client.list(json, (err, response) => {
        if (err) {
          reject(err)
          return
        }

        const { code, message, data } = response
        if (response.code !== '0') {
          const error = new Error(message)
          error.code = code
          reject(error)
          return
        }

        const jsonData = JSON.parse(data)
        resolve(jsonData)
      })
    })
  }

  const add = async arg => {
    return new Promise((resolve, reject) => {
      const json = JSON.stringify(arg)
      client.add(json, (err, response) => {
        if (err) {
          reject(err)
          return
        }

        const { code, message, data } = response
        if (response.code !== '0') {
          const error = new Error(message)
          error.code = code
          reject(error)
          return
        }

        const jsonData = JSON.parse(data)
        resolve(jsonData)
      })
    })
  }

  const update = async arg => {
    return new Promise((resolve, reject) => {
      const json = JSON.stringify(arg)
      client.update(json, (err, response) => {
        if (err) {
          reject(err)
          return
        }

        const { code, message, data } = response
        if (response.code !== '0') {
          const error = new Error(message)
          error.code = code
          reject(error)
          return
        }

        const jsonData = JSON.parse(data)
        resolve(jsonData)
      })
    })
  }

  const remove = async arg => {
    return new Promise((resolve, reject) => {
      const json = JSON.stringify(arg)
      client.remove(json, (err, response) => {
        if (err) {
          reject(err)
          return
        }

        const { code, message, data } = response
        if (response.code !== '0') {
          const error = new Error(message)
          error.code = code
          reject(error)
          return
        }

        const jsonData = JSON.parse(data)
        resolve(jsonData)
      })
    })
  }

  return {
    updateDatasource,
    findBySns,
    upsertFile,
    updateDatasourcevalue,
    updateValue,
    // dbconfig
    list,
    add,
    update,
    remove
  }
}

module.exports = getClient
