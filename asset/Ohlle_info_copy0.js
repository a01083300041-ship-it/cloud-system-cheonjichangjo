// Firebase 초기화 및 Firestore 인스턴스 생성
firebase.initializeApp({
  apiKey: "AIzaSyBzny9DQhnCrZ9078cZqVWfCU277_bDRlw",
  authDomain: "deuwebproject.firebaseapp.com",
  projectId: "deuwebproject",
  storageBucket: "deuwebproject.appspot.com",
  messagingSenderId: "67674427830",
  appId: "1:67674427830:web:d97d43c770d06dea863117"
});

function showList2(show) {
  var list1_1 = document.getElementsByClassName("L1");
  var list1_2 = document.getElementsByClassName("L2");
  var list1_3 = document.getElementsByClassName("L3");

  var list2_1 = document.getElementsByClassName("R1");
  var list2_2 = document.getElementsByClassName("R2");
  var list2_3 = document.getElementsByClassName("R3");

  if (show) {
    for (var i = 0; i < list1_1.length; i++) {
      list1_1[i].style.display = "flex";
    }
    for (var i = 0; i < list1_2.length; i++) {
      list1_2[i].style.display = "flex";
    }
    for (var i = 0; i < list1_3.length; i++) {
      list1_3[i].style.display = "flex";
    }

    for (var i = 0; i < list2_1.length; i++) {
      list2_1[i].style.display = "none";
    }
    for (var i = 0; i < list2_2.length; i++) {
      list2_2[i].style.display = "none";
    }
    for (var i = 0; i < list2_3.length; i++) {
      list2_3[i].style.display = "none";
    }
  } else {
    for (var i = 0; i < list1_1.length; i++) {
      list1_1[i].style.display = "none";
    }
    for (var i = 0; i < list1_2.length; i++) {
      list1_2[i].style.display = "none";
    }
    for (var i = 0; i < list1_3.length; i++) {
      list1_3[i].style.display = "none";
    }

    for (var i = 0; i < list2_1.length; i++) {
      list2_1[i].style.display = "flex";
    }
    for (var i = 0; i < list2_2.length; i++) {
      list2_2[i].style.display = "flex";
    }
    for (var i = 0; i < list2_3.length; i++) {
      list2_3[i].style.display = "flex";
    }
  }
}

// 로그인 상태 확인 및 처리
window.addEventListener("load", function () {
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const userId = sessionStorage.getItem("userId");

  if (isLoggedIn === "true" && userId) {
    // 로그인 상태이므로 다른 페이지에 로그인 상태 전달 또는 처리
    console.log("로그인 완료. 사용자 아이디:", userId);
  } else {
    // 로그인 상태가 아니면 로그인 페이지로 리다이렉트 또는 다른 처리 수행
    console.log("로그인 필요");
  }
});

const db = firebase.firestore();

// 이전 댓글 가져오는 함수
function fetchComments() {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  db.collection(page)
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const commentData = doc.data();
        const commentItem = document.createElement("li");

        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
          const starIcon = i <= commentData.rating ? "<span class='fill'>&#9733;</span>" : "<span>&#9734;</span>";
          starsHTML += `<span>${starIcon}</span>`;
        }

        commentItem.innerHTML = `
          <div id="commentboxch">
            <div id="starbox">
              ${starsHTML}
            </div>
            <div id="reviewbox">
              <div id="reviewbox">
                ${commentData.comment}
              </div>
              <div id="date">
                <p>작성 시간: ${new Date(commentData.timestamp).toLocaleString()} 작성자: ${commentData.userId}${getDeleteButton(commentData.userId, doc.id)}</p>
              </div>
            </div>
          </div>
        `;

        commentList.insertBefore(commentItem, commentList.firstChild);
      });
    })
    .catch((error) => {
      console.error("댓글 가져오기 오류:", error);
    });
}

// 삭제 버튼을 생성하여 반환하는 함수
function getDeleteButton(commentUserId, commentId) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const userId = sessionStorage.getItem("userId");

  if (isLoggedIn === "true" && userId && commentUserId === userId) {
    return `<span class="delete-btn" data-comment-id="${commentId}" data-user-id="${commentUserId}">삭제</span>`;
  } else {
    return "";
  }
}

fetchComments();

