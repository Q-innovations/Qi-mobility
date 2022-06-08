// ロード時処理
window.addEventListener("load", function () {
  // LINE DevelopersのliffId★各自変更
  var liffId = "1657149830-O4YdRWr2";
  // LINEプロフィール取得
  if (!getLineProfile(liffId)) {
    window.alert("LINEから起動してください");
  } else {
    // ユーザー情報取得
    //getGasUserinfo();
  }
});

// ユーザー情報取得
function getGasUserinfo() {
  // GASでデプロイしたWebアプリケーションのURL
  // https://ryjkmr.com/gas-web-application-usual-way/
  //  let URL =
  //    "https://script.google.com/macros/s/AKfycby5VRXd1fBUMQliiHHTswVzaqc9Pqg0nvKFxCt-oFdgLymGj-tQQAqjgwI-AB2FR-4C/exec";
  var URL =
    "https://script.google.com/macros/s/AKfycbzobHL6Bo3DxjUCNJKDXb7_0xvk0LUjU5M8BdPpid-szbeIaHlFcy5GoJgIkNyedKRj/exec";

  var SendDATA = {
    action: "SelUserinfo",
    useridprofilefield: document.getElementById("useridprofilefield").value,
    displaynamefield: document.getElementById("tel").value,
  };
  var postparam = {
    method: "POST",
    mode: "no-cors",
    "Content-Type": "application/x-www-form-urlencoded",
    body: JSON.stringify(SendDATA),
  };
  // GAS doPost
  fetch(URL, postparam)
    .then((response) => response.json())
    // 成功した処理
    .then((data) => {
      //JSONから配列に変換
      const object = data;
      //inputタグそれぞれに取得したデータを設定
      $("input").each(function (index, element) {
        if (object[0][$(element).attr("name")]) {
          $(element).val([object[0][$(element).attr("name")]]);
        }
      });
    });
}

// リアルタイムバリデーションならない
$(".name").on("change", function () {
  this.reportValidity();
});

// 代表者かな処理
function onNamekana() {
  // 利用者かな１と誕生日１をセット
  document.getElementById("riyo1").value =
    document.getElementById("namekana").value;
  var now = new Date();
  document.getElementById("bd1").value = "2000-01-01";
}

// 同意チェックボックス処理
function onAgree() {
  if (document.getElementById("checkAgree").checked) {
    document.getElementById("submitbtn").disabled = false;
  } else {
    document.getElementById("submitbtn").disabled = true;
  }
}

// 登録ボタン処理
window.addEventListener("submit", function () {
  // LINE起動チェック
  //if (liff.isInClient()) { //PC確認時
  if (!liff.isInClient()) {
    window.alert("LINEから起動してください");
    return false;
  } else {
    //ユーザー情報登録
    if (!insertUserInfo()) {
      window.alert("ユーザー情報登録に失敗しました。");
      return false;
    } else {
      // Lineメッセージ登録
      var lineMsg =
        "会員情報登録しました！会員ID： " +
        document.getElementById("useridprofilefield").value;
      // Lineメッセージ送信
      if (!sendLineMessages(lineMsg)) {
        window.alert("Line送信に失敗しました。");
        return false;
      } else {
        // liffクローズ
        window.alert("Line送信に成功しました。");
        liff.closeWindow();
        return false;
      }
    }
  }
});

// insertUserInfo
function insertUserInfo() {
  // GASでデプロイしたWebアプリケーションのURL
  // https://ryjkmr.com/gas-web-application-usual-way/
  //  let URL =
  //    "https://script.google.com/macros/s/AKfycby5VRXd1fBUMQliiHHTswVzaqc9Pqg0nvKFxCt-oFdgLymGj-tQQAqjgwI-AB2FR-4C/exec";
  var URL =
    "https://script.google.com/macros/s/AKfycbzobHL6Bo3DxjUCNJKDXb7_0xvk0LUjU5M8BdPpid-szbeIaHlFcy5GoJgIkNyedKRj/exec";

  var SendDATA = {
    action: "InsUserinfo",
    useridprofilefield: document.getElementById("useridprofilefield").value,
    displaynamefield: document.getElementById("displaynamefield").value,
    name: document.getElementById("name").value,
    namekana: document.getElementById("namekana").value,
    tel: document.getElementById("tel").value,
    zip: document.getElementById("zip").value,
    adress1: document.getElementById("adress1").value,
    adress2: document.getElementById("adress2").value,
    riyo1: document.getElementById("riyo1").value,
    bd1: document.getElementById("bd1").value,
    riyo2: document.getElementById("riyo2").value,
    bd2: document.getElementById("bd2").value,
    riyo3: document.getElementById("riyo3").value,
    bd3: document.getElementById("bd3").value,
    riyo4: document.getElementById("riyo4").value,
    bd4: document.getElementById("bd4").value,
    riyo5: document.getElementById("riyo5").value,
    bd5: document.getElementById("bd5").value,
    riyo6: document.getElementById("riyo6").value,
    bd6: document.getElementById("bd6").value,
  };
  var postparam = {
    method: "POST",
    mode: "no-cors",
    "Content-Type": "application/x-www-form-urlencoded",
    body: JSON.stringify(SendDATA),
    //    headers: {
    //      Accept: 'application/json',
    //      'Content-Type': 'application/x-www-form-urlencoded',
    //    }
  };
  // GAS doPost
  fetch(URL, postparam)
  return true;
}
