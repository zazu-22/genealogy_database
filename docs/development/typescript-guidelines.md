# TypeScript Guidelines

This document outlines best practices and guidelines for TypeScript development in the Genealogy Database System project. Following these guidelines will help maintain code quality, prevent common errors, and ensure consistency across the codebase.

## Naming Conventions

### Interface Naming

- **Use unique interface names across files**: Avoid using the same interface name in different files, even if their structures are similar. This prevents TypeScript compilation errors when importing from multiple files.

```typescript
// Instead of this:
// In person/types.ts
export interface ResearchNote { /* ... */ }
// In relationship/types.ts
export interface ResearchNote { /* ... */ }

// Do this:
// In person/types.ts
export interface PersonNote { /* ... */ }
// In relationship/types.ts
export interface RelationshipNote { /* ... */ }
```

- **Add descriptive prefixes**: Prefix interfaces with their domain or context to avoid naming conflicts.

### Type Safety

- **Explicitly type parameters**: Always provide explicit type annotations for function parameters.

```typescript
// Bad
function processData(data) { /* ... */ }

// Good
function processData(data: PersonData): ProcessResult { /* ... */ }
```

- **Use type literals sparingly**: Avoid overusing type literals in function signatures; create an interface for complex types.

```typescript
// Bad
function updateConfig(options: { logLevel: string, timeout: number, retries: number }) { /* ... */ }

// Good
interface ConfigOptions {
  logLevel: string;
  timeout: number;
  retries: number;
}
function updateConfig(options: ConfigOptions) { /* ... */ }
```

## Asynchronous Operations

### Database Operations

- **Always await promises**: Never leave promises unhandled, especially in database operations.

```typescript
// Bad
driver.getServerInfo().then(info => {
  console.log(info);
});

// Good
const info = await driver.getServerInfo();
console.log(info);

// Alternative with promise handling
driver.getServerInfo()
  .then(info => {
    console.log(info);
  })
  .catch(error => {
    console.error(error);
  });
```

- **Check for promise-like return values**: When working with functions that might be mocked in tests, check the return type.

```typescript
const result = someFunction();
if (result && typeof result.then === 'function') {
  // Handle as a promise
  await result;
} else {
  // Handle synchronous result
}
```

## Testing Best Practices

### Mocking

- **Reset state between tests**: Use helper functions to reset state between tests, especially for singletons.

```typescript
// In a test file
beforeEach(() => {
  __resetModuleForTesting();
});
```

- **Type mock return values correctly**: Ensure mocked functions return values with the same shape as the real implementation.

```typescript
// Bad
jest.mock('module', () => ({
  someFunction: jest.fn().mockReturnValue(42)
}));

// Good
jest.mock('module', () => ({
  someFunction: jest.fn().mockReturnValue({
    id: '123',
    name: 'Test',
    timestamp: new Date()
  })
}));
```

### TypeScript and Jest

- **Use type assertions in tests when necessary**: It's acceptable to use type assertions in test code when dealing with mocks.

```typescript
// When working with mocked objects
const mockDriver = { 
  close: jest.fn() 
} as unknown as Driver;
```

## Database Specific Guidelines

### Neo4j

- **Handle asynchronous driver operations**: The Neo4j driver methods are asynchronous and return Promises.

```typescript
// Initializing driver
const driver = neo4j.driver(url, auth, config);

// Getting server info (async)
try {
  const serverInfo = await driver.getServerInfo();
  console.log(`Connected to ${serverInfo.address}`);
} catch (error) {
  console.error('Failed to connect:', error);
}

// Closing driver (async)
await driver.close();
```

### MongoDB / Mongoose

- **Type Mongoose documents carefully**: When working with Mongoose documents, be aware of the Document type limitations.

```typescript
// Define an interface that extends Document
interface PersonDocument extends Document, Person {}

// Use type assertions when necessary in test code
const person = await PersonModel.findById(id) as unknown as Person;
```

## Common Pitfalls

### Property Key Type Issues

- **Be careful with dynamic property access**: TypeScript may complain about using certain types as object keys.

```typescript
// Potentially problematic
record.keys.forEach(key => {
  obj[key] = record.get(key); // Error: Type 'PropertyKey' cannot be used as an index type
});

// Fixed version
record.keys.forEach(key => {
  obj[key.toString()] = record.get(key);
});
```

### Duplicate Properties

- **Avoid duplicate property names**: Never define an object with duplicate property names, even if JavaScript allows it.

```typescript
// Bad - will cause TypeScript errors
const obj = {
  id: '1',
  id: '123', // Duplicate property
};

// Good
const obj = {
  id: '123',
};
```

## Final Notes

- **Document workarounds**: When you need to use a TypeScript workaround, document it with a comment explaining why it's necessary.
- **Review type errors carefully**: Don't just silence TypeScript errors; understand and fix the underlying issues.
- **Balance type safety with readability**: Strive for both type safety and code readability.