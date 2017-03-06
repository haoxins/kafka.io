
const { HighLevelProducer, Client } = require('kafka-node')

const isArray = Array.isArray

class Producer {
  constructor(opts) {
    this._opts = Object.assign({
      host: 'localhost',
      port: 2181
    }, opts)
  }

  connect() {
    const { host, port } = this._opts
    const client = this._client = new Client(host + ':' + port)

    return new Promise((resolve, reject) => {
      const producer = this._producer = new HighLevelProducer(client)
      producer.on('ready', () => {
        resolve()
      })

      setTimeout(() => {
        reject(new Error('connect timeout'))
      }, 10000)
    })
  }

  createTopics(topics) {
    return new Promise((resolve, reject) => {
      this._producer.createTopics(topics, true, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  createTopic(topic) {
    return this.createTopics([topic])
  }

  send(topics, data) {
    const ts = isArray(topics) ? topics : [topics]
    const payloads = ts.map(topic => ({
      topic,
      messages: format(data),
    }))

    return new Promise((resolve, reject) => {
      this._producer.send(payloads, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  // TODO - producer - error event
}

module.exports = Producer

/**
 * private
 */

function format(data) {
  if (typeof data === 'object') {
    return JSON.stringify(data)
  }

  if (typeof data === 'string') {
    return data
  }

  return String(data)
}
