// ---------------------------------------------
// GOV.UK Prototype Kit - Safe Routing
// ---------------------------------------------
const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

router.post('/check-payment-changes', function (req, res) {
  if (req.session.data['check-payment-changes'] == "no") {
    req.session.data['review1'] = "done"
    res.redirect("check-for-change-of-award")
  }
  else {
    res.redirect("check-income-changes")
  }
});

router.post('/check-income-changes', function (req, res) {
  if (req.session.data['check-income-changes'] == "yes") {
    res.redirect("use-previous-payments")
  }
  else {
    req.session.data['review1'] = "done"
    res.redirect("check-for-change-of-award")
  }
});

router.post('/use-previous-payments', function (req, res) {
  if (req.body.action === 'information') {
    req.session.data['moveReason'] = "contact"
    res.redirect("change-not-possible")
  } else {
    if (req.session.data['use-previous-payments'] == "none") {
      res.redirect("add-pension-payment")
    } else {
      res.redirect("payment-list")
    }
  }
});

router.post('/add-pension-payment', function (req, res) {
  res.redirect("payment-list")
});

router.post('/payment-list', function (req, res) {
  if (req.body.action === 'information') {
    req.session.data['moveReason'] = "contact"
    res.redirect("change-not-possible")
  }
  else {
    res.redirect("check-calculated-amount")
  }
});

router.post('/deleteYN', function (req, res) {
    res.redirect("payment-list")
});

router.post('/check-calculated-amount', function (req, res) {
  if (req.session.data['check-calculated-amount'] == "moreInfo") {
    req.session.data['moveReason'] = "contact"
    res.redirect("change-not-possible")
  }
  else if (req.session.data['check-calculated-amount'] == "no") {
    res.redirect("payment-list")
  } else {
    req.session.data['review1'] = "done"
    res.redirect("check-for-change-of-award")
  }
});

router.post('/single-payment-check', function (req, res) {
  if (req.session.data['single-payment-check'] == "yesRepresentative") {
    res.redirect("check-calculated-amount?single-payment=true")
  } else if (req.session.data['single-payment-check'] == "no") {
    req.session.data['moveReason'] = "singlePayment"
    res.redirect("change-not-possible")
  } else if (req.session.data['single-payment-check'] == "yesMore") {
    res.redirect("payment-list")
  } else {
    res.redirect("check-calculated-amount?single-payment=true")
  }
});

router.post('/PC-award-changed', function (req, res) {
  req.session.data['changeStatus'] = "true"
    if (req.session.data['arrears'] !== "true") {
      req.session.data['debt'] = "true"
    } 
    res.redirect("check-for-change-of-award")
  
});

router.post('/PC-award-no-change', function (req, res) {
    req.session.data['changeStatus'] = "none"
    res.redirect("check-for-change-of-award")
});

router.post('/PC-not-entitled', function (req, res) {
    req.session.data['changeStatus'] = "notEntitled"
    res.redirect("check-for-change-of-award")
});

// DEBT / OVERPAYMENT
router.post('/debt-referral-possible', function (req, res) {
  if (req.session.data['debt-referral-possible'] == "no") {
      req.session.data['debt'] = "done"
      res.redirect("check-for-change-of-award")
  } else {
    res.redirect("debt-referral-data")
  }
});

router.post('/debt-referral-data', function (req, res) {
    req.session.data['debt'] = "done"
    res.redirect("check-for-change-of-award")
});


// MOVE CLAIMANT
router.post('/change-not-possible', function (req, res) {
  res.redirect("confirm-claimant-move1")
});

router.post('/confirm-claimant-move1', function (req, res) {
  res.redirect("tasks?pensionReviewComplete=true")
});


// SET NEW REVIEW DATE
router.post('/decide-review-needed', function (req, res) {
  if (req.session.data['decide-review-needed'] == "yes") {
    res.redirect("set-review-date")
  }
  else {
    res.redirect("review-CYA")
  }
});

router.post('/set-review-date', function (req, res) {
  res.redirect("review-CYA")
});

router.post('/review-CYA', function (req, res) {
  req.session.data['review'] = "done"
  res.redirect("check-for-change-of-award")
});

router.post('/check-for-change-of-award', function (req, res) {
  res.redirect("tasks?pensionReviewComplete=true")
});




// ---------------------------------------------
module.exports = router;