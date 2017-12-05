/**
 * Created by huhai on 17/5/3.
 */
var express = require('express')
var app = express()
require('express-ws')(app)

var path = require('path')
var fs = require('fs')
var mock = require('mockjs')

var api = {}
var apiPath = path.join(__dirname, './api.json')

const mockData = () => {
  for (var index in api['Demo']) {
    api['Demo'][index].res = mock.mock(api['Demo'][index].res)
    // console.log(api['Demo'][index].res)
  }
  // console.log(JSON.stringify(api))
  fs.writeFile('port.json', JSON.stringify(api, null, 2), 'utf-8', function () {
    console.log('输出完毕')
  })
}

function getApis () {
  fs.readFile(apiPath, 'utf-8', function (err, content) {
    if (err) {
      console.log(err)
    }
    console.log('parseing')
    api = JSON.parse(content)
    mockData()
  })
}

getApis()

// const validJSON = (jsonString) => {
//   try {
//     var o = JSON.parse(jsonString)
//
//     // Handle non-exception-throwing cases:
//     // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
//     // but... JSON.parse(null) returns null, and typeof null === "object",
//     // so we must check for that, too. Thankfully, null is falsey, so this suffices:
//     if (o && typeof o === 'object') {
//       return o
//     }
//   } catch (e) { }
//
//   return false
// }
