// models > status，為管理類別的檔案，例如訊息類型：錯誤、成功、確認等

// 開啟類型
export enum OpenType {
	// 旅遊列表
	TravelList = 'TravelList',
	// 個別商品頁面
	TaiwanItem = 'TaiwanItem',
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
