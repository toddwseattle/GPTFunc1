import {
  OpenAIApi,
  Configuration,
  CreateCompletionResponse,
  CreateCompletionResponseChoicesInner,
  CreateCompletionRequest,
} from "openai";

/***
 * parameters for GPTCompletsion.  only prompt is required
 */
export interface GPTCompletionConfiguration {
  prompt: string;
  temperature?: number;
  max_tokens?: number;
  suffix?: string;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number;
  stop?: string;
  model?: string;
  echo?: boolean;
  best_of?: number;
  user?: string;
}
/***
 * Return structure from GPTCompletion
 */
export interface GPTCompletionData {
  status: "success" | "error";
  data?: Array<CreateCompletionResponseChoicesInner>;
  error?: number;
  message?: string;
}

export async function GPTCompletion(
  partialConfig: Partial<CreateCompletionRequest>
): Promise<GPTCompletionData> {
  const configuration = new Configuration({
    organization: "org-8SuCfBpjLRMRFkECyMYceJOh",
    apiKey: process.env.CHAT_GPT_API,
  });
  const openai = new OpenAIApi(configuration);
  let config = {
    model: "text-davinci-003",
    temperature: 1,
    max_tokens: 200,
    ...partialConfig,
  } as CreateCompletionRequest;
  if (!(partialConfig.prompt && partialConfig.prompt.length > 0))
    return { status: "error", message: "no prompt provided" };
  try {
    const ChatAPIResponse = await openai.createCompletion(config);
    let returnData: GPTCompletionData = {
      status: "success",
      data: ChatAPIResponse.data.choices,
    };
    return returnData;
  } catch (error) {
    return { status: "error", message: error };
  }
}
