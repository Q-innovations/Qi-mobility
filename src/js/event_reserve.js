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
    //alert('OK!!');
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
  // GasUserinfo取得
  getGasUserinfo();
  // GasUserinfoがあれば続行、なければ利用者登録アラート
  // GasEventinfo会場取得
  getGasEventinfo();
  // GasEventmenu機器取得
  // getGasEventmenu();
  // GasEventReserveView予約残数取得
  getGasEventReserveView();
  // GasEventReserveViewセット
  // dispGasEventReserveView();
  // GasEventinfo会場セット
  // dispGasEventinfo();
  // GasUserinfo利用者セット
  // dispGasUserinfo();
  // GasEventmenu機器セット
  // dispGasEventmenu();
});

// ユーザー情報取得
function getGasUserinfo(userId) {
    // GASでデプロイしたWebアプリケーションのURL
    // https://ryjkmr.com/gas-web-application-usual-way/
    let URL =
      "https://script.google.com/macros/s/AKfycby5VRXd1fBUMQliiHHTswVzaqc9Pqg0nvKFxCt-oFdgLymGj-tQQAqjgwI-AB2FR-4C/exec";

    let SendDATA = {
      action: "GetUserinfo",
      useridprofilefield: document.getElementById("useridprofilefield").value,
      displaynamefield: document.getElementById("displaynamefield").value
    };
    let postparam = {
      method: "POST",
      mode: "no-cors",
      "Content-Type": "application/x-www-form-urlencoded",
      body: JSON.stringify(SendDATA),
    };
    // GAS doPost
    fetch(URL, postparam)
        .then(response => response.json())
        /*成功した処理*/
        .then(data => {
            //JSONから配列に変換
            const object = data;
            //inputタグそれぞれに取得したデータを設定
            $('input').each(function (index, element) {
                if (object[0][$(element).attr('name')]) {
                    $(element).val([object[0][$(element).attr('name')]]);
                }
            });
        });


/*
//ここは各自変更してください。
const SPREAD_SHEET_ID = 'スプレッドシートのID';
const SHEET_NAME = 'シート名';

//GETリクエスト時に呼び出される関数
function doGet(e) {
  //スプレッドシートをIDで取得
  const app = SpreadsheetApp.openById(SPREAD_SHEET_ID);
  //シートをシート名で取得
  const sheet = app.getSheetByName(SHEET_NAME);
  //シートの入力内容を全て配列で取得
  const values = sheet.getDataRange().getValues();
  const data = [];

  //シートの入力内容をオブジェクトに詰め替え
  for(let i=0; i<values.length; i++){
    //ヘッダー部(1行目)はスキップ
    if(i === 0)continue;
    const param = {};
    for(let j=0; j<values[i].length; j++){
      param[values[0][j]] = values[i][j];
    }
    data.push(param);
  }
  //返却情報を生成
  const result = ContentService.createTextOutput();

    //Mime TypeをJSONに設定
    result.setMimeType(ContentService.MimeType.JSON);

    //JSONテキストをセットする
    result.setContent(JSON.stringify(data));

    return result;
}



var page=e.parameter["p"];
if(page == "index" || page==null){
var app = HtmlService.createTemplateFromFile("Index.html");
return app.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
}
else if(page =="menu1"){
var app = HtmlService.createTemplateFromFile("Menu1.html");
return app.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
}
else if(page =="menu2"){
var app = HtmlService.createTemplateFromFile("Menu2.html");
return app.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
}
else{
var app = HtmlService.createTemplateFromFile("Error.html");
return app.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

*/




    }

// 同意チェックボックス処理
// 「同意する」のチェックボックスを取得
const agreeCheckbox = document.getElementById("agree");
// 送信ボタンを取得
const submitBtn = document.getElementById("submit-btn");
// チェックボックスをクリック
agreeCheckbox.addEventListener("click", () => {
  // チェックされている場合
  if (agreeCheckbox.checked === true) {
    submitBtn.disabled = false; // disabledを外す
  }
  // チェックされていない場合
  else {
    submitBtn.disabled = true; // disabledを付与
  }
});

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
      // UserInfoスプレッドシート登録
      insertUserInfo();
      // UserInfoスプレッドシート更新
      // updateUserInfo();
      // EventReserveにデータがあれば注意を促す
      // GAS＋googleスプレッドシート登録
      //        insertEventReserve();
      // PAYPAYAPI連携
      // PAYPAYIDと詳細と金額を送信して支払い
      //        paymentPaypay();
      // LINEメッセージ送信
      liff
        .sendMessages([
          {
            type: "text",
            text: JSON.stringify(
              "イベント予約しました！会員ID： " +
                document.getElementById("useridprofilefield").value
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

  // insertUserInfo
  function insertUserInfo() {
    // GASでデプロイしたWebアプリケーションのURL
    // https://ryjkmr.com/gas-web-application-usual-way/
    let URL =
      "https://script.google.com/macros/s/AKfycby5VRXd1fBUMQliiHHTswVzaqc9Pqg0nvKFxCt-oFdgLymGj-tQQAqjgwI-AB2FR-4C/exec";

    let SendDATA = {
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
