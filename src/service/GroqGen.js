import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const schema = [
  {
    type: "experienced",
    content: { type: "string" },
  },
  {
    type: "fresher",
    content: { type: "string" },
  },
];

export const Generator = async (purpose, jobTitle) => {
  let prompt;
  const jsonSchema = JSON.stringify(schema, null, 2); // Pretty print for better readability

  if (purpose === "summary") {
    prompt = `Create a summary for resume in 4-5 lines for the role of ${jobTitle}. 
    It should be enthusiastic and appealing. Provide the summary in JSON format for both fresher and experienced candidates. 
    The JSON format should adhere to this schema: ${jsonSchema}. Give only JSON data. Don't give any other introductory text or anything
    `;
  }

  try {
    const chat_completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      response_format: {
        type: "text",
      },
    });

    // Parse the response and return it
    const responseContent = chat_completion.choices[0].message.content;
    const jsonData = JSON.parse(responseContent);
    return jsonData;
  } catch (error) {
    console.error("Error generating summary:", error);
    return null; // Handle error as needed
  }
};
