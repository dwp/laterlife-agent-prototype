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


// Run this code when a form is submitted to remove a contact - email 'contact-remove-email'
router.post('/contact-remove-email', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var ContactRemove = req.session.data['email-remove']

  // Check whether the variable matches a condition
  if (ContactRemove == "yes"){
    // Send user to next page
    res.redirect('/mvp/contact-success')
  } else {
    // Send user to name incorrect page 
    res.redirect('/mvp/contact')
  }

});

// Run this code when a form is submitted to remove a contact - homephone 'contact-remove-homephone'
router.post('/contact-remove-homephone', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var ContactRemove = req.session.data['homephone-remove']

  // Check whether the variable matches a condition
  if (ContactRemove == "yes"){
    // Send user to next page
    res.redirect('/mvp/contact-success')
  } else {
    // Send user to name incorrect page 
    res.redirect('/mvp/contact')
  }

});

// Run this code when a form is submitted to remove a contact - mobile 'contact-remove-mobile'
router.post('/contact-remove-mobile', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var ContactRemove = req.session.data['mobilephone-remove']

  // Check whether the variable matches a condition
  if (ContactRemove == "yes"){
    // Send user to next page
    res.redirect('/mvp/contact-success')
  } else {
    // Send user to name incorrect page 
    res.redirect('/mvp/contact')
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
