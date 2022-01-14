import { cleanup, fireEvent, render } from "@testing-library/react"
import { createModel } from "@xstate/test"
import React from "react"
import { Machine } from "xstate"
import Feedback from "./App"

// describe('feedback app', () => {
//   afterEach(cleanup);

//   it('should show the thanks screen when "Good" is clicked', () => {
//     const { getByTestId } = render(<Feedback />);

//     // The question screen should be visible at first
//     assert.ok(getByTestId('question-screen'));

//     // Click the "Good" button
//     fireEvent.click(getByTestId('good-button'));

//     // Now the thanks screen should be visible
//     assert.ok(getByTestId('thanks-screen'));
//   });

//   it('should show the form screen when "Bad" is clicked', () => {
//     const { getByTestId } = render(<Feedback />);

//     // The question screen should be visible at first
//     assert.ok(getByTestId('question-screen'));

//     // Click the "Bad" button
//     fireEvent.click(getByTestId('bad-button'));

//     // Now the form screen should be visible
//     assert.ok(getByTestId('form-screen'));
//   });
// });

// ............

describe("feedback app", () => {
  const feedbackMachine = Machine({
    id: "feedback",
    initial: "question",
    states: {
      question: {
        on: {
          CLICK_GOOD: "thanks",
          CLICK_BAD: "form",
          CLOSE: "closed",
        },
        meta: {
          test: ({ queryByTestId }) => {
            expect(queryByTestId("question-screen")).toBeDefined()
          },
        },
      },
      form: {
        on: {
          SUBMIT: [
            {
              target: "thanks",
              cond: (_, e) => e.value.length,
            },
          ],
          CLOSE: "closed",
        },
        meta: {
          test: ({ queryByTestId }) => {
            expect(queryByTestId("form-screen")).toBeDefined()
          },
        },
      },
      thanks: {
        on: {
          CLOSE: "closed",
        },
        meta: {
          test: ({ queryByTestId }) => {
            expect(queryByTestId("thanks-screen")).toBeDefined()
          },
        },
      },
      closed: {
        type: "final",
        meta: {
          test: ({ queryByTestId }) => {
            expect(queryByTestId("thanks-screen")).toBeNull()
          },
        },
      },
    },
  })

  const testModel = createModel(feedbackMachine, {
    events: {
      CLICK_GOOD: ({ getByText }) => {
        fireEvent.click(getByText("Good"))
      },
      CLICK_BAD: ({ getByText }) => {
        fireEvent.click(getByText("Bad"))
      },
      CLOSE: ({ getByTestId }) => {
        fireEvent.click(getByTestId("close-button"))
      },
      ESC: ({ baseElement }) => {
        fireEvent.keyDown(baseElement, { key: "Escape" })
      },
      SUBMIT: {
        exec: async ({ getByTestId }, event) => {
          fireEvent.change(getByTestId("response-input"), {
            target: { value: event.value },
          })
          fireEvent.click(getByTestId("submit-button"))
        },
        cases: [{ value: "something" }, { value: "" }],
      },
    },
  })

  const testPlans = testModel.getSimplePathPlans()

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      afterEach(cleanup)

      plan.paths.forEach((path) => {
        it(path.description, () => {
          const rendered = render(<Feedback />)
          return path.test(rendered)
        })
      })
    })
  })

  it("coverage", () => {
    testModel.testCoverage()
  })
})
