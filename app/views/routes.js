//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


router.use('/1-0', require('./views/1-0/routes'))
router.use('/2-0', require('./views/2-0/routes'))
router.use('/3-0', require('./views/3-0/routes'))
router.use('/4-0', require('./views/4-0/routes'))
router.use('/mvp', require('./views/mvp/routes'))


module.exports = router