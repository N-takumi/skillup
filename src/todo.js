function todolist(){

  var APP_NAME = "Todolist_APP";//アプリ名
  var APP_VERSION = 0.1;//バージョン

  var todolist_h = [];//todo保存用　配列
  var count = 0;

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

    //チェックボックスクリック時の状態保存
    $(".CheckBox").click(
    function(){
      console.log(this.id);

      if($(this).prop('checked')){
        todolist_h[this.id][1] = true;
      }else{
        todolist_h[this.id][1] = false;
      }

      localStorage.setItem(APP_NAME,JSON.stringify(todolist_h));
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

        var value,html = [],isCheck;
        //ローカルストレージに保存されたTodo全てを要素に追加する
        if(todolist_h.length != 0){
          for(var i = todolist_h.length-1;i >= 0;i--){

            value = todolist_h[i][0];
            isCheck = todolist_h[i][1];

            //表示する前にエスケープ
            html.push($("<li>").html("<input class='CheckBox' id ="+i+" type='checkbox'/>"+escapeText(value)));
            list.append(html);
            $("#"+i).prop('checked',isCheck);
          }

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

    var val = [text.val(),false];//二次元配列に変更　12/17   *******

    //入力チェックを行う
    if(checkText(val[0])){
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
        value = todolist_h[i][0];
        if(text == value){
          alert("同じ内容のTodoが存在します");
          return false;
        }
      }
    }
    //全てのチェックを通過できれば可
    return true;
  }

  //チェックボックスのtrueチェック・localStorageからの削除
  function check_checkbox(){

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
