
// 로그인 상태 확인 및 처리
window.addEventListener("load", function() {
			const loginBtn1 = document.getElementById('loginBtn1');
	const logoutBtn = document.getElementById('logout');
		const EditBtn = document.getElementById('EditBtn');
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");
  var userId = sessionStorage.getItem("userId");

  if (isLoggedIn === "true" && userId) {
    // 로그인 상태이므로 다른 페이지에 로그인 상태 전달 또는 처리
    console.log("로그인 완료. 사용자 아이디:", userId);
	  		  loginBtn1.style.display = 'none';
	  logoutBtn.style.display = 'right';
	  EditBtn.style.display = 'right';
  } else {
    // 로그인 상태가 아니면 로그인 페이지로 리다이렉트 또는 다른 처리 수행
    console.log("로그인 필요");
	  		  loginBtn1.style.display = 'right';
	   logoutBtn.style.display = 'none';
	  	  EditBtn.style.display = 'none';
  }
});











var logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", function() {
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("userId");
      location.reload(); // 페이지 새로고침
    });