//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here



addFilter('govukCurrency', function (value) {
  if (value === null || value === undefined || value === '') {
    return ''
  }

  let number = Number(value)

  return '£' + number.toFixed(2)
})



addFilter('reverse', function (arr) {
  if (!Array.isArray(arr)) return arr
  return arr.slice().reverse()
})

