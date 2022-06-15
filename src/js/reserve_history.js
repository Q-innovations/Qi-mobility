// ロード時処理
window.addEventListener("DOMContentLoaded", function () {
  // LINE DevelopersのliffId★各自変更
  const LINE_LIFF_ID = "1657149830-O4YdRWr2";
  // ユーザ情報有無フラグ(true：データあり)
  const userinfoFlg = false;
  // LINEプロフィール取得
  // liff処理
  liff
    //初期化
    .init({
      liffId: LINE_LIFF_ID,
    })
    .then(() => {
      // LINEプロフィール取得
      liff
        .getProfile()
        .then(function (profile) {
          // UIDセット
          UID = profile.userId;
          document.getElementById("useridprofilefield").value = profile.userId;
          document.getElementById("displaynamefield").value = profile.displayName;
          // 予約情報取得
          getGasReserve(UID);
        })
        .catch(function (_error) {
          window.alert("LINEから起動してください。");
        });
    });
  // LINE起動確認
  if (!liff.isInClient()) {
    // ユーザー情報取得  //PCからテスト
    window.alert("PC確認モード");
    UID = "U91f9611376221676612af6c1d690a8a5";
    document.getElementById("useridprofilefield").value = UID;
    getGasReserve(UID);
  } 
});

// 予約情報取得
function getGasReserve(UID) {
  // GASでデプロイしたWebアプリケーションのURL★各自変更
  var URL =
    "https://script.google.com/macros/s/AKfycbzobHL6Bo3DxjUCNJKDXb7_0xvk0LUjU5M8BdPpid-szbeIaHlFcy5GoJgIkNyedKRj/exec";
  // GAS送信データ
  var SendDATA = {
    action: "SelEventReserveVeiw",
    useridprofilefield: UID,
  };
  // postparam固定
  var postparam = {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify(SendDATA),
  };
  // GAS doPost
  fetch(URL, postparam)
    .then((response) => response.json())
    // 成功した処理
    .then((data) => {
      // JSONから配列に変換
      const objUserinfo = data;
      // JSONからdatatablesへ格納

      }
    });
}
