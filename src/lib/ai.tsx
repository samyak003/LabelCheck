import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
// const safetySettings = [
// 	{
// 		category: HarmCategory.HARM_CATEGORY_HARASSMENT,
// 		threshold: HarmBlockThreshold.BLOCK_NONE,
// 	},
// 	{
// 		category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
// 		threshold: HarmBlockThreshold.BLOCK_NONE,
// 	},
// 	{
// 		category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
// 		threshold: HarmBlockThreshold.BLOCK_NONE,
// 	},
// 	{
// 		category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
// 		threshold: HarmBlockThreshold.BLOCK_NONE,
// 	},
// ];

export default async function AiwithImage(file, type) {
	const checkSchema = z.object({
		verified : z.boolean().describe("if you are unable to read the ingredients then return false, else return true"),
		score: z.number().describe("Score based on the analysis (1-10)"),
		safeIngredients: z.array(z.string().describe("Name of Ingredient")).describe("List of safe ingredients"),
		riskyIngredients: z.array(z.string().describe("Name of Ingredient")).describe("List of risky ingredients"),
		dangerousIngredients: z.array(z.string().describe("Name of Ingredient")).describe("List of dangerous ingredients"),
		shortMessage: z.string().describe("Short message for overall analysis").length(10),
	});
	const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_gemini_api_key});

	


	async function fileToGenerativePart(file) {
		const base64EncodedDataPromise = new Promise((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result.split(',')[1]);
			reader.readAsDataURL(file);
		});
		return { data: await base64EncodedDataPromise, mimeType: file.type };
	}
	
	let prompt: string = `i have attached a photo of a label of a ${type} item. Suppose I want to live a healthy lifestyle. You are requested to tell me weather this item safe or not? Categorize the ingredients in 3 categories i.e. Safe (& Healthy), Moderate Risk and dangerous. You are required to give a score (out of 10) based on how safe the product is on daily usage/consumption (Be harsh while giving the score). At last give a short comment on the ingredients of the product based on how safe they are.
	Give the output in the following json keys and values -

verified : true or false
score: number;
safeIngredients: string[];
riskyIngredients: string[];
dangerousIngredients: string[];
shortMessage: string (40-50 characters);

Scoring criteria :
1-3 = Dangerous or Risky
4-7 = Can be consumed daily
8-10 = Safe & Healthy
IF you are unable to read the ingredients then return - {verified : false}`


const contents = [
  {
    inlineData : await fileToGenerativePart(file),
  },
  { text: prompt},
];
	const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
	config: {
			responseMimeType: "application/json",
			responseJsonSchema: z.toJSONSchema(checkSchema),
		},
});
	const text = checkSchema.parse(JSON.parse(response.text));
	return text;
}