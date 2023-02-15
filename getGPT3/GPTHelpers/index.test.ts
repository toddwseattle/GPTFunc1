// code block
import {
  GPTCompletion,
  GPTCompletionConfiguration,
  GPTCompletionData,
} from ".";
import { CreateCompletionResponseChoicesInner } from "openai";
import { describe, it, expect, beforeEach, test, jest } from "@jest/globals";
// mock the OpenAIApi class and its methods
jest.mock("openai", () => {
  return {
    OpenAIApi: jest.fn().mockImplementation(() => {
      return {
        createCompletion: jest.fn().mockImplementation((config: any) => {
          // mock some response choices based on the config
          let choices: Array<CreateCompletionResponseChoicesInner> = [];
          for (let i = 0; i < config.n; i++) {
            choices.push({
              text: `Choice ${i} for prompt ${config.prompt}`,
              index: i,
              logprobs: null,
              finish_reason: "length",
            });
          }
          return Promise.resolve({ data: { choices: choices } });
        }),
      };
    }),
    Configuration: jest.fn(),
  };
});

describe("GPTCompletion", () => {
  // test the success case
  test("should return success and data when called with valid config", async () => {
    // arrange
    let config: GPTCompletionConfiguration = {
      prompt: "Hello",
      n: 3,
    };
    // act
    let result: GPTCompletionData = await GPTCompletion(config);
    // assert
    expect(result.status).toBe("success");
    expect(result.data).toHaveLength(3);
    expect(result.data[0].text).toBe("Choice 0 for prompt Hello");
    expect(result.data[1].text).toBe("Choice 1 for prompt Hello");
    expect(result.data[2].text).toBe("Choice 2 for prompt Hello");
  });

  // test the error case
  test("should return error and message when called with invalid config", async () => {
    // arrange
    let config: GPTCompletionConfiguration = {
      prompt: "", // empty prompt is invalid
      n: 3,
    };
    // act
    let result: GPTCompletionData = await GPTCompletion(config);
    // assert
    expect(result.status).toBe("error");
    expect(result.message).toBeDefined();
    expect(result.data).toBeUndefined();
  });
});
// end of code block
