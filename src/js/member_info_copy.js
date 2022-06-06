// 代表者かな処理
function onbNamekana() {
  // 利用者かな１と誕生日１をセット
  document.getElementById("riyo1").value =
    document.getElementById("namekana").value;
  var now = new Date();
  document.getElementById("bd1").value = "2000-01-01";
}

// 同意チェックボックス処理
// 「同意する」のチェックボックス
const agreeCheckbox = document.getElementById("agree");
// 送信ボタン
const submitBtn = document.getElementById("submit-btn");

agreeCheckbox.addEventListener('change', (event) => {
  // チェックされている場合
  if (agreeCheckbox.checked === true) {
    submitBtn.disabled = false; // disabledを外す
  }
  // チェックされていない場合
  else {
    submitBtn.disabled = true; // disabledを付与
  }
});
