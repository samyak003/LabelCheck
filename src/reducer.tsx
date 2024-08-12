
export interface State {
	user: any;
}

export const initialState: State = {
	user: null,
};

export interface Action {
	type: string;
	user?: any;
}

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};
		default:
			return state;
	}
};

export default reducer;
