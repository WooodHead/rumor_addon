/*****変数定義*****/
var rumorlist;//グローバル変数に流言リストを格納．
var array = new Array();
var flag = 0;//0=更新受付中，1=画面書き換え中，2=画面書き換え直後．
var tyouhuku = 0;
var followee = new Array();
var twitterID;
var twitterpasswd;
var fukidashiover = 0;
var rumorchecklist;
var URL = location.href;
/******************/

/*****ページ更新時処理******/

//取得命令のみ(レスポンスなし)
chrome.runtime.sendMessage(
	{type: "rumorget"},
	function (response){
		console.log("1.background.jsに流言取得命令を送信完了");}
);

//30msごとにrumorlistが取得できたかチェック
window.setTimeout(initGetRumor,30);
function initGetRumor(){
	//rumorlistの取得
	chrome.runtime.sendMessage(
		{type: "rumorsend"},
		function(res){rumorlist = res;}
	);
	//rumorlistがある場合ハイライト処理
	if(rumorlist != undefined)  {
		var lines = rumorlist.split("\n");
		var len = lines.length;//lenは配列の個数
		for(var n = 0; n < len; n++){
			array.push(lines[n]);
		}
		var htmlString = document.documentElement.outerHTML || document.documentElement.innerHTML;
		var text = htmlString;
		for(var m=0; m<followee.length-1;m++){
			console.log(followee[m]);
		}
		search(text,lines);
		fukidashi();
	//rumorlistが無い場合，もう一度確かめる
	}else{
		window.setTimeout(initGetRumor,30);
	}
}
