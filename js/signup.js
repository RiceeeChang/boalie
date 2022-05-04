var liffID = '1656721259-jdXZ4Vqx';
var loginUrl = 'https://riceeechang.github.io/boalie/signup.html';
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
	if (!isLoggedIn) {
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


$(".ok-button").on("tap click", function () {
	var data = {
		name: $("input[name=name]").val(),
		phone: $("input[name=phone]").val(),
		apartment: $("input[name=apart]").val(),
		birthday: $("input[name=birthday]").val()
	};

	var dbUrl = 'https://script.google.com/macros/s/AKfycby1qb8IwP3qDcn6Ao7TG9AdVjtNxJVvhUd9LNvRYpmbeW5Fa0bn5BLzlm7Ynor4YwOSHA/exec';
	fetch(dbUrl, {
		method: 'POST',
		body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(response => {
		if (response.result == true) {
			splide.go(">");
		}
	})
});

$(".join-button").on("tap click", function () {
	liff.closeWindow();
})