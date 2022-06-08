// LINEプロフィール取得
function getLineProfile(liffId) {
//  alert("liffId:" + liffId);
  var nowDate = new Date();
  // liff処理
  liff
    .init({
      liffId: liffId,
    })
    .then(() => {
      // LINEプロフィール取得表示
      //初期化
      // https://developers.line.me/ja/reference/liff/#liffgetprofile()
      liff
        .getProfile()
        .then(function (profile) {
          // profile情報セット
          document.getElementById("useridprofilefield").value = profile.userId;
          document.getElementById("name").value =
            profile.displayName;
          // アラート出力
          var userId = profile.userId;
          var displayName = profile.displayName;
          var getLanguage = liff.getLanguage();
          var isInClient = liff.isInClient();
          var isLoggedIn = liff.isLoggedIn();
          alert(nowDate + " " + userId + " " + displayName);
          return true;
        })
        .catch(function (error) {
          return false;
        });
    });
}

// LINEメッセージテキスト送信
function sendLineMessages(lineMsg) {
  // liff処理
  liff
    .sendMessages([
      {
        type: "text",
        text: JSON.stringify(lineMsg),
      },
    ])
    .then(() => {
      window.alert("LINEsendMessages成功:");
      return true;
    })
    .catch((error) => {
      window.alert("LINEsendMessages失敗: " + error);
      return false;
    });
}
