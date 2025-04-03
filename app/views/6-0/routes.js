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
  //This just sets up the necesary data we'll need for the payment suspend journey
  req.session.data['SPpaymentStatus'] = 'In payment';
  req.session.data['PCpaymentStatus'] = 'In payment';
  res.render("/" + version + "/find");
});

router.get('/payment-suspend', function (req, res) {
  //This if statement is looking to see if one of the benefits has already been stopped

  // if no benefit has been stopped we show the page
  if(req.session.data['SPpaymentStatus'] == 'In payment' && req.session.data['PCpaymentStatus'] == 'In payment'){
   res.render("/" + version + "/payment-suspend");
  }
  // else if SP is in payment then we're suspending SP we don't need to ask the which benefit question
  else if(req.session.data['SPpaymentStatus'] == 'In payment'){
    req.session.data['benefitSuspend'] = 'SP';// set the benefit to suspend as SP this replicates what the question would have done
    res.redirect("payment-suspend-reason")
  }
  // else if PC is in payment then we're suspending PC we don't need to ask the which benefit question
  else if(req.session.data['PCpaymentStatus'] == 'In payment'){
    req.session.data['benefitSuspend'] = 'PC'; // set the benefit to suspend as PC this replicates what the question would have done
    res.redirect("payment-suspend-reason")
  }
});

router.post('/payment-suspend', function(req, res) {
  res.redirect("payment-suspend-reason")
});

router.post('/payment-suspend-reason', function(req, res) {
  if(req.session.data['suspendReason'] == 'other'){
    res.redirect("payment-suspend-error")
  }
  else{
    // this is where we create our objects to add to the paymentTimelineArray
    let temporaryArray = []; // creates a temporary array
    if(req.session.data['paymentTimelineArray']){
      temporaryArray = req.session.data['paymentTimelineArray'] //checks to see if we already have objects in the paymentTimelineArray
    }
    let personArray = ["John Jones", "Alice Webb", "Sandra Dean", "Stuart Rith"]; // This creates an array of names to use later
    let random = Math.floor(Math.random() * personArray.length); // This is a random number generatot. It will create a random number between 1 and the number of names in the above array
    
    // just setting up some variables to use in the object
    let title;
    let date = new Date(); //this gets the current timestamp
    let benefits;

    if( req.session.data['benefitSuspend'] == "both"){
      // we now set the data to use in the timeline
      title = "Payments stopped";
      benefits= "SPPC";
      // we also set the seperate sesssion data that controls what happens to the oayments on the payment page
      req.session.data['SPpaymentStatus'] = "Suspended";
      req.session.data['PCpaymentStatus'] = "Suspended";
    }
    else if(req.session.data['benefitSuspend'] == 'PC'){
      title = "Pension Credit payments stopped";
      benefits= "PC";
      req.session.data['PCpaymentStatus'] = "Suspended";
    }
    else if(req.session.data['benefitSuspend'] == 'SP'){
      title = "State Pension payments stopped";
      benefits= "SP";
      req.session.data['SPpaymentStatus'] = "Suspended";
    }
    // now we create the obkect
    let temporaryObject = {date: date, benefits: benefits, title: title, person: personArray[random], reason: req.session.data['suspendReason']}
    
    // add the object to the array
    temporaryArray.unshift(temporaryObject); // unshift add it to the beginning of the array so we keep this in reverse chronilogical order
    req.session.data['paymentTimelineArray'] =  temporaryArray; // next we store the array of objects into a session to use in the timeline

    req.session.data['successBanner'] = 'true';
    res.redirect("payment")
  }
});

router.post('/payment-suspend-resume', function(req, res) {
  // this does exactly the same as the above to add the events for restart/resume
  let temporaryArray = [];
    if(req.session.data['paymentTimelineArray']){
      temporaryArray = req.session.data['paymentTimelineArray']
    }
    let personArray = ["John Jones", "Alice Webb", "Sandra Dean", "Stuart Rith"];
    let random = Math.floor(Math.random() * personArray.length);
    let title;
    let date = new Date();
    let benefits;
  
    if( req.session.data['benefitResumed'] == "both"){
      title = "Payments restarted";
      benefits= "SPPC";
      req.session.data['SPpaymentStatus'] = "In payment";
      req.session.data['PCpaymentStatus'] = "In payment";
    }
    else if(req.session.data['benefitResumed'] == 'PC'){
      title = "Pension Credit payments restarted";
      benefits= "PC";
      req.session.data['PCpaymentStatus'] = "In payment";
    }
    else if(req.session.data['benefitResumed'] == 'SP'){
      title = "State Pension payments restarted";
      benefits= "SP";
      req.session.data['SPpaymentStatus'] = "In payment";
    }

    let temporaryObject = {date: date, benefits: benefits, title: title, person: personArray[random], reason:""}
    temporaryArray.unshift(temporaryObject);
    req.session.data['paymentTimelineArray'] =  temporaryArray;

  req.session.data['successBanner'] = 'true';
  res.redirect("payment")
});



module.exports = router