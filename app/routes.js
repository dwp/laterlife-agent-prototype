//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


router.use('/retirement-showcase', require('./views/retirement-showcase/routes'))
router.use('/10-0', require('./views/10-0/routes'))
router.use('/9-0', require('./views/9-0/routes'))
router.use('/8-0', require('./views/8-0/routes'))
router.use('/7-0', require('./views/7-0/routes'))
router.use('/6-0', require('./views/6-0/routes'))
router.use('/5-0', require('./views/5-0/routes'))
router.use('/4-0', require('./views/4-0/routes'))
router.use('/3-0', require('./views/3-0/routes'))
router.use('/2-0', require('./views/2-0/routes'))
router.use('/1-0', require('./views/1-0/routes'))






module.exports = router