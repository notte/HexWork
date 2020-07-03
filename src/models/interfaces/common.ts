// models > interfaces，為管理資料型別的檔案

// get Token API
export interface IgetTokenRequest {
	grant_type: string;
	client_id: string;
	client_secret: string;
}
