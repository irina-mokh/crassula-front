export interface IStore {
	auth: IAuthState;
	category: ICategoryState;
	action: IActionState;
}

// USER
export interface IUser {
	id: string;
	email: string;
	password: string;
}
export type ICreateUser = Omit<IUser, 'id'>;

// CATEGORY
export interface ICategory {
	id: string;
  name: string;
  type: string;
  start: number;
  userId: string;
}
export type ICreateCategory = Omit<ICategory, 'id'>;

// ACTION
export interface IAction {
	// TODO
}
export type ICreateAction = Omit<IAction, 'id'>;

export interface IAuthState {
	user: IUser | null,
	token: string | null,
	refresh: string | null,
	error: string | null;
}

export interface ICategoryState {
	data: ICategory[],
	error: string | null;
}

export interface IActionState {
	data: IAction[],
	error: string | null;
}


export type CategoryType = 'in' | 'asset' | 'out';