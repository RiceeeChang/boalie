var liffID = '1656721259-jdXZ4Vqx';
var loginUrl = 'https://riceeechang.github.io/boalie/';
var lineAtUrl = 'https://lin.ee/i5P97Pv';
var formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe9qd9fyDhCmNLHWiuR9qjblX_apwe_RKUb2Wm7kqLU3JdoLg/viewform?usp=pp_url&entry.697677827=';

liff.init({
	liffId: liffID
}).then(function() {
	var isInLine = liff.isInClient();   // 回傳是否由 LINE App 存取
	if (!isInLine) {
		// 顯示請他使用手機的Line掃QRCode的方式點開
		console.log("請使用手機的Line開啟");
	}

	var isLoggedIn = liff.isLoggedIn(); // 使用者是否登入 LINE 帳號
    var context = liff.getContext();
	if (isLoggedIn) {
		liff.getProfile()
			.then(profile => {
                var userId = profile['userId'];
				// 驗證line_id是否已經加入
				fetch('https://script.google.com/macros/s/AKfycbzzNhSUe4bmfL5-Fd5Fy0zzlMJtWM9YZIWURTFd8gVxyfpC9jXGM5uGcgszT9W0sKj0yg/exec?line_id='+userId)
				.then(function(response) {
					return response.json();
				})
				.then(function(response) {
					if (response.result == true) { // 已經加入，直接轉去Line@
						location.href = lineAtUrl;
					} else { // 還沒加入，轉去註冊表單
						location.href = formUrl + userId;
					}
				});
				console.log(profile, userId);
			})
	} else {
		liff.login({
			redirectUri: loginUrl // 使用者登入後要去到哪個頁面
		});
	}
}).catch(function(error) {
  console.log(error);
  console.log("請在Line手機版中開啟本連結");
});


var splide = new Splide( '.splide', {
	direction : 'ttb',
	height    : '100vh',
	arrows    : false,
	pagination: false
} );
splide.mount();

$(".start-button").on("tap click", function () {
	console.log("start-button click");
	$("#enter-card").css("display", "none");
	$(".splide").css("display", "block");
	$(".nav-prev-next").css("display", "flex");
});

$(".prev").on("tap click", function() {
	splide.go("<");
});
$(".next").on("tap click", function() {
	splide.go(">");
});