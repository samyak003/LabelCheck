import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const safetySettings = [
	{
		category: HarmCategory.HARM_CATEGORY_HARASSMENT,
		threshold: HarmBlockThreshold.BLOCK_NONE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
		threshold: HarmBlockThreshold.BLOCK_NONE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
		threshold: HarmBlockThreshold.BLOCK_NONE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
		threshold: HarmBlockThreshold.BLOCK_NONE,
	},
];

export default async function AiwithImage(file, type) {
	const genAI = new GoogleGenerativeAI(import.meta.env.VITE_gemini_api_key);

	const generationConfig = {
		temperature: 1,
		topP: 0.95,
		topK: 64,
		maxOutputTokens: 8192,
		responseMimeType: "application/json",
	};


	async function fileToGenerativePart(file) {
		const base64EncodedDataPromise = new Promise((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result.split(',')[1]);
			reader.readAsDataURL(file);
		});

		return {
			inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
		};
	}



	// generating content model for Gemini Google AI
	let imageData = await fileToGenerativePart(file)
	let prompt: string = `i have attached a photo of a label of a ${type} item. Suppose I want to live a healthy lifestyle. You are requested to tell me weather this item safe or not? Categorize the ingredients in 3 categories i.e. Safe (& Healthy), Moderate Risk and dangerous. You are required to give a score (out of 10) based on how safe the product is on daily usage/consumption (Be harsh while giving the score). At last give a short comment on the ingredients of the product based on how safe they are. Give the output in the following json format -
{
verified : true
score: number;
safeIngredients: string[];
riskyIngredients: string[];
dangerousIngredients: string[];
shortMessage: string (40-50 characters);
}
Scoring criteria :
1-3 = Dangerous or Risky
4-7 = Can be consumed daily
8-10 = Safe & Healthy
IF you are unable to read the ingredients then return - {verified : false}`

	const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", generationConfig: generationConfig, safetySettings: safetySettings });
	const result = await model.generateContent([
		prompt, imageData
	]);
	const response = await result.response;
	const text = response.text();
	return (text)



}