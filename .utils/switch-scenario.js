// @ts-check
/* eslint-disable no-console */
/**
 * @desc A helper to automatically switch a scenario. A scenario module should exists in the folder `src/scenarios`.
 * @changed 2024.12.26, 15:20
 *
 * Use `node .utils/switch-scenario.js --switch {SCENARIO_NAME}` from console to switch scenario
 */

const fs = require('fs');
const path = require('path');

const currPath = path.posix.resolve(__dirname);
const rootPath = path.posix.resolve(path.posix.dirname(currPath));

/** Changes this file which includes proper scenario. See regexp `scenarioIncludeRegex` for contgent matching. */
const includeFile = path.posix.join(rootPath, 'src/scenario.ts');

/** Changes scenario id in this file */
const scenarioIdFile = path.posix.join(rootPath, 'project-scenario-id.txt');

const scenarioIncludeRegex = /(\bfrom (["'])\..*\/)(\S+)\2/;

/**
 * @param {string} requiredScenario
 * @param {object} [opts]
 * @param {boolean} [opts.silent]
 */
function switchScenarioId(requiredScenario, opts = {}) {
  const doLog = !opts.silent;
  doLog && console.log('switch-scenario:switchScenarioId: Working with file:', scenarioIdFile);

  const scenarioId = fs.readFileSync(scenarioIdFile, 'utf8').trim();

  doLog && console.log('switch-scenario:switchScenarioId: Found scenario:', scenarioId);
  doLog && console.log('switch-scenario:switchScenarioId: Required scenario:', requiredScenario);

  if (requiredScenario !== scenarioId) {
    doLog && console.log('switch-scenario:switchScenarioId: Replacing...');
    fs.writeFileSync(scenarioIdFile, requiredScenario);
    doLog && console.log('switch-scenario:switchScenarioId: OK');
  } else {
    doLog && console.log('switch-scenario:switchScenarioId: No changes are required, done.');
  }
}

/**
 * @param {string} requiredScenario
 * @param {object} [opts]
 * @param {boolean} [opts.silent]
 */
function switchScenarioInclude(requiredScenario, opts = {}) {
  const doLog = !opts.silent;
  doLog && console.log('switch-scenario:switchScenarioInclude: Working with file:', includeFile);

  const content = fs.readFileSync(includeFile, 'utf8');
  const match = content.match(scenarioIncludeRegex);
  const foundScenario = match && match[3];

  doLog && console.log('switch-scenario:switchScenarioInclude: Found scenario:', foundScenario);
  doLog &&
    console.log('switch-scenario:switchScenarioInclude: Required scenario:', requiredScenario);

  if (match && requiredScenario !== foundScenario) {
    doLog && console.log('switch-scenario:switchScenarioInclude: Replacing...');
    const newContent = content.replace(scenarioIncludeRegex, '$1' + requiredScenario + '$2');
    fs.writeFileSync(includeFile, newContent);
    doLog && console.log('switch-scenario:switchScenarioInclude: OK');
  } else {
    doLog && console.log('switch-scenario:switchScenarioInclude: No changes are required, done.');
  }
}

/**
 * @param {string} requiredScenario
 * @param {object} [opts]
 * @param {boolean} [opts.silent]
 */
function switchScenario(requiredScenario, opts = {}) {
  switchScenarioInclude(requiredScenario, opts);
  switchScenarioId(requiredScenario, opts);
}

// working from command line: Switch scenario immediatelly...
if (process.argv[2] === '--switch') {
  const requiredScenario = process.argv[3] || process.env.SCENARIO;
  if (requiredScenario) {
    console.info('Using scenario:', requiredScenario);
    // Check scenario...
    const scenarioFile = path.posix.join(rootPath, `src/scenarios/${requiredScenario}.ts`);
    if (!fs.existsSync(scenarioFile)) {
      const error = new Error(
        `A scenario "${requiredScenario}" does not exists. Create it in the folder "src/scenarios" first.`,
      );
      throw error;
    }
    switchScenario(requiredScenario);
  } else {
    console.info('Specify required scenario in the command line (eg, "--switch default")!');
    process.exit(1);
  }
}

// Export method to external use
module.exports = switchScenario;
