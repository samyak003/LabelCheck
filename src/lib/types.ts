export type Check = {
	name: string;
	type: string;
	score: number;
	maxScore: number;
	safeIngredients: string[];
	riskyIngredients: string[];
	dangerousIngredients: string[];
	shortMessage: string;
};
