// ---------------------------------------------
// GOV.UK Prototype Kit - Safe Routing
// ---------------------------------------------
const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// ---------------------------------------------
// Allowlist setup
// ---------------------------------------------
const allowedTasks = [
  'abroad-preview',
  'abroad-evidence',
  'capital-preview',
  'capital-evidence',
  'disregarded',
  'suspended',
  'terminated'
];

const allowedValues = [
  'none', 'died', 'cfcd', 'postpone', 'forward', 'absence',
  'suspended', 'terminated', 'disregarded26', 'disregarded52',
  'disregarded2y', 'next', 'overpayment', 'underpayment'
];

// ---------------------------------------------
// Helper to validate redirect parameters
// ---------------------------------------------
function safeRedirect(res, task, value) {
  if (!allowedTasks.includes(task)) {
    return res.status(400).send('Invalid task');
  }

  if (!allowedValues.includes(value)) {
    return res.status(400).send('Invalid value');
  }

  return res.redirect(`/EVS/confirmation?task=${task}&value=${value}`);
}

// ---------------------------------------------
// Confirmation screen route
// ---------------------------------------------
router.get('/EVS/confirmation', function (req, res) {

  const task = req.query.task;
  const value = req.query.value;

  // Lookup table for text
  const lookup = {
    none: {
      heading: "You are about to record that the case is closed",
      paragraph: "For 6 months no spending abroad/capital over threshold tasks will be created for this person.",
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


// ---------------------------------------------
// Shared redirect route creator
// ---------------------------------------------
function createPostRoute(path, sessionKey, fixedTask, redirects = {}) {
  router.post(path, function (req, res) {
    const value = req.session.data[sessionKey];

    if (redirects[value]) {
      return res.redirect(redirects[value]);
    }

    return safeRedirect(res, fixedTask, value);
  });
}

// ---------------------------------------------
// All POST routes (clean + safe)
// ---------------------------------------------

createPostRoute('/abroad-preview', 'abroadPreview', 'abroad-preview', {
  postpone: '/EVS/postpone',
  next: '/EVS/tasks-success-2'
});

createPostRoute('/abroad-evidence', 'abroadEvidence', 'abroad-evidence', {
  postpone: '/EVS/postpone',
  terminated: '/EVS/stop-benefit',
  suspend: '/EVS/suspend'
});

createPostRoute('/capital-preview', 'capitalPreview', 'capital-preview', {
  postpone: '/EVS/postpone',
  disregarded: '/EVS/disregarded',
  next: '/EVS/tasks-success-2'
});

createPostRoute('/capital-evidence', 'capitalEvidence', 'capital-evidence', {
  postpone: '/EVS/postpone',
  overpayment: '/EVS/overpayment',
  underpayment: '/EVS/underpayment',
  disregarded: '/EVS/disregarded'
});

createPostRoute('/disregarded', 'disregarded', 'disregarded');
createPostRoute('/suspend', 'suspend', 'suspended');
createPostRoute('/terminated', 'terminated', 'terminated');

// ---------------------------------------------
module.exports = router;