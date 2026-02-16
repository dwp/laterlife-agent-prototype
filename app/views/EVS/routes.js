// ---------------------------------------------
// GOV.UK Prototype Kit - Safe Routing
// ---------------------------------------------
const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// ---------------------------------------------
// Allowlists
// ---------------------------------------------

// Allowed values for confirmation screens
const allowedValues = [
  'none', 'died', 'cfcd', 'postpone', 'forward', 'absence',
  'suspended', 'terminated', 'disregarded26', 'disregarded52',
  'disregarded2y', 'next', 'overpayment', 'underpayment'
];

// Allowed task names in redirect
const allowedTasks = [
  'abroad-preview',
  'abroad-evidence',
  'capital-preview',
  'capital-evidence',
  'disregarded',
  'suspended',
  'terminated',
  'recordOver'
];

// Absolute safe route targets (prevents traversal + open redirect false positives)
const safeRoutes = [
  '/EVS/confirmation',
  '/EVS/postpone',
  '/EVS/stop-benefit',
  '/EVS/suspend',
  '/EVS/disregarded',
  '/EVS/tasks-success-2',
  '/EVS/overpayment',
  '/EVS/underpayment',
  '/EVS/recordOver'
  
];

// ---------------------------------------------
// Shared Safe Redirect Helper
// ---------------------------------------------
function safeInternalRedirect(res, route, params = {}) {
  // Must exactly match allowed internal routes
  if (!safeRoutes.includes(route)) {
    return res.status(400).send('Invalid redirect route');
  }

  const qs = new URLSearchParams(params).toString();
  const fullPath = qs ? `${route}?${qs}` : route;

  // 303 recommended for safe redirects after POST
  return res.redirect(303, fullPath);
}

// ---------------------------------------------
// Confirmation GET Route (now validated)
// ---------------------------------------------
router.get('/EVS/confirmation', function (req, res) {
  const { task, value } = req.query;

  // Validate both parameters before using
  if (!allowedTasks.includes(task) || !allowedValues.includes(value)) {
    return res.status(400).send('Invalid request');
  }

  // Lookup table for dynamic text
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
    },
    overpayment: {
      heading: "You are about to record an overpayment of Pension Credit",
      paragraph: "For 6 months no capital over threshold tasks will be created for this person.",
      button: "Record overpayment"
    }
  };

  const item = lookup[value];

  res.render('EVS/confirmation', {
    taskName: task,
    readableText: item.heading,
    paragraphText: item.paragraph,
    buttonText: item.button
  });
});

// ---------------------------------------------
// POST Route Factory
// ---------------------------------------------
function createPostRoute(path, sessionKey, fixedTask, redirects = {}) {
  router.post(path, function (req, res) {
    const value = req.session.data[sessionKey];

    // Validate value before anything else
    if (!allowedValues.includes(value)) {
      return res.status(400).send('Invalid value');
    }

    // Absolute redirects first (safe routes only)
    if (redirects[value]) {
      return safeInternalRedirect(res, redirects[value]);
    }

    // Safe confirmation redirect
    return safeInternalRedirect(res, '/EVS/confirmation', {
      task: fixedTask,
      value: value
    });
  });
}

// ---------------------------------------------
// All POST routes
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

createPostRoute('/recordOver', 'over', 'recordOver');

// ---------------------------------------------
module.exports = router;