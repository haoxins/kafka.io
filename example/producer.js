
const { Producer } = require('..')

const producer = new Producer({
  host: '192.168.99.100'
})

start()

async function start() {
  await producer.connect()

  await producer.createTopic('example')

  setInterval(async () => {
    console.info('send')
    await producer.send('example', {
      message: 'hello'
    })
  }, 3000)
}
