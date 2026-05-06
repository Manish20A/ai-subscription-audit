# Automated Tests

## How to run tests
To run the automated tests locally, execute the following command in the root directory:
```bash
npm run test
```

## Test Coverage

1. **Filename:** `__tests__/auditEngine.test.ts`
   **What it covers:** Tests the plan mismatch logic. It verifies that if a user is on the "Claude Team" plan but has only 2 users (minimum is 5), the engine correctly flags this and recommends downgrading to "Claude Pro".

2. **Filename:** `__tests__/auditEngine.test.ts`
   **What it covers:** Tests the redundant tool logic. It verifies that if a user selects both "Cursor Pro" and "GitHub Copilot Individual" for the same small team size, it flags the redundancy and calculates the savings of dropping Copilot.

3. **Filename:** `__tests__/auditEngine.test.ts`
   **What it covers:** Tests the "API Direct vs UI" logic. If a user is paying $200/mo for 10 seats of ChatGPT Plus, but their primary use case is "data", the test verifies that the engine recommends switching to the OpenAI API and calculates the estimated savings based on typical token usage.

4. **Filename:** `__tests__/auditEngine.test.ts`
   **What it covers:** Tests the total savings calculation. It mocks an input with $400 in current spend and verifies that the total monthly savings and total annual savings are calculated completely accurately based on the individual tool recommendations.

5. **Filename:** `__tests__/auditEngine.test.ts`
   **What it covers:** Tests the "Already Optimal" path. It inputs a single user on Cursor Hobby spending $0. The test ensures that the engine does not manufacture fake savings, outputs $0 savings, and returns the honest "You're spending well" message.
