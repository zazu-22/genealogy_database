# Genealogy Database System Tests

This directory contains tests for the Genealogy Database System. The test suite includes both unit tests and integration tests to ensure the reliability and correctness of the system.

## Directory Structure

- **/unit**: Unit tests for individual components
  - `/db`: Database connection tests
  - `/models`: Data model tests
  - `/utils`: Utility function tests

- **/integration**: Integration tests for system components
  - `/models`: Tests for models with database interaction

- **/utils**: Test utilities and helpers
  - `db-handlers.ts`: Database connection utilities for testing

- **test-env.ts**: Test environment configuration

## Running Tests

You can run the tests using npm scripts or the custom test runner:

### Using npm scripts

```bash
# Run all tests
npm test

# Run only unit tests
npm test -- --testPathPattern="unit"

# Run only integration tests
npm test -- --testPathPattern="integration"

# Skip specific test categories
npm test -- --testPathIgnorePatterns="integration" --testPathIgnorePatterns="logger"

# Run tests with coverage
npm test -- --coverage
```

### Using the custom test runner

```bash
# Run all tests
node tests/run-tests.js

# Run only unit tests
node tests/run-tests.js --unit

# Run only integration tests
node tests/run-tests.js --integration

# Run tests with verbose output
node tests/run-tests.js --verbose

# Display help
node tests/run-tests.js --help
```

## Test Environment

The tests run in a dedicated test environment:

- **MongoDB**: Uses MongoDB Memory Server to create an in-memory database for testing
- **Neo4j**: Connects to a test Neo4j database (configure in `.env.test`)
- **Logging**: Minimal logging during tests to keep output clean

## Writing Tests

### Unit Tests

Unit tests should:
- Test a single component in isolation
- Mock dependencies
- Be fast and not depend on external services
- Focus on functionality, not implementation details
- Use descriptive test names

Example:

```typescript
describe('Person Model', () => {
  it('should create a valid person object', () => {
    // Test code...
  });
});
```

### Integration Tests

Integration tests should:
- Test interactions between components
- Use test databases
- Test real database interactions
- Verify end-to-end functionality
- Clean up after themselves

Example:

```typescript
describe('Person Model Integration', () => {
  beforeAll(async () => {
    await connectToTestMongoDB();
  });
  
  afterAll(async () => {
    await disconnectFromTestMongoDB();
  });
  
  it('should create and save a Person successfully', async () => {
    // Test code...
  });
});
```

## Best Practices

1. **Test Independence**: Each test should be independent and not rely on the state from other tests
2. **Clean Up**: Always clean up test data after tests
3. **Use Descriptive Names**: Test names should describe what they're testing
4. **Test Edge Cases**: Include tests for error cases and edge conditions
5. **Test Real-World Scenarios**: Ensure tests reflect actual system usage
6. **Keep Tests Fast**: Optimize tests to run quickly to encourage frequent testing
7. **Test Error Handling**: Verify that components handle errors correctly
8. **Proper Mocking**: Mock external dependencies appropriately for unit tests
9. **Interface Naming**: Use unique names for interfaces across model files to avoid TypeScript conflicts
10. **Async Operations**: Properly handle async operations in database tests
11. **Reset State**: Ensure test state is reset between tests to avoid interference

## Known Issues and Workarounds

### TypeScript Type Conflicts

- Use unique interface names across model files (e.g., `PersonNote` instead of `ResearchNote`)
- Be careful with property names to avoid shadowing

### Neo4j Test Mocking

- Use the `__resetDriverForTesting()` function when needed between tests
- Be aware that Neo4j driver methods return Promises in production but may be mocked with synchronous returns in tests

### MongoDB Document Typing

- When working with Mongoose documents, you may need to use type assertions or interfaces that extend the Document type
- For integration tests, consider using `as unknown as YourType` when TypeScript complains about document properties