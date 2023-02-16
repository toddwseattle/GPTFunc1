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

Sure, here's the response in raw markdown:

vbnet
Copy code

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

The application can be configured by setting the following environment variables:

OPENAI_API_KEY: OpenAI API key to use the API
OPENAI_API_MODEL: OpenAI API model to use for generating responses
OPENAI_API_MAX_TOKENS: Maximum number of tokens to generate in the response
OPENAI_API_TEMPERATURE: Temperature for generating the response
OPENAI_API_TOP_P: The highest probability choice to include in the response

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