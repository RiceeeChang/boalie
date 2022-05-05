var liffID = '1656721259-z1VERDAj';
var loginUrl = 'https://riceeechang.github.io/boalie/signup.html';
var dbUrl = 'https://script.google.com/macros/s/AKfycbykBFd1EEjDUWC2mtHzTHrW5YDwIpVBwwTsCSY8GbNXZ69ObEthL6aRdXSewF93O5IlnQ/exec';
var userId = '';
liff.init({
	liffId: liffID
}).then(function() {
	var isInLine = liff.isInClient();   // 回傳是否由 LINE App 存取
	if (!isInLine) {
		// 顯示請他使用手機的Line掃QRCode的方式點開
		console.log("請使用手機的Line開啟");
	}

	/*var isLoggedIn = liff.isLoggedIn(); // 使用者是否登入 LINE 帳號
	if (!isLoggedIn) {
		liff.login({
			redirectUri: loginUrl // 使用者登入後要去到哪個頁面
		});
	} else {
		liff.getProfile()
			.then(profile => {
				userId = profile.userId;
			});
	}*/
}).catch(function(error) {
  console.log(error);
  console.log("請在Line手機版中開啟本連結");
});


var splide = new Splide( '.splide', {
	direction : 'ttb',
	height    : '100vh',
	arrows    : false,
	pagination: false,
	drag      : false
} );
splide.mount();

$(".start-button").on("tap click", function () {
	$("#enter-card").css("display", "none");
	$(".splide").css("display", "block");
});

$(".prev").on("tap click", function() {
	splide.go("<");
});
$(".next").on("tap click", function() {
	splide.go(">");
});


$(".ok-button").on("tap click", function () {
	var data = {
		userId: userId,
		name: $("input[name=name]").val(),
		phone: $("input[name=phone]").val(),
		apartment: $("input[name=apart]").val(),
		birthday: $("input[name=birthday]").val()
	};
	console.log(data);
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
	window.close();
})