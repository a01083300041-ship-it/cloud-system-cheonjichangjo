


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

// 회원가입 폼 제출 시 실행되는 함수
function signUp(event) {
  event.preventDefault(); // 폼 제출 기본 동작 막기

  var id = document.getElementById("id").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var Name = document.getElementById("Name").value;

  // 비밀번호 확인
  if (password !== confirmPassword) {
    document.getElementById("message").textContent = "비밀번호가 일치하지 않습니다.";
    return;
  }

  // 아이디 중복 체크
  var usersRef = db.collection("users");
  usersRef
    .where("id", "==", id)
    .get()
    .then(function(querySnapshot) {
      if (!querySnapshot.empty) {
        document.getElementById("message").textContent = "중복된 아이디입니다. 다른 아이디를 사용해주세요.";
      } else {
        // 회원가입 처리
        var newUserRef = usersRef.doc(id);
        newUserRef.set({
		  Name: Name,
          userId: newUserRef.id,
          id: id,
          password: password
        });
        document.getElementById("message").textContent = "회원가입이 완료되었습니다.";
		  		  	  	  alert("회원가입이 완료되었습니다.");
		  			setTimeout(() => window.location.href = 'index.html' , 1000);
      }
    });
}

// 폼 제출 이벤트 리스너 등록
var form = document.querySelector("form");
form.addEventListener("submit", signUp);