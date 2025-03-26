//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// VERSION 6 (post MVP)




// Manage payments - confirm recall in CPS. HTML page: payment-recall-cps-local.html

// Run this code when you are sure the change of circ is a date in the future
router.post('/confirm-recall', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var confirmRecall = req.session.data['confirmRecallCps']

  // Check whether the variable matches a condition
  if (confirmRecall == "yes"){
    // Send user to confirm page
    res.redirect('payment-success-recalled')
  } else {
    // Send user back to other confirm page 
    res.redirect('payment-success-recalled-unsuccessful')
  }

});



// Move to CAM or GySP journey


// Run this code when you are sure the change of circ is a date in the future
router.post('/confirm-return', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var confirmReturn = req.session.data['confirm-return']

  // Check whether the variable matches a condition
  if (confirmReturn == "yes"){
    // Send user to confirm page
    res.redirect('payment-success-returned')
  } else {
    // Send user back to other confirm page 
    res.redirect('payment-details-1')
  }

});



// MVP VERSION 5

// Move to CAM or GySP journey


// Run this code when you are sure the change of circ is a date in the future
router.post('/confirm-future', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var confirmFuture = req.session.data['confirm-future']

  // Check whether the variable matches a condition
  if (confirmFuture == "yes"){
    // Send user to confirm page
    res.redirect('remove-claimant-date-confirm-future')
  } else {
    // Send user back to other confirm page 
    res.redirect('remove-claimant-date')
  }

});


// Run this code when you want to choose to pay the next PC payment in the remove claimant journey
router.post('/payNextConfirm', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var payNextConfirm = req.session.data['payNextConfirm']

  // Check whether the variable matches a condition
  if (payNextConfirm == "yes"){
    // Send user to confirm page
    res.redirect('remove-claimant-pay-next-confirm-A')
  } else {
    // Send user back to other confirm page 
    res.redirect('remove-claimant-pay-next-confirm-B')
  }

});


// Radio buttons page 'Why do you want to move the claimant?' 

router.post('/selectReason', function(request, response) {

  var RemovePC = request.session.data['removeReason']
  if (RemovePC == "entitled"){
      response.redirect('remove-claimant-pay-next')
  } else {
      response.redirect('remove-claimant-date')
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
    res.redirect('contact-success-remove-email')
  } else {
    // Send user to name incorrect page 
    res.redirect('contact')
  }

});



// Run this code when a form is submitted to remove a contact - homephone 'contact-remove-homephone'
router.post('/contact-remove-homephone', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var ContactRemove = req.session.data['homephone-remove']

  // Check whether the variable matches a condition
  if (ContactRemove == "yes"){
    // Send user to next page
    res.redirect('contact-success-remove-homephone.html')
  } else {
    // Send user to name incorrect page 
    res.redirect('contact')
  }

});

// Run this code when a form is submitted to remove a contact - mobile 'contact-remove-mobile'
router.post('/contact-remove-mobile', function (req, res) {

  // Make a variable and give it the value from 'confirm-bank'
  var ContactRemove = req.session.data['mobilephone-remove']

  // Check whether the variable matches a condition
  if (ContactRemove == "yes"){
    // Send user to next page
    res.redirect('contact-success-remove-mobile')
  } else {
    // Send user to name incorrect page 
    res.redirect('contact')
  }

});


// Run this code when a user wants to select a residential address or enter manually
router.post('/select-address', function(request, response) {

  var selectAddress = request.session.data['select-address']
  if (selectAddress == "1 Elm Street"){
      response.redirect('contact-success-change-address')} 
  else if (selectAddress == "10 Elm Street"){
        response.redirect('contact-success-change-address')} 
  else if (selectAddress == "11 Elm Street"){
          response.redirect('contact-success-change-address')} 
  else {
    response.redirect('change-address-manual')
} 
  
})



////// SUSPEND PAYMENTS /////
let version = '6-0'

router.get('/find', function (req, res) {
  req.session.data['timelineStage'] = 0;
  req.session.data['SPpaymentStatus'] = 'In payment';
  req.session.data['PCpaymentStatus'] = 'In payment';
  res.render("/" + version + "/find");
});

router.get('/payment-suspend', function (req, res) {
  if(req.session.data['SPpaymentStatus'] == 'In payment' && req.session.data['PCpaymentStatus'] == 'In payment'){
   res.render("/" + version + "/payment-suspend");
  }
  else if(req.session.data['SPpaymentStatus'] == 'In payment'){
    req.session.data['benefitSuspend'] = 'SP';
    res.redirect("payment-suspend-reason")
  }
  else if(req.session.data['PCpaymentStatus'] == 'In payment'){
    req.session.data['benefitSuspend'] = 'PC';
    res.redirect("payment-suspend-reason")
  }
});

router.post('/payment-suspend', function(req, res) {
  res.redirect("payment-suspend-reason")
});

router.post('/payment-suspend-reason', function(req, res) {
  if(req.session.data['suspendReason'] == 'other'){
    req.session.data['timelineStage'] = 0;
    res.redirect("payment-suspend-error")
  }
  else{
    if( req.session.data['benefitSuspend'] == "both"){
      req.session.data['SPpaymentStatus'] = "Suspended";
      req.session.data['PCpaymentStatus'] = "Suspended";
      req.session.data['timelineStage'] = 1;
    }
    else if(req.session.data['benefitSuspend'] == 'PC'){
      req.session.data['PCpaymentStatus'] = "Suspended";
      req.session.data['timelineStage'] = 1;
    }
    else if(req.session.data['benefitSuspend'] == 'SP'){
      req.session.data['SPpaymentStatus'] = "Suspended";
      req.session.data['timelineStage'] = 1;
    }
    req.session.data['successBanner'] = 'true';
    res.redirect("payment")
  }
});

router.post('/payment-suspend-resume', function(req, res) {
  req.session.data['timelineStage'] = 2;
  
  if(req.session.data['benefitResumed']=='both'){
    req.session.data['SPpaymentStatus'] = 'In payment';
    req.session.data['PCpaymentStatus'] = 'In payment';
  }
  else if(req.session.data['benefitResumed']=='PC'){
    req.session.data['PCpaymentStatus'] = 'In payment';
  }
  else{
    req.session.data['SPpaymentStatus'] = 'In payment';
  }
  req.session.data['successBanner'] = 'true';
  res.redirect("payment")
});



module.exports = router