// ロード時処理
window.addEventListener("load", function () {
  // LINE DevelopersのliffId★各自変更
  const LINE_LIFF_ID = "1657149830-O4YdRWr2";
  // ユーザ情報有無フラグ(true：データあり)
  const userinfoFlg = false;
  // LINEプロフィール取得
  if (!getLineProfile(LINE_LIFF_ID)) {
    // ユーザー情報取得
    //getGasUserinfo(); //PCからテスト
    //window.alert("LINEから起動してください");
  } else {
    // ユーザー情報取得
    getGasUserinfo();
  }
});

// LINEプロフィール取得
function getLineProfile(LINE_LIFF_ID) {
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
          // profile情報セット
          document.getElementById("useridprofilefield").value = profile.userId;
          document.getElementById("displaynamefield").value =
            profile.displayName;
          return true;
        })
        .catch(function (_error) {
          window.alert("LINEから起動してください。");
          return false;
        });
    });
}

// ユーザー情報取得
function getGasUserinfo() {
  // GASでデプロイしたWebアプリケーションのURL★各自変更
  var URL =
    "https://script.google.com/macros/s/AKfycbzobHL6Bo3DxjUCNJKDXb7_0xvk0LUjU5M8BdPpid-szbeIaHlFcy5GoJgIkNyedKRj/exec";
  // GAS送信データ
  var SendDATA = {
    action: "SelUserinfo",
    useridprofilefield: document.getElementById("useridprofilefield").value,
    //useridprofilefield: "U91f9611376221676612af6c1d690a8a5", //PCからテスト
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
      // ユーザ情報有無フラグ(true：データあり)
      if (objUserinfo.length === 0) {
        userinfoFlg = false;
      } else {
        userinfoFlg = true;
        // inputタグそれぞれに取得したデータを設定
        document.getElementById("name").value = objUserinfo[0].name;
        document.getElementById("namekana").value = objUserinfo[0].namekana;
        document.getElementById("tel").value = objUserinfo[0].tel;
        document.getElementById("zip").value = objUserinfo[0].zip;
        document.getElementById("adress1").value = objUserinfo[0].adress1;
        document.getElementById("adress2").value = objUserinfo[0].adress2;
        document.getElementById("riyo1").value = objUserinfo[0].riyo1;
        document.getElementById("bd1").value = objUserinfo[0].bd1.substr(0, 10);
        document.getElementById("riyo2").value = objUserinfo[0].riyo2;
        document.getElementById("bd2").value = objUserinfo[0].bd2.substr(0, 10);
        document.getElementById("riyo3").value = objUserinfo[0].riyo3;
        document.getElementById("bd3").value = objUserinfo[0].bd3.substr(0, 10);
        document.getElementById("riyo4").value = objUserinfo[0].riyo4;
        document.getElementById("bd4").value = objUserinfo[0].bd4.substr(0, 10);
        document.getElementById("riyo5").value = objUserinfo[0].riyo5;
        document.getElementById("bd5").value = objUserinfo[0].bd5.substr(0, 10);
        document.getElementById("riyo6").value = objUserinfo[0].riyo6;
        document.getElementById("bd6").value = objUserinfo[0].bd6.substr(0, 10);
      }
    });
}

// リアルタイムバリデーション
$("#name").on("change", function () {
  this.reportValidity();
});
$("#namekana").on("change", function () {
  this.reportValidity();
});
$("#tel").on("change", function () {
  this.reportValidity();
});
$("#zip").on("change", function () {
  this.reportValidity();
});
$("#adress1").on("change", function () {
  this.reportValidity();
});
$("#adress2").on("change", function () {
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
function onSubmit() {
  // LINE起動チェック
  //if (liff.isInClient()) { //PCからテスト
  if (!liff.isInClient()) {
    window.alert("LINEから起動してください。");
    return false;
  } else {
    //ユーザー情報削除
    if (userinfoFlg) {
      if (!deleteUserInfo()) {
        window.alert("ユーザー情報削除に失敗しました。");
        return false;
      }
    }
    //ユーザー情報登録
    if (!insertUserInfo()) {
      window.alert("ユーザー情報登録に失敗しました。");
      return false;
    } else {
      // Lineメッセージ登録
      var lineMsg =
        "会員登録しました。\n会員ID： " +
        document.getElementById("useridprofilefield").value +
        "\n会員名： " +
        document.getElementById("name").value;
      // Lineメッセージ送信
      liff
        .sendMessages([
          {
            type: "text",
            text: lineMsg,
          },
        ])
        .then(() => {
          liff.closeWindow();
          return true;
        })
        .catch((error) => {
          window.alert("LINEsendMessages失敗: " + error);
          return false;
        });
      return false;
    }
    return false;
  }
  return false;
}

// ユーザー情報削除
function deleteUserInfo() {
  // GASでデプロイしたWebアプリケーションのURL★各自変更
  var URL =
    "https://script.google.com/macros/s/AKfycbzobHL6Bo3DxjUCNJKDXb7_0xvk0LUjU5M8BdPpid-szbeIaHlFcy5GoJgIkNyedKRj/exec";
  // GAS送信データ
  var SendDATA = {
    action: "DelUserinfo",
    useridprofilefield: document.getElementById("useridprofilefield").value,
  };
  // postparam固定
  var postparam = {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify(SendDATA),
  };
  // GAS doPost
  fetch(URL, postparam);
  return true;
}

// ユーザー情報登録
function insertUserInfo() {
  // GASでデプロイしたWebアプリケーションのURL★各自変更
  var URL =
    "https://script.google.com/macros/s/AKfycbzobHL6Bo3DxjUCNJKDXb7_0xvk0LUjU5M8BdPpid-szbeIaHlFcy5GoJgIkNyedKRj/exec";
  // GAS送信データ
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
  // postparam固定
  var postparam = {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify(SendDATA),
  };
  // GAS doPost
  fetch(URL, postparam);
  return true;
}
