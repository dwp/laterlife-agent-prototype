//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.use('/4-0', require('./views/4-0/routes'))
router.use('/5-0', require('./views/5-0/routes'))


module.exports = router