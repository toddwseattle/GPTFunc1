import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Configuration, OpenAIApi } from "openai";
import { createGPTsuggestion } from "./emailResponse";
import { GPTCompletion } from "./GPTHelpers";
import { ReplyRightSuggestionData } from "./shared/imessage";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const prompt =
    req.query.prompt ||
    (req.body && req.body.prompt) ||
    "give a short explaination of a good prompt for chatGPT";
  const action = req.query.action;
  if (action === "reply") {
    let prompt = req.body;
    if (typeof prompt === "string") {
      prompt = JSON.parse(prompt) as unknown as ReplyRightSuggestionData;
      // truncate body to 4000 characters if it is longer otherwise api rejects
      prompt.message.body = prompt.message.body.substring(0, 4000);
    } else if (prompt.message) {
      prompt = prompt as unknown as ReplyRightSuggestionData;
    }
    if (prompt) {
      const emailSuggestionText = createGPTsuggestion(prompt);
      try {
        const suggestion = await GPTCompletion({
          prompt: emailSuggestionText,
          max_tokens: 1000,
          n: 3,
        });
        if (suggestion.data) {
          context.res.body = {
            status: "success",
            choices: suggestion.data,
          };
        } else {
          context.res.body = {
            status: "failure",
            meessage: suggestion.message,
          };
        }
      } catch (error) {
        context.res.body = {
          error: error,
        };
      }
    }
  } else {
    try {
      const GPTresults = await GPTCompletion({ prompt: prompt });
      if (GPTresults.status === "success") {
        const choices = GPTresults.data;
        let body = `<h1>Response to ${prompt}</h1>`;
        if (choices.length == 1) {
          body += `<p>${choices[0].text}</p>`;
        } else {
          body += "<UL>";
          choices.forEach((choice) => {
            body += `<LI>${choice.text}</LI>`;
          });
          body += "</UL>";
        }
        context.res = {
          body: body,
        };
      }
    } catch (error) {
      context.res = {
        body:
          "<h1>Failure</h1>\n" +
          error.statusText +
          "\n" +
          JSON.stringify(error),
      };
    }
  }
};

export default httpTrigger;
