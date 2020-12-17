function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    // console.log(e) eの中身確認用

    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true); // openメソッドを使用して、リクエストの内容を引数へ追記/非同期通信はtrueと設定＝非同期通信したい、って伝えている
    XHR.responseType = "json"; // 返却されるデータ形式
    XHR.send(formData); // FormDataとsendを使用して、メモ投稿のフォームに入力された情報を送信/リクエストを送信できます

    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;   // XHR.responseでレスポンスされてきたJSONにアクセス
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
             投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";
    };
    e.preventDefault();
  });

}
window.addEventListener("load", memo);




// XHR.responseでレスポンスされてきたJSONにアクセス