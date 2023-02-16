# GPTFunc1

GPTFunc1 is a simple REST-based API developed in TypeScript for providing an interface to the OpenAI completion API. It has been developed to implement two functions - to call the OpenAI API and return the first response in the body of the response, and to return the choices generated by the OpenAI API if the query string includes "action" set to the value "reply" and the body of the request is the interface ReplyRightSuggestionData.

## Getting Started

To get started with GPTFunc1, follow the steps below:

### Prerequisites

Before running the application, ensure that the following prerequisites are met:

- Azure Functions Core Tools
- Node.js v12 or later

### Installation

To install the application, run the following command:

```sh
npm install
```

## Running the Application

To run the application, execute the following command:

```sh
npm start
```

## Configuration

a `local.settings.json` file must be created for the azure function. It needs to contain tha value of your CHAT GPT Key in the variable `CHAT_GPT_API`

When deployed, this value also needs to be set in the Azure console

## Usage

The API provides two functions:

1. To call the OpenAI API and return the first response in the body of the response for a generic prompt

   - Path: `/api/gptfunc1`
   - Query Parameters: prompt (string)
   - Method: GET

2. to return the replychoices generated by the OpenAI API

   - Path: `/api/gptfunc1`
   - Query Parameters: action (string, set to "reply"), and the body of the request should be an interface ReplyRightSuggestionData
   - Method: POST

## Response

If the action query parameter is set to "reply" and the request body is an interface ReplyRightSuggestionData, the response will be shaped based on the TypeScript code fragment below:

```typescript
if (suggestion.data) {
  context.res.body = {
    status: "success",
    choices: suggestion.data,
  };
} else {
  context.res.body = {
    status: "failure",
    message: suggestion.message,
  };
}
```

## Contributing

To come...

## License

Provided under the [MIT License](LICENSE.md)
