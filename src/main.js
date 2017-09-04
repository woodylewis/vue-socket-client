// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import socketIOClient from 'socket.io-client'

let endpoint = 'http://127.0.0.1:3002'
const socket = socketIOClient(endpoint)
let theTopic = ''

socket.on('wls_client', (data) => {
  theTopic = 'wls' + Date.now()
  console.log('SLOT ', data)
  console.log('TOPIC ', theTopic)
  socket.emit('subscribe', JSON.stringify({
    topic: theTopic,
    server_slot: data,
    compId: 'test',
    type: 'test' }))
  socket.on(theTopic, (data) => {
    console.log('RECEIVED', data)
  })
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
