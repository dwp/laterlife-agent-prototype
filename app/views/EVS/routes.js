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
  'none',
  'died',
  'cfcd',
  'cfcd_close',
  'postpone',
  'forward',
  'absence',
  'suspended',
  'terminated',
  'disregarded', 
  'overpayment',
  'underpayment',
  'suspend',
  'update',
  'recordPostpone',
  'createEvidenceTask'
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
  'recordOver',
  'recordUnder',
  'updateReason',
  'recordPostpone',
  'cfcd'
];

// Absolute safe route targets (prevents traversal + open redirect false positives)
const safeRoutes = [
  '/EVS/confirmation',
  '/EVS/postpone',
  '/EVS/stop-benefit',
  '/EVS/suspend',
  '/EVS/disregarded',
  '/EVS/overpayment',
  '/EVS/underpayment',
  '/EVS/recordOver',
  '/EVS/recordUnder',
  '/EVS/update-to-pc',
  '/EVS/updateReason',
  '/EVS/tasks-success',
  '/EVS/recordPostpone',
  '/EVS/cfcd'
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
// Confirmation GET Route
// ---------------------------------------------
router.get('/EVS/confirmation', function (req, res) {
  const { task, value } = req.query;

  // Validate both parameters before using
  if (!allowedTasks.includes(task) || !allowedValues.includes(value)) {
    return res.status(400).send('Invalid request');
  }

  // Lookup table for dynamic text for confirmation pages
  const lookup = {
    none: {
      heading: "You are about to record that the case is closed",
      paragraph: "For 6 months no spending { abroad/capital over threshold } tasks will be created for this person.",
      button: "Case is closed",
      style: "govuk-button--warning"
    },
    cfcd_close: {
      heading: "You are about to record that the task is referred to CFCD and close the task.",
      paragraph: "You confirmed a CFEMS flag is present for this customer.",
      button: "Case is closed",
      style: "govuk-button--warning"
    },
    died: {
      heading: "The customer has died",
      paragraph: "This case will be closed.",
      button: "End task"
    },
    cfcd: {
      heading: "You are about to record that the task is referred to CFCD and postpone the task.",
      paragraph: "Task will be postponed for 4 weeks to allow time for a CFEMS flag to be set for this customer.",
      button: "Postpone task"
    },
    recordPostpone: {
      heading: "Postpone task",
      paragraph: "This case will be postponed utill { selected date }.",
      button: "Postpone task"
    },
    absence: {
      heading: "The spending period was a temporary absence",
      paragraph: "This case will be closed.",
      button: "End task"
    },
    suspended: {
      heading: "You are about to record that this claim is suspended",
      paragraph: "Postpone task for 4 weeks before making a final descion.",
      button: "Postpone task"
    },
    terminated: {
      heading: "You are about to record that this claim is terminated",
      paragraph: "This case will be closed.",
      button: "Claim terminated"
    },
    disregarded: {
      heading: "You are about to disregard breaches",
      paragraph: "For 6 months no capital over threshold tasks will be created for this person.",
      button: "Disregard breaches",
      style: "govuk-button--warning"
    },
    overpayment: {
      heading: "You are about to record an overpayment of Pension Credit",
      paragraph: "For 6 months no capital over threshold tasks will be created for this person.",
      button: "Record overpayment",
      style: "govuk-button--warning"
    },
    underpayment: {
      heading: "You are about to record an underpayment of Pension Credit",
      paragraph: "For 6 months no capital over threshold tasks will be created for this person.",
      button: "Record underpayment",
      style: "govuk-button--warning"
    },
    createEvidenceTask: {
      heading: "Create evidence gathering task",
      paragraph: "This task will be closed and a new evidence gathering task will be created",
      button: "Create evidence task"
    }
  };

  const item = lookup[value];

  res.render('EVS/confirmation', {
    taskName: task,
    readableText: item.heading,
    paragraphText: item.paragraph,
    buttonText: item.button,
    buttonStyle: item.style
  });
});

// ---------------------------------------------
// POST Route Factory checks if routes and values are safe and routs to confirmations.
// ---------------------------------------------
function createPostRoute(path, sessionKey, fixedTask, redirects = {}) {
  router.post(path, function (req, res) {
    const value = req.session.data[sessionKey];
    const first = Array.isArray(value) ? value[0] : value;

    // Validate value before anything else
    if (!allowedValues.includes(first)) {
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
  postpone: '/EVS/postpone'
});

createPostRoute('/abroad-evidence', 'abroadEvidence', 'abroad-evidence', {
  cfcd: '/EVS/cfcd',
  postpone: '/EVS/postpone',
  terminated: '/EVS/stop-benefit',
  suspend: '/EVS/suspend'
});

createPostRoute('/capital-evidence', 'capitalEvidence', 'capital-evidence', {
  cfcd: '/EVS/cfcd',
});

createPostRoute('/capital-preview', 'capitalPreview', 'capital-preview', {
  postpone: '/EVS/postpone'
});

createPostRoute('/capital-evidence', 'capitalEvidence', 'capital-evidence', {
  postpone: '/EVS/postpone',
  update: '/EVS/update-to-pc'
});

createPostRoute('/updateReason', 'updateReason', 'updateReason', {
  overpayment: '/EVS/overpayment',
  underpayment: '/EVS/underpayment',
  suspend: '/EVS/suspend',
  terminated: '/EVS/stop-benefit'
});

createPostRoute('/disregarded', 'disregarded', 'disregarded');
createPostRoute('/suspend', 'suspend', 'suspended');
createPostRoute('/terminated', 'terminated', 'terminated');
createPostRoute('/cfcd', 'cfcd', 'cfcd');


router.post('/EVS/recordOver', function (req, res) {
  const raw = req.session.data['over'];
  const value = allowedValues.includes(raw) ? raw : 'overpayment';

  return safeInternalRedirect(res, '/EVS/confirmation', {
    task: 'recordOver',
    value
  });
});

router.post('/EVS/recordPostpone', function (req, res) {
  const raw = req.session.data['recordPostpone'];
  const value = allowedValues.includes(raw) ? raw : 'recordPostpone';

  return safeInternalRedirect(res, '/EVS/confirmation', {
    task: 'recordPostpone',
    value
  });
});


router.post('/EVS/recordUnder', function (req, res) {
  const raw = req.session.data['under'];
  const value = allowedValues.includes(raw) ? raw : 'underpayment';

  return safeInternalRedirect(res, '/EVS/confirmation', {
    task: 'recordUnder',
    value
  });
});



// ---------------------------------------------
module.exports = router;