/** from chatgpt:
 * o formulate a good email reply, ChatGPT needs the following pieces of context:

The email thread: This includes all previous emails in the conversation, as well as any attachments or images that have been shared.

The recipient's name: Knowing the recipient's name allows ChatGPT to personalize the email and address the recipient directly.

The purpose of the email: Understanding the purpose of the email, such as responding to a question or providing information, helps ChatGPT craft an appropriate response.

The tone of the email: Knowing the tone of the email, such as formal or casual, helps ChatGPT use the appropriate language and style in the response.

Any additional information: Any additional information provided, such as specific details or instructions, can help ChatGPT provide a more accurate and helpful response.
 */
function emailAddressString(emails: EmailAddress[]): string {
  if (emails.length === 0) {
    return "";
  } else if (emails.length === 1) {
    return emails[0].displayName;
  } else if (emails.length === 2) {
    return emails[0].displayName + " and " + emails[1].displayName;
  } else {
    let list = "";
    for (let i = 0; i < emails.length - 1; i++) {
      list += emails[i].displayName + ", ";
    }
    return list + "and " + emails[emails.length - 1].displayName;
  }
}

import {
  EmailAddress,
  MessageInfo,
  ReplyRightSuggestionData,
} from "../shared/imessage";
export function emailResponsePrompt(
  rrSuggestion: ReplyRightSuggestionData
): string {
  return createGPTsuggestion(rrSuggestion);
}

export function createGPTsuggestion(rrSuggestion: ReplyRightSuggestionData) {
  // removed the following from the prompt that is sent to GPT3 that asks for json structure.
  const ResponseFrame = `Create a reply to the following message from ${rrSuggestion.message.from.displayName} <${rrSuggestion.message.from.emailAddress},`;
  return `${ResponseFrame} responding to  ${emailAddressString(
    rrSuggestion.message.to
  )} with the subject ${
    rrSuggestion.message.subject
  }.   The reply should expand on this prompt or suggestion but should not repeate the main message: ${
    rrSuggestion.replyPrompt
  }.\r\nHere is a portion of body of the message that is being replied to that conforms to length limit of the api; so it may be missing some original parts that started the email thread:${
    rrSuggestion.message.body
  }`;
}
