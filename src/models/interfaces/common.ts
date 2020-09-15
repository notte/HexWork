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

// 暫定錯誤類型

// 錯誤物件回傳的型別
export interface IError {
	traceId: string;
	error: IErrorData;
}

// 錯誤code以及訊息型別
export interface IErrorData {
	code: string;
	message: string;
}
