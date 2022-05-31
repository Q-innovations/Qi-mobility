// LINEプロフィール取得
function getLineProfile(liffId) {

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
            // アラート出力
            var nowDate = new Date();
            var userId = profile.userId;
            var displayName = profile.displayName;
            var getLanguage = liff.getLanguage();
            var isInClient = liff.isInClient();
            var isLoggedIn = liff.isLoggedIn();
            //window.alert(nowDate + " " + userId + " " + displayName + " " + getLanguage + " " + isInClient + " " + isLoggedIn);
          })
          .catch(function (error) {
            alert("LINEから起動してください:" + liffId);
          });
      });
  }
  