// 별점 관련 이벤트 처리
const stars = document.querySelectorAll(".star");

stars.forEach((star) => {
  star.addEventListener("click", () => {
    const rating = star.dataset.rating;
    fillStars(rating);
  });
});

function fillStars(rating) {
  stars.forEach((star) => {
    if (star.dataset.rating <= rating) {
      star.innerHTML = "&#9733;";
      star.classList.add("filled");
      star.classList.add("red");
    } else {
      star.innerHTML = "&#9734;";
      star.classList.remove("filled");
      star.classList.remove("red");
    }
  });
}

// 댓글 작성 및 저장 관련 이벤트 처리
const commentInput = document.getElementById("commentInput");
const submitBtn = document.getElementById("submitBtn");
const commentList = document.getElementById("comment-list");

submitBtn.addEventListener("click", () => {
  const commentText = commentInput.value;
  const rating = document.querySelectorAll(".star.filled").length;
  const timestamp = new Date().getTime();

  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const userId = sessionStorage.getItem("userId");

  if (isLoggedIn === "true" && userId) {
    // 로그인 상태이므로 다른 페이지에 로그인 상태 전달 또는 처리하는거
    console.log("로그인 완료. 사용자 아이디:", userId);

    // 댓글 작성 여부 확인
    var path = window.location.pathname;
    var page = path.split("/").pop();
    const commentsRef = db.collection(page);
    const userCommentQuery = commentsRef.where("userId", "==", userId);

    userCommentQuery
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          console.log("이미 댓글을 작성했습니다."); // 이미 작성한 댓글이 있는 경우 처리
          alert("이미 댓글을 작성했습니다.");
          return;
        }

        // Firestore에 댓글 데이터 저장
        return commentsRef.add({
          comment: commentText,
          rating: rating,
          userId: userId,
          timestamp: timestamp,
        });
      })
      .then((docRef) => {
        if (!docRef) {
          return; // 이미 작성한 댓글이 있으므로 추가 처리하지 않음
        }

        // 댓글이 성공적으로 저장되면 화면에 표시함
        const commentItem = document.createElement("li");

        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
          const starIcon = i <= rating ? "<span class='fill'>&#9733;</span>" : "<span>&#9734;</span>";
          starsHTML += `<span>${starIcon}</span>`;
        }

        commentItem.innerHTML = `
          <div id="commentboxch">
            <div id="starbox">
              ${starsHTML}
            </div>
            <div id="reviewbox">
              <div id="reviewbox">
                ${commentText}
              </div>
              <div id="date">
                <p>작성 시간: ${new Date(timestamp).toLocaleString()} 작성자: ${userId}<span class="delete-btn" data-comment-id="${docRef.id}" data-user-id="${userId}"> 삭제 </span></p>
              </div>
            </div>
          </div>
        `;

        commentList.insertBefore(commentItem, commentList.firstChild);

        // 입력 필드 초기화
        commentInput.value = "";
        fillStars(0);
      })
      .catch((error) => {
        console.error("댓글 저장 오류:", error);
      });
  } else {
    // 로그인 상태가 아니면 로그인 페이지로 리다이렉트 또는 다른 처리
    console.log("로그인 필요");
    alert("댓글을 작성하시려면 로그인이 필요합니다.");
  }
});

// 댓글 삭제 버튼 이벤트 처리
commentList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const commentId = event.target.dataset.commentId;
    const commentUserId = event.target.dataset.userId;
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const userId = sessionStorage.getItem("userId");

    if (isLoggedIn === "true" && userId && commentUserId === userId) {
      // 작성자 본인의 댓글인 경우에만 삭제 처리
      var path = window.location.pathname;
      var page = path.split("/").pop();
      db.collection(page)
        .doc(commentId)
        .delete()
        .then(() => {
          // 댓글이 성공적으로 삭제되면 화면에서 제거함
          const commentItem = event.target.closest("li");
          commentItem.remove();
        })
        .catch((error) => {
          console.error("댓글 삭제 오류:", error);
        });
    } else {
      // 작성자가 아니거나 로그인하지 않은 경우에는 삭제 불가능한 경고 메시지를 표시합니다.
      alert("자신이 작성한 댓글만 삭제할 수 있습니다.");
    }
  }
});
