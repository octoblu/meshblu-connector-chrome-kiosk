const {EventEmitter}  = require('events')
const _               = require('lodash')
const opener          = require('opener')

class Connector extends EventEmitter{
  constructor(options) {
    super()
    _.bindAll(this, Object.getOwnPropertyNames(Connector.prototype))
    this.logger = options.logger
  }

  start(device, callback) {
    this._startChromeFromDevice(device)
    callback()
  }

  onConfig(device) {
    this._startChromeFromDevice(device)
  }

  _startChromeFromDevice(device) {
    const dashboardUrl = _.get(device, 'genisys.spaceUrl')
    if(_.isEmpty(dashboardUrl)) return
    if(this._previousUrl === dashboardUrl) return
    this._previousUrl = dashboardUrl
    this._startChrome(dashboardUrl)
  }

  _startChrome(dashboardUrl) {
    opener(dashboardUrl)
  }

}

module.exports = Connector
