/**
 * Test runner script for executing the test suites
 * 
 * Usage:
 *   node tests/run-tests.js [--unit] [--integration] [--all] [--verbose]
 */
const { execSync } = require('child_process');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const runUnit = args.includes('--unit') || args.includes('--all');
const runIntegration = args.includes('--integration') || args.includes('--all');
const verbose = args.includes('--verbose');
const runAll = args.includes('--all') || (!runUnit && !runIntegration);

// Display help if requested
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: node tests/run-tests.js [options]

Options:
  --unit          Run only unit tests
  --integration   Run only integration tests
  --all           Run all tests (default)
  --verbose       Display verbose output
  --help, -h      Display this help message

Examples:
  node tests/run-tests.js                  Run all tests
  node tests/run-tests.js --unit           Run only unit tests
  node tests/run-tests.js --integration    Run only integration tests
  node tests/run-tests.js --verbose        Run all tests with verbose output
  `);
  process.exit(0);
}

// Display welcome message
console.log('\n=== Genealogy Database System Test Runner ===\n');

// Set options for Jest
const jestOptions = [
  verbose ? '--verbose' : '',
  '--colors',
  '--detectOpenHandles',
  '--forceExit'
];

// Track test results
let success = true;

try {
  // Run unit tests if requested
  if (runUnit || runAll) {
    console.log('Running unit tests...');
    const unitCommand = `npx jest ${jestOptions.join(' ')} --testMatch='**/tests/unit/**/*.test.ts'`;
    execSync(unitCommand, { stdio: 'inherit' });
    console.log('\n✓ Unit tests completed successfully\n');
  }

  // Run integration tests if requested
  if (runIntegration || runAll) {
    console.log('Running integration tests...');
    const integrationCommand = `npx jest ${jestOptions.join(' ')} --testMatch='**/tests/integration/**/*.test.ts'`;
    execSync(integrationCommand, { stdio: 'inherit' });
    console.log('\n✓ Integration tests completed successfully\n');
  }

  console.log('=== All tests passed successfully ===\n');
} catch (error) {
  console.error('\n❌ Some tests failed\n');
  success = false;
}

// Exit with appropriate code
process.exit(success ? 0 : 1);