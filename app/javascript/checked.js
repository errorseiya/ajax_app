function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) { // forEachを記述して、それぞれの要素への処理を記述する場所を用意
    
    if (post.getAttribute("data-load") != null) {  // 重複したイベント発火を回避
      return null;
    }
    post.setAttribute("data-load", "true");
    
    post.addEventListener("click", () => {// 処理としてaddEventListenerメソッドを使用し、引数にclickの指定
    // ⬆︎２行でw「要素1つずつに対して、『クリック』した際に動作するイベント駆動」を設定することができました。

    // ここにクリックした時に行う「何らかの処理」を記述していく
      const postId = post.getAttribute("data-id");
      // getAttributeで属性値を取得=data-idの値を取得/// idは後ほど、URLパラメーターでサーバーにパラメーターとして送ります。

      const XHR = new XMLHttpRequest();// オブジェクトを生成
      // ⬆︎これで変数XHRから、XMLHttpRequestのメソッドを使用できるようになった

      XHR.open("GET", `/posts/${postId}`, true);
      // openメソッドを使用してリクエストの詳細を指定/// trueで	非同期通信のON/OFF booleanで記述,boolean型とは真(true)、偽(false)を表す型
      XHR.responseType = "json";
      // レスポンスの形式を指定/今回のレスポンスはJSON形式のデータ/リクエストを送る際にあらかじめレスポンスとして欲しい情報の形式を指定する必要がある
      XHR.send();// 引数の指定はとくに必要ありません。sendメソッドを記述することで、はじめてリクエストが行えます
      // ここまでで、リクエストの送信準備が完了
      XHR.onload = () => {     // レスポンスなどの受信が成功した場合に呼び出される実行される処理
        // ⬇︎HTTPステータスコードが200以外の場合、ifはtrueとなり、アラートを表示する処理
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;    
          // JavaScriptの処理から抜け出すことができます。これはエラーが出た場合に、15行目以降に記述されている処理を行わないようにすることが目的      
        }

        const item = XHR.response.post;  // postは、posts_controller.rbに記述した render json:{ post: item }
        if (item.checked === true) {
          post.setAttribute("data-check", "true");// 既読であれば先ほどHTMLに定義した属性であるdata-checkの属性値にtrueをセット
        } else if (item.checked === false) {
          post.removeAttribute("data-check");// 未読であればdata-checkは属性ごと削除
        }
      };
    });
  });
}
    
setInterval(check, 1000);

// window.addEventListener("load", check);
// ページを読み込むごとに実行される関数


// 重複したイベント発火を回避

// ==は、文字列と数値の比較の場合、文字列を数値に変換してくれるわけです。

//===は、文字列は数値にに変換されない
