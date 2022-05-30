// ロード時処理 
window.addEventListener('load', function () {

    // Bootstrap Inline Form Validation Engine
    jQuery("#inputform").validationEngine('attach', {
        ajaxFormValidation: true
        , onBeforeAjaxFormValidation: beforeCall
        , promptPosition: "bottomLeft"
    });
    function beforeCall() {
        alert('OK!!');
    }

    // LINEプロフィール取得
    getLineProfile();



    // LINEプロフィール取得
    function getLineProfile() {
        // LINE DevelopersのliffId★各自変更
        var liffId = "1657149830-O4YdRWr2";
        // liff処理 
        liff.init({
            liffId: liffId
        }).then(() => {
            // LINEプロフィール取得表示
            //初期化 
            // https://developers.line.me/ja/reference/liff/#liffgetprofile()
            liff.getProfile().then(function (profile) {
                // profile情報セット
                document.getElementById('useridprofilefield').value = profile.userId;
                document.getElementById('displaynamefield').value = profile.displayName;
                // アラート出力
                var nowDate = new Date();
                var userId = profile.userId;
                var displayName = profile.displayName;
                var getLanguage = liff.getLanguage();
                var isInClient = liff.isInClient();
                var isLoggedIn = liff.isLoggedIn();
                window.alert(nowDate + " " + userId + " " + displayName + " " + getLanguage + " " + isInClient + " " + isLoggedIn);
            }).catch(function (error) {
                alert("LINEから起動してください");
            });
        });
    }
})

// 代表者かな処理
function onbNamekana() {
    // 利用者かな１と誕生日１をセット
    document.getElementById('riyo1').value = document.getElementById('namekana').value;
    var now = new Date();
    document.getElementById('bd1').value = '2000-01-01';
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
$('form').submit(function () {

    // UserInfoにデータがない場合

    // UserInfoにデータがある場合
    // UserInfoスプレッドシート更新
    //        updateUserInfo();

    // sendMessages call
    //        if (!liff.isInClient()) {
    if (liff.isInClient()) {
        window.alert('LINEから起動してください');
    } else {
        // UserInfoスプレッドシート登録
        insertUserInfo();
        // LINEメッセージ送信
        liff.sendMessages([
            {
                type: 'text',
                text: JSON.stringify('会員情報登録しました！会員ID： ' + document.getElementById('useridprofilefield').value),
            },
        ])
            .then(() => {
                // window.alert('Message sent');
                liff.closeWindow();
            })
            .catch((error) => {
                window.alert('Error sending message: ' + error);
            });
    }
    return false;






    // insertUserInfo
    function insertUserInfo() {
        // ENDPOINTにGASでデプロイしたWebアプリケーションのURL
        // https://ryjkmr.com/gas-web-application-usual-way/
        let ENDPOINT = "https://script.google.com/macros/s/AKfycbx-uByBSgadRv1uDtdvuNzJlv1nXvmm8KKAPokxPSZB7y4xwq_bh5B0eItobHfBAQLx/exec";

        let SendDATA = {
            "action": "insertUserInfo",
            "useridprofilefield": document.getElementById("useridprofilefield").value,
            "displaynamefield": document.getElementById("displaynamefield").value,
            "name": document.getElementById("name").value,
            "namekana": document.getElementById("namekana").value,
            "tel": document.getElementById("tel").value,
            "zip": document.getElementById("zip").value,
            "adress1": document.getElementById("adress1").value,
            "adress2": document.getElementById("adress2").value,
            "riyo1": document.getElementById("riyo1").value,
            "bd1": document.getElementById("bd1").value,
            "riyo2": document.getElementById("riyo2").value,
            "bd2": document.getElementById("bd2").value,
            "riyo3": document.getElementById("riyo3").value,
            "bd3": document.getElementById("bd3").value,
            "riyo4": document.getElementById("riyo4").value,
            "bd4": document.getElementById("bd4").value,
            "riyo5": document.getElementById("riyo5").value,
            "bd5": document.getElementById("bd5").value,
            "riyo6": document.getElementById("riyo6").value,
            "bd6": document.getElementById("bd6").value
//            "delflg": 0,
//            "datetime": 1
        };
        let postparam = {
            "method": "POST",
            "mode": "no-cors",
            "Content-Type": "application/x-www-form-urlencoded",
            "body": JSON.stringify(SendDATA)
        };
        fetch(UENDPOINTRL, postparam);

    }


});
