var util = require('util')

var urlProtocolsDefaultMap = {
    '//': '/{2}',
    'http': 'http:',
    'https': 'https:',
    'data': 'data:',
    'file': 'file:'
}

function createProtocolFilter(includeProtocols) {
    var urlProtocolsMap = util._extend({}, urlProtocolsDefaultMap)

    if (includeProtocols) {
        if (includeProtocols.indexOf('//') >= 0) {
            includeProtocols.push('http')
            includeProtocols.push('https')
        }
        else if (includeProtocols.indexOf('http') >= 0 && includeProtocols.indexOf('https') >= 0) {
            includeProtocols.push('//')
        }

        includeProtocols.forEach(function (protocol) {
            delete urlProtocolsMap[protocol]
        })
    }

    var excludedProtocols = []

    Object.keys(urlProtocolsMap).forEach(function (protocol) {
        excludedProtocols.push(urlProtocolsMap[protocol])
    })

    return excludedProtocols.length ? new RegExp('^(' + excludedProtocols.join('|') + ')', 'i') : undefined
}

var externalUrlExcludeFilter = createProtocolFilter()

function isExternalUrl(url) {
    return externalUrlExcludeFilter.test(url)
}

exports.isExternalUrl = isExternalUrl
exports.createProtocolFilter = createProtocolFilter