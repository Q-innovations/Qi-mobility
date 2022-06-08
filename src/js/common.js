// LINEプロフィール取得
function getLineProfile(liffId) {
  var liffId = "1657149830-O4YdRWr2";
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
          document.getElementById("displaynamefield").value =
            profile.displayName;
          profile.displayName;
          // アラート出力
          var nowDate = new Date();
          var userId = profile.userId;
          var displayName = profile.displayName;
          var getLanguage = liff.getLanguage();
          var isInClient = liff.isInClient();
          var isLoggedIn = liff.isLoggedIn();
          console.log(nowDate + " " + userId + " " + displayName);
          alert(nowDate + " " + userId + " " + displayName);
        })
        .catch(function (error) {
          console.log(
            "LINEから起動してください:" +
              document.getElementById("useridprofilefield").value +
              document.getElementById("displaynamefield").value
          );
          alert("LINEから起動してください:" + liffId);
        });
    });
}

// LINEメッセージテキスト送信
function sendLineMessages(lineMsg) {
  /*
  liff
    .sendMessages([
      {
        type: "text",
        text: "テキストメッセージの送信",
      },
      {
        type: "sticker",
        packageId: "2",
        stickerId: "144",
      },
    ])
    .then(function () {
      window.alert("送信完了");
    })
    .catch(function (error) {
      window.alert("Error sending message: " + error);
    });
*/

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
      liff.closeWindow();
      return false;
    })
    .catch((error) => {
      window.alert("LINEsendMessages失敗: " + error);
      return false;
    });
    return false;
}
