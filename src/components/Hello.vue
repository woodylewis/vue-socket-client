<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{ bar }}
  </div>
</template>

<script>
import socketIOClient from 'socket.io-client'
let endpoint = 'http://127.0.0.1:3002'
const socket = socketIOClient(endpoint)
const foo = function (b) {
  let theTopic = ''
  // let incoming = ''
  socket.on('wls_client', (data) => {
    theTopic = 'wls' + Date.now()
    // console.log('SLOT ', data)
    // console.log('TOPIC ', theTopic)
    socket.emit('subscribe', JSON.stringify({
      topic: theTopic,
      server_slot: data,
      compId: 'test',
      type: 'test' }))
    socket.on(theTopic, (data) => {
      console.log('RECEIVED', data)
      b = data
    })
  })
}

foo()

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Vue socket client',
      bar: 'bar',
      foo: foo
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
