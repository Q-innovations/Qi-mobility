// LINEプロフィール取得
function getLineProfile(_LINE_LIFF_ID) {
  //  alert("liffId:" + _LINE_LIFF_ID);
  // liff処理
  liff
    .init({
      liffId: _LINE_LIFF_ID,
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
          document.getElementById("name").value = profile.displayName;
          document.getElementById("displaynamefield").value =
            profile.displayName;
          // アラート出力
          var nowDate = new Date();
          var userId = profile.userId;
          var displayName = profile.displayName;
          var getLanguage = liff.getLanguage();
          var isInClient = liff.isInClient();
          var isLoggedIn = liff.isLoggedIn();
          window.alert(nowDate + " " + userId + " " + displayName);
          return true;
        })
        .catch(function (_error) {
          return false;
        });
    });
}

