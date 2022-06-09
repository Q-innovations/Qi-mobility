// ロード時処理
window.addEventListener("load", function () {
  // LINE DevelopersのliffId★各自変更
  const LINE_LIFF_ID = "1657149830-k11N9eMA";
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
    // イベント情報取得
    getGasEventinfo();
    // 予約残数取得
    getGasEventReserveView();

    // 利用者が設定されていれば続行、なければ利用者登録アラートしてclose
    // window.alert('利用者登録後に予約お願いします。');
    // liff.closeWindow(); or return false;

    // 機器取得
    // getGasEventmenu();
  }
});

// LINEプロフィール取得
function getLineProfile(LINE_LIFF_ID) {
  // liff処理
  liff
    .init({
      liffId: LINE_LIFF_ID,
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
          //window.alert("liffＯＫ" + userId + " " + displayName);
          return true;
        })
        .catch(function (_error) {
          window.alert("LINEから起動してください");
          return false;
        });
    });
}

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
    //useridprofilefield: "U91f9611376221676612af6c1d690a8a5", //PCからテスト
    useridprofilefield: document.getElementById("useridprofilefield").value,
  };
  var postparam = {
    // データを返却するときは以下の設定をはずす
    // mode: "no-cors",
    // "Content-Type": "application/x-www-form-urlencoded",
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
      if (objUserinfo.length !== 0) {
        userinfoFlg = true;
      }
      // 返却値セット
      // ユーザID、LINE名、TEL
      document.getElementById("useridprofilefield").value =
        objUserinfo[0].useridprofilefield;
        document.getElementById("displaynamefield").value =
        objUserinfo[0].displaynamefield;
        document.getElementById("tel").value =
        objUserinfo[0].tel;
      // 利用者かな
      for (let i = 1; i < 7; i++) {
        let element = document.getElementById("riyokana");
        let options = document.createElement("option");
        if (eval("objUserinfo[0].riyo" + i)) {
          options.value = eval("objUserinfo[0].riyo" + i);
          options.text = eval("objUserinfo[0].riyo" + i);
          element.appendChild(options);
        }
      }
    });
}

// イベント情報取得
function getGasEventinfo() {
  // GASでデプロイしたWebアプリケーションのURL
  // https://ryjkmr.com/gas-web-application-usual-way/
  let URL =
    "https://script.google.com/macros/s/AKfycby5VRXd1fBUMQliiHHTswVzaqc9Pqg0nvKFxCt-oFdgLymGj-tQQAqjgwI-AB2FR-4C/exec";

  let SendDATA = {
    action: "SelEvent",
    erea: document.getElementById("erea").value,
  };
  let postparam = {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify(SendDATA),
  };
  // GAS doPost
  fetch(URL, postparam)
    .then((response) => response.json())
    /*成功した処理*/
    .then((data) => {
      //JSONから配列に変換
      const objEvent = data;
      // 会場
      for (var i = 0; i < objEvent.length; i++) {
        let element1 = document.getElementById("eplace1");
        let element2 = document.getElementById("eplace2");
        let options = document.createElement("option");
        options.value = objEvent[i].eplace;
        options.text = objEvent[i].eplace;
        element1.appendChild(options);
        element2.appendChild(options);
      }
    });
}

// 予約残数取得
function getGasEventReserveView() {
  // GASでデプロイしたWebアプリケーションのURL
  // https://ryjkmr.com/gas-web-application-usual-way/
  let URL =
    "https://script.google.com/macros/s/AKfycby5VRXd1fBUMQliiHHTswVzaqc9Pqg0nvKFxCt-oFdgLymGj-tQQAqjgwI-AB2FR-4C/exec";

  let SendDATA = {
    action: "SelEventReserve",
    erea: document.getElementById("erea").value,
    erea: document.getElementById("eplace1").value,
  };
  let postparam = {
    method: "POST",
    mode: "no-cors",
    "Content-Type": "application/x-www-form-urlencoded",
    body: JSON.stringify(SendDATA),
  };
  // GAS doPost
  fetch(URL, postparam)
    .then((response) => response.json())
    /*成功した処理*/
    .then((data) => {
      //JSONから配列に変換
      const object = data;
      //残数値 を変換　残りわずかなど

      //残数値 を更新
      //document.getElementById("1300").textContent = object.XXX
      //document.getElementById("1330").textContent = object.XXX
      //document.getElementById("1400").textContent = object.XXX
      //document.getElementById("1430").textContent = object.XXX
      //document.getElementById("1500").textContent = object.XXX
      //document.getElementById("1530").textContent = object.XXX
      //document.getElementById("1600").textContent = object.XXX
      //document.getElementById("1630").textContent = object.XXX
    });
}

// イベント会場1処理
function onbEplace1() {
  // 予約残数取得
  getGasEventReserveView();

  // 会場2をセット
  document.getElementById("eplace2").value =
    document.getElementById("eplace1").value;
}

// 登録ボタン処理
function onSubmit() {
  // LINE起動チェック
  //if (liff.isInClient()) { //PCからテスト
  if (!liff.isInClient()) {
    window.alert("LINEから起動してください");
  } else {
    // イベント予約登録
    if (!insertEventReserve()) {
      window.alert("イベント予約登録に失敗しました。");
      return false;
    } else {
      // PAYPAYAPI連携
      // PAYPAYIDと詳細と金額を送信して支払い
      // paymentPaypay();
      // Lineメッセージ登録
      var lineMsg =
        "イベント予約完了しました！PAYPAY(LINEPAY)からQRコードを読み取り、500円お支払いください。支払い確認のため支払い後のスクリーンショットをLINEへ送付ください。";
      // Lineメッセージ送信
      liff
        .sendMessages([
          {
            type: "text",
            text: JSON.stringify(lineMsg),
          },
        ])
        .then(() => {
          //window.alert("LINEsendMessages成功:");
          liff.closeWindow();
          return true;
        })
        .catch((error) => {
          window.alert("LINEsendMessages失敗: " + error);
          return false;
        });
      return false;
    }
  }
}

// イベント予約登録
function insertEventReserve() {
  // GASでデプロイしたWebアプリケーションのURL
  // https://ryjkmr.com/gas-web-application-usual-way/
  let URL =
    "https://script.google.com/macros/s/AKfycby5VRXd1fBUMQliiHHTswVzaqc9Pqg0nvKFxCt-oFdgLymGj-tQQAqjgwI-AB2FR-4C/exec";

  let SendDATA = {
    action: "InsEventReserve",
    useridprofilefield: document.getElementById("useridprofilefield").value,
    displaynamefield: document.getElementById("displaynamefield").value,
    tel: document.getElementById("tel").value,
    erea: document.getElementById("erea").value,
    eplace: document.getElementById("eplace2").value,
    riyokana: document.getElementById("riyokana").value,
    starttime: document.getElementById("starttime").value,
    menu: document.getElementById("menu").value,
  };
  let postparam = {
    method: "POST",
    mode: "no-cors",
    "Content-Type": "application/x-www-form-urlencoded",
    body: JSON.stringify(SendDATA),
  };
  // GAS doPost
  fetch(URL, postparam);
}
