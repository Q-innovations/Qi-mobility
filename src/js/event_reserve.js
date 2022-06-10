// ロード時処理
window.addEventListener("load", function () {
  // LINE DevelopersのliffId★各自変更
  const LINE_LIFF_ID = "1657149830-k11N9eMA";
  // ユーザ情報有無フラグ(true：データあり)
  const userinfoFlg = false;
  // LINEプロフィール取得
  if (!getLineProfile(LINE_LIFF_ID)) {
    // ユーザー情報取得
    getGasUserinfo(); //PCからテスト
    getGasEventinfo(); //PCからテスト
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
  // GASでデプロイしたWebアプリケーションのURL
  // https://ryjkmr.com/gas-web-application-usual-way/
  //  let URL =
  //    "https://script.google.com/macros/s/AKfycby5VRXd1fBUMQliiHHTswVzaqc9Pqg0nvKFxCt-oFdgLymGj-tQQAqjgwI-AB2FR-4C/exec";
  var URL =
    "https://script.google.com/macros/s/AKfycbzobHL6Bo3DxjUCNJKDXb7_0xvk0LUjU5M8BdPpid-szbeIaHlFcy5GoJgIkNyedKRj/exec";

  var SendDATA = {
    action: "SelUserinfo",
    useridprofilefield: document.getElementById("useridprofilefield").value,
    //useridprofilefield: "U91f9611376221676612af6c1d690a8a5", //PCからテスト
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
      document.getElementById("tel").value = objUserinfo[0].tel;
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
    /*成功した処理*/
    .then((data) => {
      //JSONから配列に変換
      const objEvent = data;
      // 会場
      for (var i = 0; i < objEvent.length; i++) {
        let element1 = document.getElementById("eplace1");
        let element2 = document.getElementById("eplace2");
        let options1 = document.createElement("option");
        let options2 = document.createElement("option");
        options1.value = objEvent[i].eplace;
        options1.text = objEvent[i].eplace;
        options2.value = objEvent[i].eplace;
        options2.text = objEvent[i].eplace;
        element1.appendChild(options1);
        element2.appendChild(options2);
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
function onEplace1() {
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
    window.alert("LINEから起動してください。");
  } else {
    // イベント予約登録
    if (!document.getElementById("riyokana").value) {
      window.alert("会員情報登録より利用者を登録してください。");
      return false;
    }
    // イベント予約登録
    if (!insertEventReserve()) {
      window.alert("イベント予約登録に失敗しました。");
      return false;
    } else {
      // Lineメッセージ登録
      var lineMsg1 =
        "イベント予約完了しました。\n会場：" +
        document.getElementById("eplace1").value +
        "\n利用者：" +
        document.getElementById("riyokana").value +
        "\n開始時刻：" +
        document.getElementById("starttime").value +
        "\n機種：" +
        document.getElementById("menu").value;
      var lineMsg2 =
        "PAYPAY(LINEPAY)から以下のQRコードを読み取り、500円お支払いください。\n支払い確認のため支払い後のスクリーンショットをLINEへ送付ください。";
      // Lineメッセージ送信
      liff
        .sendMessages([
          {
            type: "text",
            text: JSON.stringify(lineMsg1),
          },
          {
            type: "text",
            text: JSON.stringify(lineMsg2),
          },
          /* https://developers.line.biz/ja/reference/messaging-api/#image-message
          {
            type: "image",
            originalContentUrl: "https://example.com/original.jpg",
            previewImageUrl: "https://example.com/preview.jpg",
          },
          */
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
      // PAYPAYAPI連携
      // PAYPAYIDと詳細と金額を送信して支払い
      // paymentPaypay();
      return false;
    }
    return false;
  }
  return false;
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
  return true;
}
