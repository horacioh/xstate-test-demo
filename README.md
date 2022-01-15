# Model-Based Testing with `@xstate/test` and React Demo

This is a React project bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It demonstrates how to use `@xstate/test` with React to automate the generation of integration and end-to-end (E2E) tests of an example application.

![End-to-end tests for Feedback app being run in a browser with Puppeteer](https://i.imgur.com/W5CaIIP.gif)

## Running the Tests

To run the **integration tests**, run `npm test`. This will run the tests found in [`./src/App.test.js`](https://github.com/davidkpiano/xstate-test-demo/blob/master/src/App.test.js).

To run the **E2E tests**, run `npm run e2e`. This will run the tests found in [`./src/App.e2e.js`](https://github.com/davidkpiano/xstate-test-demo/blob/master/src/App.e2e.js).

NOTE: To run the **E2E tests** on a different port: `PORT=3001 npm run e2e`

## Test comparison

### Jest

```bash
 PASS  src/App.test.js
  feedback app
    ✓ coverage (2ms)
    reaches state: "question"
      ✓ via  (28ms)
    reaches state: "thanks"
      ✓ via CLICK_GOOD (12ms)
      ✓ via CLICK_BAD → SUBMIT ({"value":"something"}) (13ms)
    reaches state: "closed"
      ✓ via CLICK_GOOD → CLOSE (8ms)
      ✓ via CLICK_BAD → SUBMIT ({"value":"something"}) → CLOSE (10ms)
      ✓ via CLICK_BAD → CLOSE (10ms)
      ✓ via CLOSE (5ms)
    reaches state: "form"
      ✓ via CLICK_BAD (7ms)

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        1.025s
```

### Jest (runInBand)

```bash
 PASS  src/App.test.js
  feedback app
    ✓ coverage
    reaches state: "question"
      ✓ via  (26ms)
    reaches state: "thanks"
      ✓ via CLICK_GOOD (12ms)
      ✓ via CLICK_BAD → SUBMIT ({"value":"something"}) (11ms)
    reaches state: "closed"
      ✓ via CLICK_GOOD → CLOSE (7ms)
      ✓ via CLICK_BAD → SUBMIT ({"value":"something"}) → CLOSE (10ms)
      ✓ via CLICK_BAD → CLOSE (9ms)
      ✓ via CLOSE (3ms)
    reaches state: "form"
      ✓ via CLICK_BAD (6ms)

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        0.989s, estimated 1s
```

### Jest (maxWorkers=4)

```bash
 PASS  src/App.test.js
  feedback app
    ✓ coverage (1ms)
    reaches state: "question"
      ✓ via  (26ms)
    reaches state: "thanks"
      ✓ via CLICK_GOOD (12ms)
      ✓ via CLICK_BAD → SUBMIT ({"value":"something"}) (11ms)
    reaches state: "closed"
      ✓ via CLICK_GOOD → CLOSE (7ms)
      ✓ via CLICK_BAD → SUBMIT ({"value":"something"}) → CLOSE (9ms)
      ✓ via CLICK_BAD → CLOSE (11ms)
      ✓ via CLOSE (6ms)
    reaches state: "form"
      ✓ via CLICK_BAD (7ms)

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        0.991s, estimated 1s
```

### Vitest

```bash
 √ src/App.test.jsx (9)

Test Files  1 passed (1)
     Tests  9 passed (9)
      Time  53ms
```

## Resources

- [Github: `@xstate/test`](https://github.com/davidkpiano/xstate/tree/master/packages/xstate-test)
- [Slides: Write Less Tests! From Automation to Autogeneration](https://slides.com/davidkhourshid/mbt/) (React Rally 2019)
- [Article: Model-Based Testing in React with State Machines](https://css-tricks.com/?p=286484) (CSS-Tricks)
