// ---------------------------------------------
// GOV.UK Prototype Kit - Safe Routing
// ---------------------------------------------
const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

router.post('/pensionChanges/check-payment-changes', function (req, res) {
  if (req.session.data['check-payment-changes'] == "no") {
    res.redirect("decide-review-needed")
  }
  else {
    res.redirect("check-income-changes")
  }
});

router.post('/pensionChanges/check-income-changes', function (req, res) {
  if (req.session.data['check-income-changes'] == "yes") {
    res.redirect("use-previous-payments")
  }
  else {
    res.redirect("decide-review-needed")
  }
});

router.post('/pensionChanges/use-previous-payments', function (req, res) {
  if (req.body.action === 'information') {
    res.redirect("change-not-possible")
  } else {
    if (req.session.data['use-previous-payments'] == "none") {
      res.redirect("add-pension-payment")
    } else {
      res.redirect("payment-list")
    }
  }
});

router.post('/pensionChanges/add-pension-payment', function (req, res) {
  res.redirect("payment-list")
});

router.post('/pensionChanges/payment-list', function (req, res) {
  if (req.body.action === 'information') {
    res.redirect("change-not-possible")
  }
  else {
    res.redirect("check-calculated-amount")
  }
});

router.post('/check-calculated-amount', function (req, res) {
  if (req.session.data['check-calculated-amount'] == "moreInfo") {
    res.redirect("change-not-possible")
  }
  else if (req.session.data['check-calculated-amount'] == "no") {
    res.redirect("payment-list")
  } else {
    res.redirect("PC-award-changed")
  }
});

router.post('/single-payment-check', function (req, res) {
  if (req.session.data['single-payment-check'] == "yesRepresentative") {
    res.redirect("check-calculated-amount?single-payment=true")
  } else if (req.session.data['single-payment-check'] == "no") {
    res.redirect("change-not-possible")
  } else if (req.session.data['single-payment-check'] == "yesMore") {
    res.redirect("payment-list")
  } else {
    res.redirect("check-calculated-amount?single-payment=true")
  }
});

router.post('/PC-award-changed', function (req, res) {
    req.session.data['changeStatus'] = "true"
    res.redirect("decide-review-needed")
});

router.post('/PC-not-entitled', function (req, res) {
    req.session.data['changeStatus'] = "notEntitled"
    res.redirect("review-CYA")
});


// MOVE CLAIMANT
router.post('/pensionChanges/change-not-possible', function (req, res) {
  res.redirect("confirm-claimant-move1")
});

router.post('/confirm-claimant-move1', function (req, res) {
  res.redirect("tasks?pensionReviewComplete=true")
});


// SET NEW REVIEW DATE
router.post('/pensionChanges/decide-review-needed', function (req, res) {
  if (req.session.data['decide-review-needed'] == "yes") {
    res.redirect("set-review-date")
  }
  else {
    res.redirect("review-CYA")
  }
});

router.post('/pensionChanges/set-review-date', function (req, res) {
  res.redirect("review-CYA")
});

router.post('/pensionChanges/review-CYA', function (req, res) {
  res.redirect("tasks?pensionReviewComplete=true")
});




// ---------------------------------------------
module.exports = router;