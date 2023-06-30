// Firebase 초기화
var firebaseConfig = {
  apiKey: "AIzaSyBzny9DQhnCrZ9078cZqVWfCU277_bDRlw",
  authDomain: "deuwebproject.firebaseapp.com",
  projectId: "deuwebproject",
  storageBucket: "deuwebproject.appspot.com",
  messagingSenderId: "67674427830",
  appId: "1:67674427830:web:d97d43c770d06dea863117"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// 로그인 폼 제출 시 실행되는 함수
function signIn(event) {
  event.preventDefault(); // 폼 제출 기본 동작 막기

  var id = document.getElementById("id").value;
  var password = document.getElementById("password").value;

  // 아이디와 비밀번호 확인
  var usersRef = db.collection("users");
  usersRef
    .where("id", "==", id)
    .where("password", "==", password)
    .get()
    .then(function(querySnapshot) {
      if (!querySnapshot.empty) {
        // 로그인 성공 시 세션에 로그인 상태 저장
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userId", id);

        document.getElementById("message").textContent = "로그인 성공!";
		  			setTimeout(() => window.location.href = 'index.html' , 1000);
        // 로그인 성공 후 리다이렉트 또는 다른 동작 수행
      } else {
        document.getElementById("message").textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
      }
    });
}

// 폼 제출 이벤트 리스너 등록
var form = document.querySelector("form");
form.addEventListener("submit", signIn);




// 로그인 상태 확인 및 처리
window.addEventListener("load", function() {
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");
  var userId = sessionStorage.getItem("userId");

  if (isLoggedIn === "true" && userId) {
    // 로그인 상태이므로 다른 페이지에 로그인 상태 전달 또는 처리
    console.log("로그인 완료. 사용자 아이디:", userId);
  } else {
    // 로그인 상태가 아니면 로그인 페이지로 리다이렉트 또는 다른 처리 수행
    console.log("로그인 필요");
  }
});