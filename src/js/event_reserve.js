// ロード時処理
window.addEventListener("load", function () {
  // Bootstrap Inline Form Validation Engine
  jQuery("#inputform").validationEngine("attach", {
    ajaxFormValidation: true,
    onBeforeAjaxFormValidation: beforeCall,
    promptPosition: "topRight",
  });
  function beforeCall() {
    //すべてOK!!
    alert('チェックOK!!');
  }
  // LINEプロフィール取得
  // LINE DevelopersのliffId★各自変更
  var liffId = "1657149830-k11N9eMA";
  getLineProfile(liffId);

  // LINE起動チェック
  //if (liff.isInClient()) {
  if (!liff.isInClient()) {
    window.alert("LINEから起動してください");
  } else {
    // ユーザー情報取得
    getGasUserinfo();
    // 利用者が設定されていれば続行、なければ利用者登録アラートしてclose
    // window.alert('利用者登録後に予約お願いします。');
    // liff.closeWindow(); or return false;
    // イベント情報取得
    //getGasEventinfo();
    // 予約残数取得
    //getGasEventReserveView();
    // 機器取得
    // getGasEventmenu();
  }
});

// ユーザー情報取得
function getGasUserinfo() {
  // GASでデプロイしたWebアプリケーションのURL
  // https://ryjkmr.com/gas-web-application-usual-way/
  let URL =
    "https://script.google.com/macros/s/AKfycby5VRXd1fBUMQliiHHTswVzaqc9Pqg0nvKFxCt-oFdgLymGj-tQQAqjgwI-AB2FR-4C/exec";

  let SendDATA = {
    action: "SelUserinfo",
    useridprofilefield: document.getElementById("useridprofilefield").value,
    tel: document.getElementById("tel").value,
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
      //inputタグそれぞれに取得したデータを設定
      $("input").each(function (index, element) {
        if (object[0][$(element).attr("name")]) {
          $(element).val([object[0][$(element).attr("name")]]);
        }
      });
      window.alert(data);
      /*
      //利用者selectタグ（子） の option値 を一旦削除
      $(".riyokana option").remove();
      //optionタグ を追加する
      $.each(data, function (id, name) {
        $(".riyokana").append($("<option>").text(name).attr("value", id));
      });
      */
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
      /*
      //会場selectタグ（子） の option値 を一旦削除
      $(".eplace1 option").remove();
      $(".eplace2 option").remove();
      //optionタグ を追加する
      $.each(data, function (id, name) {
        $(".eplace1").append($("<option>").text(name).attr("value", id));
        $(".eplace2").append($("<option>").text(name).attr("value", id));
      });
      */
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
$("form").submit(function () {
  // validate結果を取得
  var validateResult = $("#inputform").validationEngine("validate");
  if (!validateResult) {
    // validate結果NG
    window.alert("入力エラーがあります。");
  } else {
    // validate結果OK
    // LINE起動チェック
    //if (liff.isInClient()) { //PCよりWEBで確認
    if (!liff.isInClient()) {
      window.alert("LINEから起動してください");
    } else {
      // イベント予約登録
      insertEventReserve();
      // PAYPAYAPI連携
      // PAYPAYIDと詳細と金額を送信して支払い
      // paymentPaypay();
      // LINEメッセージ送信
      liff
        .sendMessages([
          {
            type: "text",
            text: JSON.stringify(
              "イベント予約完了しました！PAYPAYからQRコードを読み取り、500円お支払いください。支払い確認のため支払った後のスクリーンショットを張り付けてください。"
            ),
          },
        ])
        .then(() => {
          // window.alert('Message sent');
          liff.closeWindow();
        })
        .catch((error) => {
          window.alert("LINEsendMessages失敗: " + error);
        });
    }
  }
  return false;

  // イベント予約登録
  function insertEventReserve() {
    // GASでデプロイしたWebアプリケーションのURL
    // https://ryjkmr.com/gas-web-application-usual-way/
    let URL =
      "https://script.google.com/macros/s/AKfycby5VRXd1fBUMQliiHHTswVzaqc9Pqg0nvKFxCt-oFdgLymGj-tQQAqjgwI-AB2FR-4C/exec";

    let SendDATA = {
      action: "InsEventReserve",
      useridprofilefield: document.getElementById("useridprofilefield").value,
      bd4: document.getElementById("eplace2").value,
      riyo5: document.getElementById("riyokana").value,
      bd5: document.getElementById("starttime").value,
      riyo6: document.getElementById("menu").value,
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
});
