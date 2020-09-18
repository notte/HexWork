export interface IgetTokenRequest {
	email: string;
	password: string;
}

export interface IgetTokenReponse {
	success: boolean;
	message: string;
	uuid: string;
	token: string;
	expired: number;
}

export interface ItokenReponse {
	success: boolean;
	message: string;
}

export interface IRules {
	email: string;
	password: string;
}

export interface IIineraryContentReponse {
	sea: IStroke;
	land: IStroke;
	shopping: IStroke;
	history: IStroke;
}

interface IStroke {
	title: string;
	content: string[];
}

export interface IError {
	traceId: string;
	error: IErrorData;
}

export interface IErrorData {
	code: string;
	message: string;
}
