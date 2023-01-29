import { describe, it, expect, beforeEach } from "@jest/globals";
import { ReplyRightSuggestionData } from "../shared/imessage";
import { createGPTsuggestion } from "../emailResponse";
describe("emailResponse Tests", () => {
  let testSuggestion: ReplyRightSuggestionData;
  beforeEach(() => {
    testSuggestion = {
      message: {
        isReply: true,
        from: { displayName: "Todd Warren", emailAddress: "todd@toddwinc.com" },
        to: [
          { displayName: "Bob Rapp", emailAddress: "bob.rapp@envorso.com" },
          {
            displayName: "Linda Schactler",
            emailAddress: "linda@wordmaven.info",
          },
        ],
        cc: [
          { displayName: "Adrian Balfour", emailAddress: "adrian@envorso.com" },
          {
            displayName: "Jeremiah Serephine",
            emailAddress: "jeremiah@envorso.com",
          },
        ],
        bcc: [],
        subject: "re: Rough draft, Software dev white paper",
        body: `Great comments - Linda - maybe we put this in the front in the problem looks like this so we have a set of solutions like this…
        
                    Get Outlook for iOS
                    ________________________________________
                    From: Todd Warren <todd@envorso.com>
                    Sent: Tuesday, January 24, 2023 8:05:55 PM
                    To: Bob Rapp <Bob.Rapp@envorso.com>; Linda Schactler <linda@wordmaven.info>; Jeremiah Seraphine <Jeremiah@envorso.com>; Todd Warren <todd@envorso.com>; Adrian Balfour <Adrian@envorso.com>; Scott Tobin <scott.tobin@envorso.com>; Jeff Henshaw <jeff.henshaw@envorso.com>
                    Subject: RE: Rough draft, Software dev white paper 
                     
                    I think we are still missing helping the reader understand that they are the “before” picture in the before and after.  That was what I tried to get across in the blog post the pithy folks helped me with.  For example you know you are in troube in software if:
                    1.	You are spending lots of money on consultants
                    2.	The size of the software team and budget seems to be growing faster than the value they deliver
                    3.	You aren’t sure you have software leaders that are competitive with your new high tech competitors
                    4.	You are loosing your best software people to others
                     
                    From: Bob Rapp <Bob.Rapp@envorso.com> 
                    Sent: Tuesday, January 24, 2023 1:55 PM
                    To: Linda Schactler <linda@wordmaven.info>; Jeremiah Seraphine <Jeremiah@envorso.com>; Todd Warren <todd@envorso.com>; Adrian Balfour <Adrian@envorso.com>; Scott Tobin <scott.tobin@envorso.com>; Bob Rapp <Bob.Rapp@envorso.com>; Jeff Henshaw <jeff.henshaw@envorso.com>
                    Subject: Fwd: Rough draft, Software dev white paper
                     
                     
                    Team - Linda did a great  amazing, splendid job of taking the outline that Jeremiah, I and team built and my first draft via voice into a much more finished document.
                     
                    Please review - turn comments on in word - and see how to make it better.
                     
                    1.	what is missing
                    2.	What is wrong
                    3.	What is great - need more of
                    4.	What we missed 
                    Wahooo!
                    Get Outlook for iOS
                    ________________________________________
                    From: Linda Schactler <linda@wordmaven.info>
                    Sent: Tuesday, January 24, 2023 12:23:48 PM
                    To: Jeremiah Seraphine <Jeremiah@envorso.com>; Bob Rapp <Bob.Rapp@envorso.com>; Seraphine, Jeremiah (J.) <jseraph1@ford.com>
                    Subject: Rough draft, Software dev white paper 
                     
                    Happy Tuesday! 
                     
                    Attached please find a translation of the notes Bob sent as well as the original brain dump. 
                     
                    The new document includes sections of like subject matter,  tables/charts where they were suggested or seemed to be needed, and a few quotes--not all from the automotive sector. (It would be good to include an Adrian quote.....)
                     
                    The formula for business white papers says they should be five to eight pages and
                    •	they need not to look like a sales pitch
                    •	should have source documentation and actual data
                    •	an executive summary at the beginning (for those without time to read)
                    •	key takeaways at the end 
                    •	contact info. 
                     
                    Please review and then let's discuss where we need to add, revise and eliminate.  
                     
                    LS
                     
                    
                    
                    Linda Schactler
                    WordMaven CEO
                    531 Edgemont Loop Road
                    Ellensburg, WA
                    linda@wordmaven.info, 509-607-4103 
                     
                    `,
      },
      replyPrompt:
        "let linda know she's on the write track but we need to provide more references, like HBS articles on Apples's technical career track",
      errorState: { message: "", hasError: false },
    };
  });
  it("should create a string with the from display name", () => {
    expect(createGPTsuggestion(testSuggestion)).toContain(
      testSuggestion.message.from.displayName
    );
  });
  it("should create a string with the message subject", () => {
    expect(createGPTsuggestion(testSuggestion)).toContain(
      testSuggestion.message.subject
    );
  });
  it("should create a string with the reply prompt", () => {
    expect(createGPTsuggestion(testSuggestion)).toContain(
      testSuggestion.replyPrompt
    );
  });
  it("should create a string with the body of the message", () => {
    expect(createGPTsuggestion(testSuggestion)).toContain(
      testSuggestion.message.body
    );
  });
});
