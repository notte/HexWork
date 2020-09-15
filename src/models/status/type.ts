// 開啟類型
export enum OpenType {
	// 旅遊列表
	TravelList = 'TravelList',
	// 個別商品頁面
	Location = 'Location',
	// 搜尋
	SearchPage = 'SearchPage',
	// 推薦
	RecommendPage = 'Recommend',
	// 登入
	Login = 'Login',
	// 後台
	Backoffice = 'Backoffice',
	// 購物車列表
	CartList = 'CartList',
	// 成立訂單
	SetOrder = 'SetOrder',
	// 結帳
	CheckOut = 'CheckOut',
	// 完成訂單
	Completed = 'Completed',
}

// 錯誤訊息類型
export enum SysMessageType {
	// 資訊
	Information = 'Information',
	// 警告
	Warning = 'Warning',
	// 錯誤
	Error = 'Error',
	// 完美
	Success = 'Success',
	// 確認
	Confirmation = 'Confirmation',
	// 確認&取消
	ConfirmationWithCancel = 'ConfirmationWithCancel',
}
