// models > status，為管理類別的檔案，例如訊息類型：錯誤、成功、確認等

export enum PopularType {
	// 熱門類別列表
	PopularList = 'PopularList',
	// 熱門類別列表歌單
	Playlist = 'PopularPlaylist',
	// 專輯
	Album = 'PopularAlbum',
	// 歌手
	Artist = 'PopularArtist',
}
