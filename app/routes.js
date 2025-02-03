//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// MVP VERSION 5

// Remove claimant journey code 

// Run this code when you want to choose to pay the next PC payment in the remove claimant journey
router.post('/payNextConfirm', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var payNextConfirm = req.session.data['payNextConfirm']

  // Check whether the variable matches a condition
  if (payNextConfirm == "yes"){
    // Send user to next page
    res.redirect('/mvp/remove-claimant-pay-next-confirm-A')
  } else {
    // Send user back to the personal tab
    res.redirect('/mvp/remove-claimant-pay-next-confirm-B')
  }

});


// Run this code when when you want to remove claimant and either change amount or the claimant is no longer entitled.  
router.post('/selectReasonRemovePC', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var removePCChangeReason = req.session.data['selectReasonRemovePC']

  // Check whether the variable matches a condition
  if (removePCChangeReason == "PC-change"){
    // Send user to next page
    res.redirect('/mvp/remove-claimant-pay-next')
  } else {
    // Send user back to the personal tab
    res.redirect('/mvp/remove-claimant-date')
  }

});



// Remove contact details code 

// Run this code when a form is submitted to remove a contact - email 'contact-remove-email'
router.post('/contact-remove-email', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var ContactRemove = req.session.data['email-remove']

  // Check whether the variable matches a condition
  if (ContactRemove == "yes"){
    // Send user to next page
    res.redirect('/mvp/contact-success-remove-email')
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
    res.redirect('/mvp/contact-success-remove-homephone.html')
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
    res.redirect('/mvp/contact-success-remove-mobile')
  } else {
    // Send user to name incorrect page 
    res.redirect('/mvp/contact')
  }

});



// Run this code when a user wants to select a residential address or enter manually
router.post('/select-address', function(request, response) {

  var selectAddress = request.session.data['select-address']
  if (selectAddress == "1 Elm Street"){
      response.redirect("/mvp/contact-success-change-address")} 
  else if (selectAddress == "10 Elm Street"){
        response.redirect("/mvp/contact-success-change-address")} 
  else if (selectAddress == "11 Elm Street"){
          response.redirect("/mvp/contact-success-change-address")} 
  else {
    response.redirect("/mvp/change-address-manual")
} 
  
})


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




// MVP VERSION 4


// Remove claimant journey code 

// Run this code when you want to choose to pay the next PC payment in the remove claimant journey
router.post('/payNextConfirm', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var payNextConfirm = req.session.data['payNextConfirm']

  // Check whether the variable matches a condition
  if (payNextConfirm == "yes"){
    // Send user to next page
    res.redirect('/mvp-iteration-4/remove-claimant-pay-next-confirm-A')
  } else {
    // Send user back to the personal tab
    res.redirect('/mvp-iteration-4/remove-claimant-pay-next-confirm-B')
  }

});


// Run this code when when you want to remove claimant and either change amount or the claimant is no longer entitled.  
router.post('/selectReasonRemovePC', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var removePCChangeReason = req.session.data['selectReasonRemovePC']

  // Check whether the variable matches a condition
  if (removePCChangeReason == "PC-change"){
    // Send user to next page
    res.redirect('/mvp-iteration-4/remove-claimant-pay-next')
  } else {
    // Send user back to the personal tab
    res.redirect('/mvp-iteration-4/remove-claimant-date')
  }

});



// Remove contact details code 

// Run this code when a form is submitted to remove a contact - email 'contact-remove-email'
router.post('/contact-remove-email', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var ContactRemove = req.session.data['email-remove']

  // Check whether the variable matches a condition
  if (ContactRemove == "yes"){
    // Send user to next page
    res.redirect('/mvp-iteration-4/contact-success-remove-email')
  } else {
    // Send user to name incorrect page 
    res.redirect('/mvp-iteration-4/contact')
  }

});



// Run this code when a form is submitted to remove a contact - homephone 'contact-remove-homephone'
router.post('/contact-remove-homephone', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var ContactRemove = req.session.data['homephone-remove']

  // Check whether the variable matches a condition
  if (ContactRemove == "yes"){
    // Send user to next page
    res.redirect('/mvp-iteration-4/contact-success-remove-homephone.html')
  } else {
    // Send user to name incorrect page 
    res.redirect('/mvp-iteration-4/contact')
  }

});

// Run this code when a form is submitted to remove a contact - mobile 'contact-remove-mobile'
router.post('/contact-remove-mobile', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var ContactRemove = req.session.data['mobilephone-remove']

  // Check whether the variable matches a condition
  if (ContactRemove == "yes"){
    // Send user to next page
    res.redirect('/mvp-iteration-4/contact-success-remove-mobile')
  } else {
    // Send user to name incorrect page 
    res.redirect('/mvp-iteration-4/contact')
  }

});



// Run this code when a user wants to select a residential address or enter manually
router.post('/select-address', function(request, response) {

  var selectAddress = request.session.data['select-address']
  if (selectAddress == "1 Elm Street"){
      response.redirect("/contact-success-change-address")} 
  else if (selectAddress == "10 Elm Street"){
        response.redirect("/contact-success-change-address")} 
  else if (selectAddress == "11 Elm Street"){
          response.redirect("/contact-success-change-address")} 
  else {
    response.redirect("/mvp-iteration-4/change-address-manual")
} 
  
})


