//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.get('/EVS/confirmation', function (req, res) {

  const task = req.query.task;
  const value = req.query.value;

  const lookup = {
    none: {
      heading: "You are about to record that the case is closed",
      paragraph: "For 6 months no {spending abroad/capital over threshold} tasks will be created for this person.",
      button: "Case is closed"
    },
    died: {
      heading: "You are about to record that this customer has died",
      paragraph: "No new tasks will be created for this person.",
      button: "Customer has died"
    },
    cfcd: {
      heading: "You are about to record that the case is referred to CFCD",
      paragraph: "No new tasks will be created for this person.",
      button: "Case referred to CFCD"
    },
    postpone: {
      heading: "Postpone task",
      paragraph: "You can come back to this task later. It will move to your postponed list.",
      button: "Confirm postpone"
    },
    forward: {
      heading: "Continue to evidence gathering task",
      paragraph: "We’ll move you to the next evidence gathering step.",
      button: "Continue"
    },
    absence: {
      heading: "You are about to record that the spending period was a temporary absence",
      paragraph: "For 4 weeks no spending abroad tasks will be created for this person.",
      button: "It was a temporary absence"
    },
    suspended: {
      heading: "You are about to record that this claim is suspended",
      paragraph: "For 4 weeks no new tasks will be created for this person.",
      button: "Claim suspended"
    },
    terminated: {
      heading: "You are about to record that this claim is terminated",
      paragraph: "For 6 months no new tasks will be created for this person.",
      button: "Claim terminated"
    },
    disregarded26: {
      heading: "You are about to disregard breaches for 26 weeks",
      paragraph: "For 26 weeks no capital over threshold tasks will be created for this person.",
      button: "Confirm disregard"
    },
    disregarded52: {
      heading: "You are about to disregard breaches for 52 weeks",
      paragraph: "For 52 weeks no capital over threshold tasks will be created for this person.",
      button: "Confirm disregard"
    },
    disregarded2y: {
      heading: "You are about to disregard breaches for 2 years",
      paragraph: "For 2 years no capital over threshold tasks will be created for this person.",
      button: "Confirm disregard"
    }
  };

  const item = lookup[value] || {
    heading: "Unknown outcome",
    paragraph: "",
    button: "Continue"
  };

  res.render('EVS/confirmation', {
    taskName: task,
    readableText: item.heading,
    paragraphText: item.paragraph,
    buttonText: item.button
  });
});

router.post('/abroad-preview', function (req, res) {
  const value = req.session.data['abroadPreview'];

  if (value === 'postpone') {
    return res.redirect('/EVS/postpone');
  } else if (value === 'postpone') {
    return res.redirect('/EVS/postpone');
  } else if (value === 'next') {
    return res.redirect('/EVS/tasks-success-2');
  }

  const task = 'abroad-preview';
  res.redirect(`/EVS/confirmation?task=${task}&value=${value}`);
});




router.post('/abroad-evidence', function (req, res) {
  const value = req.session.data['abroadEvidence'];

  if (value === 'postpone') {
    return res.redirect('/EVS/postpone');
  } else if (value === 'terminated') {
    return res.redirect('/EVS/stop-benefit');
  } else if (value === 'suspend') {
    return res.redirect('/EVS/suspend');
  }
  const task = 'abroad-evidence';
  res.redirect(`/EVS/confirmation?task=${task}&value=${value}`);
});


router.post('/capital-preview', function (req, res) {
  const value = req.session.data['capitalPreview'];

  if (value === 'postpone') {
    return res.redirect('/EVS/postpone');
  } else if (value === 'disregarded') {
    return res.redirect('/EVS/disregarded');
  } else if (value === 'next') {
    return res.redirect('/EVS/tasks-success-2');
  }

  const task = 'capital-preview';
  res.redirect(`/EVS/confirmation?task=${task}&value=${value}`);
});

router.post('/capital-evidence', function (req, res) {
  const value = req.session.data['capitalEvidence'];

  if (value === 'postpone') {
    return res.redirect('/EVS/postpone');
  } else if (value === 'overpayment') {
    return res.redirect('/EVS/overpayment');
  } else if (value === 'underpayment') {
    return res.redirect('/EVS/underpayment');
  } else if (value === 'disregarded') {
    return res.redirect('/EVS/disregarded');
  }

  const task = 'capital-evidence';
  res.redirect(`/EVS/confirmation?task=${task}&value=${value}`);
});


router.post('/disregarded', function (req, res) {
  const value = req.session.data['disregarded'];

  const task = 'disregarded';
  res.redirect(`/EVS/confirmation?task=${task}&value=${value}`);
});

router.post('/suspend', function (req, res) {
  const value = req.session.data['suspend'];

  const task = 'suspended';
  res.redirect(`/EVS/confirmation?task=${task}&value=${value}`);
});

router.post('/terminated', function (req, res) {
  const value = req.session.data['terminated'];

  const task = 'terminated';
  res.redirect(`/EVS/confirmation?task=${task}&value=${value}`);
});








module.exports = router