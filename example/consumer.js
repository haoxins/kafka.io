
const { Consumer } = require('..')

const consumer = new Consumer({
  host: '192.168.99.100'
})

consumer.listen([{
  topic: 'example'
}])

consumer.on('message', data => console.info(data))

consumer.on('error', err => console.error(err))
