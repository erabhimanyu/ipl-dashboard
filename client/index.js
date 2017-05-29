import './promise-polyfill'
import { app } from './app'

// Enable progressive web app support (with offlineplugin)
 if (process.env.NODE_ENV === 'production') {
   require('./pwa')
 }

app.$mount('#myApp')
