function todolist(){

  var APP_NAME = "Todolist_APP";//アプリ名
  var APP_VERSION = 0.1;//バージョン

  var todolist_h = [];//todo保存用　配列

  function init(){

    //ローカルストレージ内のTodoを読み込む
    showText();

    //Submitボタンクリック時の処理
    $("#SubmitButton").click(
    function(){
      saveText();
      showText();
    });

    //Allclearボタンクリック時の処理
    $("#AllclearButton").click(
    function(){
      clearText();
      showText();
    });

  }

  //Todoの読み込み及び表示
  function showText(){

      //ローカルストレージからJSON形式→配列で取得
      todolist_h = JSON.parse(localStorage.getItem(APP_NAME));

      if(todolist_h){

        //既にある要素を削除
        var list = $("#list");
        list.children().remove();

        var value,html = [];
        //ローカルストレージに保存されたTodo全てを要素に追加する
        if(todolist_h.length != 0){
          for(var i = todolist_h.length-1;i >= 0;i--){

            value = todolist_h[i];

            //表示する前にエスケープ
            html.push($("<h5>").html("・"+escapeText(value)));
          }
          list.append(html);
        }
      }else{
        todolist_h = [];
      }
  }

  //テキストの保存
  function saveText(){

    //ローカルストレージからJSON形式→配列で取得
    todolist_h = JSON.parse(localStorage.getItem(APP_NAME));

    if(todolist_h == null){
      todolist_h = [];
    }

    var text = $("#formText");//フォームからテキスト取得
    var val = text.val();



    //入力チェックを行う
    if(checkText(val)){
      //通ればセット
      todolist_h.push(val);
      localStorage.setItem(APP_NAME,JSON.stringify(todolist_h));
    }
    //テキストボックスをからにする
    text.val("");
  }

  //Todoのクリア
  function clearText(){
    todolist_h = [];//空配列で初期化
    localStorage.setItem(APP_NAME,JSON.stringify(todolist_h));
  }


  //入力された文字をチェック
  function checkText(text){

    //文字数チェック
    if(0 == text.length){
      alert("Todoが入力されていません")
      return false;
    }else if(30 < text.length){
      alert("文字数は30文字以下にしてください");
      return false;
    }

    //すでに入力された値があれば不可//   書き換える必要がある
    var value;
    if(todolist_h.length != 0){
      for(var i = 0;i < todolist_h.length;i++){
        value = todolist_h[i];
        if(text == value){
          alert("同じ内容のTodoが存在します");
          return false;
        }
      }
    }


    //全てのチェックを通過できれば可
    return true;

  }

  //HTMLタグのエスケープ処理
  function escapeText(text){

    var TABLE_FOR_ESCAPE_HTML = {
      "&":"&amp;",
      "\"":"&quot;",
      "<":"&lt;",
      ">":"&gt;"
    };

    return text.replace(/[&"<>]/g,function(match){
      return TABLE_FOR_ESCAPE_HTML[match];
    });
  }


  init();


}


//ロード時に読み込む
$(function(){
  todolist();
});
