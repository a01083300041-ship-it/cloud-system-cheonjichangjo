// Firebase 초기화 및 Firestore 인스턴스 생성
firebase.initializeApp({
    apiKey: "AIzaSyBzny9DQhnCrZ9078cZqVWfCU277_bDRlw",
  authDomain: "deuwebproject.firebaseapp.com",
  projectId: "deuwebproject",
  storageBucket: "deuwebproject.appspot.com",
  messagingSenderId: "67674427830",
  appId: "1:67674427830:web:d97d43c770d06dea863117"
});

const db = firebase.firestore();
			const nicknameInput = document.getElementById("exampleFormControlInput2");
// 로그인 상태 확인 및 처리
window.addEventListener("load", function() {
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");
  var userId = sessionStorage.getItem("userId");

  if (isLoggedIn === "true" && userId) {
    // 로그인 상태이므로 다른 페이지에 로그인 상태 전달 또는 처리
    console.log("로그인 완료. 사용자 아이디:", userId);

    // 유저 정보 가져오기
    db.collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const idInput = document.getElementById("exampleFormControlInput1");
          const passwordInput = document.getElementById("inputPassword1");


          idInput.value = userData.id; // 아이디 표시
          passwordInput.value = userData.password; // 비밀번호 표시
			nicknameInput.value = userData.Name; // 닉네임 표시
        } else {
          console.log("유저 문서가 존재하지 않습니다.");
        }
      })
      .catch((error) => {
        console.error("유저 정보 가져오기 오류:", error);
      });
  } else {
    // 로그인 상태가 아니면 로그인 페이지로 리다이렉트 또는 다른 처리 수행
    console.log("로그인 필요");
  }
});

// 비밀번호 수정 버튼 클릭 이벤트 처리
const joinBtn = document.getElementById("joinBtn");
joinBtn.addEventListener("click", function(event) {
  event.preventDefault(); // 기본 동작(링크 이동) 방지
  var inputPassword1 = document.getElementById("inputPassword1").value;
  var inputPassword2 = document.getElementById("inputPassword2").value;

  if (inputPassword1 === inputPassword2) {
    // 비밀번호 일치
    var userId = sessionStorage.getItem("userId");

    // 비밀번호 수정 처리
    db.collection("users")
      .doc(userId)
      .update({
        password: inputPassword1
      })
      .then(() => {
		alert("비밀번호가 성공적으로 수정되었습니다.");
        console.log("비밀번호가 성공적으로 수정되었습니다.");
        // 비밀번호 수정 완료 후 필요한 처리 수행
		sessionStorage.removeItem("isLoggedIn");
      	sessionStorage.removeItem("userId");
				setTimeout(() => window.location.href = 'index.html' , 1000);
      })
      .catch((error) => {
        console.error("비밀번호 수정 오류:", error);
      });
  } else {
    // 비밀번호 불일치
    console.log("비밀번호가 일치하지 않습니다.");
	  	  alert("비밀번호가 일치하지 않습니다 확인해주세요.");
  }
});



// 회원탈퇴 버튼 클릭 이벤트 처리
const withdrawalBtn = document.getElementById("withdrawalBtn");
withdrawalBtn.addEventListener("click", function(event) {
  event.preventDefault(); // 기본 동작(링크 이동) 방지
  var userId = sessionStorage.getItem("userId");

  // 유저 정보 삭제
  db.collection("users")
    .doc(userId)
    .delete()
    .then(() => {
      console.log("회원탈퇴가 성공적으로 처리되었습니다.");
	  	  alert("회원탈퇴가 성공적으로 처리되었습니다.");
      		sessionStorage.removeItem("isLoggedIn");
      	sessionStorage.removeItem("userId");
				setTimeout(() => window.location.href = 'index.html' , 1000);
    })
    .catch((error) => {
      console.error("회원탈퇴 오류:", error);
	  alert("회원탈퇴 오류");
    });
});




// 닉네임 수정 버튼 클릭 이벤트 처리
const nicknameBtn = document.getElementById("nicknameBtn");
nicknameBtn.addEventListener("click", function(event) {
  event.preventDefault(); // 기본 동작(링크 이동) 방지
  var inputNickname = nicknameInput.value.trim();

  if (inputNickname !== "") {
    // 닉네임 값이 비어있지 않은 경우
    var userId = sessionStorage.getItem("userId");

    // 닉네임 수정 처리
    db.collection("users")
      .doc(userId)
      .update({
        Name: inputNickname
      })
      .then(() => {
        alert("닉네임이 성공적으로 수정되었습니다.");
        console.log("닉네임이 성공적으로 수정되었습니다.");
      })
      .catch((error) => {
        console.error("닉네임 수정 오류:", error);
      });
  } else {
    // 닉네임 값이 비어있는 경우
    console.log("닉네임을 입력해주세요.");
    alert("닉네임을 입력해주세요.");
  }
});