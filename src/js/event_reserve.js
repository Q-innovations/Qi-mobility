// ロード時処理
window.addEventListener("DOMContentLoaded", function () {
  // LINE DevelopersのliffId★各自変更
  const LINE_LIFF_ID = "1657149830-k11N9eMA";
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
          document.getElementById("displaynamefield").value =
            profile.displayName;
          // ユーザー情報取得
          getGasUserinfo(UID);
          // イベント情報取得
          getGasEventinfo();
          // 予約残数取得
          getGasEventReserveView();
          // 機器取得(拡張用)
          // getGasEventmenu();
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
    getGasUserinfo(UID);
    getGasEventinfo();
    getGasEventReserveView();
  }
});

// ユーザー情報取得
function getGasUserinfo(UID) {
  // GASでデプロイしたWebアプリケーションのURL★各自変更
  var URL =
    "https://script.google.com/macros/s/AKfycbzobHL6Bo3DxjUCNJKDXb7_0xvk0LUjU5M8BdPpid-szbeIaHlFcy5GoJgIkNyedKRj/exec";
  // GAS送信データ
  var SendDATA = {
    action: "SelUserinfo",
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
          options.value = eval("objUserinfo[0].bd" + i);
          options.text = eval("objUserinfo[0].riyo" + i);
          element.appendChild(options);
        }
      }
    });
}

// イベント情報取得
function getGasEventinfo() {
  // GASでデプロイしたWebアプリケーションのURL★各自変更
  let URL =
    "https://script.google.com/macros/s/AKfycbzobHL6Bo3DxjUCNJKDXb7_0xvk0LUjU5M8BdPpid-szbeIaHlFcy5GoJgIkNyedKRj/exec";
  // GAS送信データ
  let SendDATA = {
    action: "SelEvent",
    erea: "福岡",
    //    displayflg: "0",  // GASで0固定
  };
  // postparam固定
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
      for (var i = 1; i < objEvent.length; i++) {
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
  // GASでデプロイしたWebアプリケーションのURL★各自変更
  let URL =
    "https://script.google.com/macros/s/AKfycbzobHL6Bo3DxjUCNJKDXb7_0xvk0LUjU5M8BdPpid-szbeIaHlFcy5GoJgIkNyedKRj/exec";
  // GAS送信データ
  let SendDATA = {
    action: "SelEventReserve",
    erea: "福岡",
    //    eplace: document.getElementById("eplace1").value,
  };
  // postparam固定
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
      const objEventReserve = data;
      //状況(予約可：〇、残りわずか：△、予約不可：×)
      document.getElementById("1300").textContent = objEventReserve[1].状況;
      document.getElementById("1330").textContent = objEventReserve[2].状況;
      document.getElementById("1400").textContent = objEventReserve[3].状況;
      document.getElementById("1430").textContent = objEventReserve[4].状況;
      document.getElementById("1500").textContent = objEventReserve[5].状況;
      document.getElementById("1530").textContent = objEventReserve[6].状況;
      document.getElementById("1600").textContent = objEventReserve[7].状況;
      document.getElementById("1630").textContent = objEventReserve[8].状況;
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
    // 利用者登録チェック
    if (!document.getElementById("riyokana").value) {
      window.alert("会員情報登録より利用者を登録してください。");
      return false;
    }
    // 予約重複・最新予約数チェック
//    if (!chkEventReserve()) {
//      window.location.reload();
//      return false;
//    }
    // イベント予約登録
    if (!insertEventReserve()) {
      window.alert("イベント予約登録に失敗しました。");
      return false;
    } else {
      // Lineメッセージ登録
      var riyokanaselected = $("#riyokana").children("option:selected");
      var lineMsg1 =
        "イベント予約完了しました。\n会場：" +
        document.getElementById("eplace1").value +
        "\n開始時刻：" +
        document.getElementById("starttime").value +
        "\n利用者：" +
        riyokanaselected.text() +
        "\n機種：" +
        document.getElementById("menu").value;
      var lineMsg2 =
        "PAYPAY(LINEPAY)から以下のQRコードを読み取り、500円お支払いください。";
      var lineMsg3 =
        "お支払い確認のため支払いIDが記載されているスクリーンショットをLINEへ送付ください。";
      var lineMsg4 =
        "現地でのQRコード支払い、現金での支払いは釣銭のなきようお願いいたします。";
      // Lineメッセージ送信
      liff
        .sendMessages([
          {
            type: "text",
            text: lineMsg1,
          },
          {
            type: "text",
            text: lineMsg2,
          },
          {
            type: "image",
            originalContentUrl:
              "https://q-innovations.github.io/Qi-mobility/src/jpeg/QR-PAYPAY.jpg",
            previewImageUrl:
              "https://q-innovations.github.io/Qi-mobility/src/jpeg/QR-PAYPAY.jpg",
          },
          {
            type: "text",
            text: lineMsg3,
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
      // PAYPAYAPI連携
      // PAYPAYIDと詳細と金額を送信して支払い
      // paymentPaypay();
      return false;
    }
    return false;
  }
  return false;
}

// 予約重複・最新予約数チェック
function chkEventReserve() {
  // GASでデプロイしたWebアプリケーションのURL★各自変更
  let URL =
    "https://script.google.com/macros/s/AKfycbzobHL6Bo3DxjUCNJKDXb7_0xvk0LUjU5M8BdPpid-szbeIaHlFcy5GoJgIkNyedKRj/exec";
  // GAS送信データ
  let SendDATA = {
    action: "ChkEventReserve",
    useridprofilefield: document.getElementById("useridprofilefield").value,
    erea: document.getElementById("erea").value,
    eplace: document.getElementById("eplace2").value,
    starttime: document.getElementById("starttime").value,
    riyokana: riyokanaselected.text(),
  };
  // postparam固定
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
      const objChkEve = data;
      // ユーザ重複チェック
      if (objChkEve[1].重複フラグ !== 0) {
        window.alert(
          "イベント予約登録に失敗しました。同じ時間帯での同じ利用者登録はできません。"
        );
        return false;
      }
      // 最新予約数チェック
      if (objChkEve[1].予約数フラグ !== 0) {
        window.alert(
          "イベント予約登録に失敗しました。指定された時間帯の予約数に達しました。"
        );
        return false;
      }
      return true;
    });
  return true;
}

// イベント予約登録
function insertEventReserve() {
  // GASでデプロイしたWebアプリケーションのURL★各自変更
  let URL =
    "https://script.google.com/macros/s/AKfycbzobHL6Bo3DxjUCNJKDXb7_0xvk0LUjU5M8BdPpid-szbeIaHlFcy5GoJgIkNyedKRj/exec";
  // GAS送信データ
  var riyokanaselected = $("#riyokana").children("option:selected");
  let SendDATA = {
    action: "InsReserve",
    useridprofilefield: document.getElementById("useridprofilefield").value,
    displaynamefield: document.getElementById("displaynamefield").value,
    tel: document.getElementById("tel").value,
    erea: document.getElementById("erea").value,
    eplace: document.getElementById("eplace2").value,
    starttime: document.getElementById("starttime").value,
    riyokana: riyokanaselected.text(),
    bd: riyokanaselected.val(),
    menu: document.getElementById("menu").value,
  };
  // postparam固定
  let postparam = {
    mode: "no-cors",
    "Content-Type": "application/x-www-form-urlencoded",
    //"Content-Type": "application/json",
    method: "POST",
    body: JSON.stringify(SendDATA),
  };
  // GAS doPost
  fetch(URL, postparam);
  return true;
}
