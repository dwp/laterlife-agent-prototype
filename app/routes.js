//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// MVP VERSION 2


// Run this code when a form is submitted to 'bank-name-answer'
router.post('/changed-bank-answer', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var bankNameConfirm = req.session.data['changed-bank']

  // Check whether the variable matches a condition
  if (bankNameConfirm == "yes"){
    // Send user to next page
    res.redirect('/mvp/bank-cya')
  } else {
    // Send user to name incorrect page 
    res.redirect('/mvp/bank-name-incorrect')
  }

});



// MVP routes

router.post('/mvp/stop-benefit', function (req, res) {
  if  (req.body['stopbenefit'] === 'suspend') {
    res.redirect('suspend-benefit')
  } else if (req.body['stopbenefit'] === 'legacy') {
    res.redirect('legacy-benefit')
  } else {
    res.redirect('stop-benefit')
  }
})




router.post('/mvp/restart', function (req, res) {
  if (req.body['restart'] === 'both') {
    res.redirect('personal-restarted')
  } else if (req.body['restart'] === 'sp') {
    res.redirect('personal-suspended')
  } else if (req.body['restart'] === 'pc') {
    res.redirect('personal-suspended')
  }
})



//-------------------------------------------------------------------


// MVP VERSION 1


//-------------------------------------------------------------------
