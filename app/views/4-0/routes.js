//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// MVP VERSION 4

// Move to CAM or GySP journey

// Run this code when you want to choose to pay the next PC payment in the remove claimant journey
router.post('/payNextConfirm', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var payNextConfirm = req.session.data['payNextConfirm']

  // Check whether the variable matches a condition
  if (payNextConfirm == "yes"){
    // Send user to confirm page
    res.redirect('/4-0/remove-claimant-pay-next-confirm-A')
  } else {
    // Send user back to other confirm page 
    res.redirect('/4-0/remove-claimant-pay-next-confirm-B')
  }

});


// Radio buttons page 'Why do you want to move the claimant?' 

router.post('/selectReason', function(request, response) {

  var RemovePC = request.session.data['removeReason']
  if (RemovePC == "entitled"){
      response.redirect("/4-0/remove-claimant-pay-next")
  } else {
      response.redirect("/4-0/remove-claimant-date")
  }
})


// Change contact details 


// Run this code when a form is submitted to remove a contact - email 'contact-remove-email'
router.post('/contact-remove-email', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var ContactRemove = req.session.data['email-remove']

  // Check whether the variable matches a condition
  if (ContactRemove == "yes"){
    // Send user to next page
    res.redirect('/4-0//contact-success-remove-email')
  } else {
    // Send user to name incorrect page 
    res.redirect('/4-0//contact')
  }

});



// Run this code when a form is submitted to remove a contact - homephone 'contact-remove-homephone'
router.post('/contact-remove-homephone', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var ContactRemove = req.session.data['homephone-remove']

  // Check whether the variable matches a condition
  if (ContactRemove == "yes"){
    // Send user to next page
    res.redirect('/4-0/contact-success-remove-homephone.html')
  } else {
    // Send user to name incorrect page 
    res.redirect('/4-0/contact')
  }

});

// Run this code when a form is submitted to remove a contact - mobile 'contact-remove-mobile'
router.post('/contact-remove-mobile', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var ContactRemove = req.session.data['mobilephone-remove']

  // Check whether the variable matches a condition
  if (ContactRemove == "yes"){
    // Send user to next page
    res.redirect('/4-0/contact-success-remove-mobile')
  } else {
    // Send user to name incorrect page 
    res.redirect('/4-0/contact')
  }

});


// Run this code when a user wants to select a residential address or enter manually
router.post('/select-address', function(request, response) {

  var selectAddress = request.session.data['select-address']
  if (selectAddress == "1 Elm Street"){
      response.redirect("/4-0/contact-success-change-address")} 
  else if (selectAddress == "10 Elm Street"){
        response.redirect("/4-0/contact-success-change-address")} 
  else if (selectAddress == "11 Elm Street"){
          response.redirect("/4-0//contact-success-change-address")} 
  else {
    response.redirect("/4-0/change-address-manual")
} 
  
})





module.exports = router