// Run this code when a form is submitted to 'bank-name-answer'
router.post('/changed-bank-answer', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var bankNameConfirm = req.session.data['changed-bank']

  // Check whether the variable matches a condition
  if (bankNameConfirm == "yes"){
    // Send user to next page
    res.redirect('/mvp-iteration-4/bank-cya')
  } else {
    // Send user to name incorrect page 
    res.redirect('/mvp-iteration-4/bank-name-incorrect')
  }

});


// MVP VERSION 3


// Suspend journey code (no longer used in v4 or above) 

// Run this code when when PC is already suspended and a user wants to also suspend SP. Radios are on the are you sure page. 
router.post('/confirm-sp-suspend', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var suspendSPConfirm = req.session.data['suspend-sp-confirm']

  // Check whether the variable matches a condition
  if (suspendSPConfirm == "yes"){
    // Send user to next page
    res.redirect('/personal-suspended-sp-both')
  } else {
    // Send user back to the personal tab
    res.redirect('/personal-suspended-no-success')
  }

});

// Run this code when when SP is already suspended and a user wants to also suspend PC. Radios are on the are you sure page. 
router.post('/confirm-pc-suspend', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var suspendPCConfirm = req.session.data['suspend-pc-confirm']

  // Check whether the variable matches a condition
  if (suspendPCConfirm == "yes"){
    // Send user to next page
    res.redirect('/personal-suspended-pc-both')
  } else {
    // Send user back to the personal tab
    res.redirect('/personal-suspended-no-success')
  }

});




// MVP VERSION 2






// Run this code when a wants to suspend a benefit - Death or both 
router.post('/mvp-iteration-3/stop-benefit', function (req, res) {
  if  (req.body['stopbenefit'] === 'suspend') {
    res.redirect('suspend-benefit')
  } else if (req.body['stopbenefit'] === 'death') {
    res.redirect('personal-suspended-death')
  } else {
    res.redirect('stop-benefit')
  }
})




// Run this code when a user has stopped both SP & PC and then they want to start a payment again
router.post('/restart', function (req, res) {
  if (req.body['restart'] === 'both') {
    res.redirect('personal-restarted')
  } else if (req.body['restart'] === 'sp') {
    res.redirect('personal-restarted-sp-only')
  } else if (req.body['restart'] === 'pc') {
    res.redirect('personal-restarted-pc-only')
  }
})

// Run this code when a user wants to restart PC payments - radio buttons 
router.post('/changed-restart-answer', function (req, res) {

  // Make a variable and give it the value from 'personal restarted'
  var restartPayments = req.session.data['restart-pc']

  // Check whether the variable matches a condition
  if (restartPayments == "yes"){
    // Send user to restart page
    res.redirect('/personal-restarted-pc')
  } else {
    // Send user to suspended page
    res.redirect('/personal-suspended-no-success')
  }

});


// Run this code when a user wants to restart SP payments - radio buttons 
router.post('/changed-restart-answer-sp', function (req, res) {

  // Make a variable and give it the value from 'personal restarted'
  var restartPaymentsSP = req.session.data['restart-sp']

  // Check whether the variable matches a condition
  if (restartPaymentsSP == "yes"){
    // Send user to restart page
    res.redirect('/personal-restarted-sp')
  } else {
    // Send user to suspended page
    res.redirect('/personal-suspended-no-success')
  }

});

// Run this code when a user wants to confirm a death
router.post('/confirm-death', function (req, res) {

  // Make a variable and give it the value from 'death confirm'
  var confirmDeath = req.session.data['death-confirm']

  // Check whether the variable matches a condition
  if (confirmDeath == "yes"){
    // Send user to restart page
    res.redirect('/personal-suspended-death')
  } else {
    // Send user to suspended page
    res.redirect('/personal-suspended-no-success')
  }

});



// Run this code when a user wants to choose to suspend due to death or SP only
router.post('/stop-benefit-death-sp', function (req, res) {

  // Make a variable and give it the value from 'death confirm'
  var confirmDeathSP = req.session.data['stopbenefit-death-sp']

  // Check whether the variable matches a condition
  if (confirmDeathSP == "death"){
    // Send user to restart page
    res.redirect('/personal-suspended-death')
  } else {
    // Send user to suspended page
    res.redirect('/personal-suspended-sp-both')
  }

});


// Run this code when a user wants to choose to suspend due to death or PC only
router.post('/stop-benefit-death-pc', function (req, res) {

  // Make a variable and give it the value from 'death confirm'
  var confirmDeathPC = req.session.data['stopbenefit-death-pc']

  // Check whether the variable matches a condition
  if (confirmDeathPC == "death"){
    // Send user to restart page
    res.redirect('/personal-suspended-death')
  } else {
    // Send user to suspended page
    res.redirect('/personal-suspended-pc-both')
  }

});



//-------------------------------------------------------------------


// MVP VERSION 1


//-------------------------------------------------------------------
