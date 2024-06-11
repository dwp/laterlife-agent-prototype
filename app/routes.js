//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// MVP VERSION 0

// Run this code when a form is submitted to 'location-of-account'
router.post('/location-of-account', function (req, res) {

    // Make a variable and give it the value from 'account-location'
    var accountLocation = req.session.data['account-location']
  
    // Check whether the variable matches a condition
    if (accountLocation == "uk"){
      // Send user to next page
      res.redirect('/mvp/0/account-change/account-details')
    } else {
      // Send user to ineligible page
      res.redirect('/mvp/0/account-change/overseas')
    }
  
  });


// Run this code when a form is submitted to 'location-of-account' in option 1 nav
router.post('/location-of-account0', function (req, res) {

  // Make a variable and give it the value from 'account-location'
  var accountLocation0 = req.session.data['account-location']

  // Check whether the variable matches a condition
  if (accountLocation0 == "uk"){
    // Send user to next page
    res.redirect('/mvp/0/nav-options/option-1-full/account-change/account-details')
  } else {
    // Send user to ineligible page
    res.redirect('/mvp/0/nav-options/option-1-full/account-change/overseas')
  }

});


// Run this code when a form is submitted to 'confirm-bank-name'
router.post('/confirm-bank-name', function (req, res) {

    // Make a variable and give it the value from 'confirm-bank'
    var bankNameConfirm = req.session.data['confirm-bank']
  
    // Check whether the variable matches a condition
    if (bankNameConfirm == "yes"){
      // Send user to next page
      res.redirect('/mvp/0/account-change/check-answers')
    } else {
      // Send user bank to enter account details page
      res.redirect('/mvp/0/account-change/account-details')
    }
  
  });


// Run this code when a form is submitted to 'confirm-bank-name' in option 1 nav
router.post('/confirm-bank-name0', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var bankNameConfirm0 = req.session.data['confirm-bank']

  // Check whether the variable matches a condition
  if (bankNameConfirm0 == "yes"){
    // Send user to next page
    res.redirect('/mvp/0/nav-options/option-1-full/account-change/check-answers')
  } else {
    // Send user bank to enter account details page
    res.redirect('/mvp/0/nav-options/option-1-full/account-change/account-details')
  }

});

//-------------------------------------------------------------------


// MVP VERSION 1


//-------------------------------------------------------------------