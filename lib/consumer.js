
const { Consumer: KafkaConsumer , Client } = require('kafka-node')

class Consumer {
  constructor(opts) {
    this._opts = Object.assign({
      host: 'localhost',
      port: 2181
    }, opts)
  }

  listen(payloads, options = {}) {
    const { host, port } = this._opts
    const client = this._client = new Client(host + ':' + port)

    this._consumer = new KafkaConsumer(client, payloads, options)
  }
  // TODO
  on(event, handler) {
    this._consumer.on(event, (err, data) => {
      handler(err, data)
    })
  }
}

module.exports = Consumer
