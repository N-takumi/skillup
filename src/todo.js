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
      console.log("submit!");
      saveText();
      showText();
    });

    //Allclearボタンクリック時の処理
    $("#AllclearButton").click(
    function(){
      todolist_h = JSON.parse(localStorage.getItem(APP_NAME));
      if(window.confirm("保存されているTodo"+todolist_h.length+"つを全て削除しますか?")){
        clearText();
      }
    });

    //チェックボックスクリック時の状態保存
    $(document).on('click','.CheckBox',function(){//動的に生成されたものはこの記法で書く
      console.log(this.id);

      if($(this).prop('checked')){
        todolist_h[this.id][1] = true;
      }else{
        todolist_h[this.id][1] = false;
      }

      localStorage.setItem(APP_NAME,JSON.stringify(todolist_h));
      showText();
    });

    //完了ボタンクリック時の処理
    $("#completion").click(
    function(){

        var h = [];
        var checkCount = 0;
        var isCheck;

        todolist_h = JSON.parse(localStorage.getItem(APP_NAME));
        for(var i = 0;i < todolist_h.length;i++){
          isCheck = todolist_h[i][1];//チェックボックスの状態を格納
          if(isCheck == true)checkCount++;
        }

      if(checkCount > 0){
          if(window.confirm("完了したTodo"+checkCount+"つを削除しますか?")){
            for(var i = 0;i < todolist_h.length;i++){

            if(todolist_h[i][1]== false){
            h.push(todolist_h[i]);
            }

            }
            localStorage.setItem(APP_NAME,JSON.stringify(h));
          }
      }else{
        alert("現在完了しているTodoはありません");
      }

      showText();
      console.log("hello");
    });

    //フッターのバージョン更新
    $("#footer").text(APP_NAME+"var."+APP_VERSION+"　　");



  }

  //Todoの読み込み及び表示
  function showText(){

      var checkCount = 0;//完了Todoの数を入れる

      //ローカルストレージからJSON形式→配列で取得
      todolist_h = JSON.parse(localStorage.getItem(APP_NAME));


      if(todolist_h != null){

        //既にある要素を削除
        var list = $("#list");
        list.children().remove();

        var value,html = [],isCheck,className;
        //ローカルストレージに保存されたTodo全てを要素に追加する
        if(todolist_h.length != 0){
          for(var i = todolist_h.length-1;i >= 0;i--){
            className = "todo";//クラス名初期化
            value = todolist_h[i][0];//テキストを格納
            var year = todolist_h[i][2];//追加年
            var month = todolist_h[i][3];
            var day = todolist_h[i][4];
            var week = todolist_h[i][5];

            if(todolist_h[i][1]){
              className = "todo_checked";//チェック時の初期化
            }

            //表示する前にエスケープ
            html.push($('<li class = '+className+'>').html("<div><input class='CheckBox' id ="+i+" type='checkbox'/>"+"<span id ='todo_title'>"+escapeText(value)+"</span>"
                     +("</br><span id = 'todo_time'>   追加日時:"+year+"年　"+month+"/"+day
                     +" ("+week+")"+"</span></div>")));
          }
        }
        list.append(html);

        for(var i = 0;i < todolist_h.length;i++){
          isCheck = todolist_h[i][1];//チェックボックスの状態を格納
          if(isCheck == true)checkCount++;
          $("#"+i).prop('checked',isCheck);
        }

      }else{
        todolist_h = [];
      }

      $("#compTodo_text").text("のこりTodo数:　"+checkCount+"/"+todolist_h.length);//Todo数更新
      $("progress").attr('value',(checkCount/todolist_h.length)*100);//プログレスバー更新

      console.log("showText!");
  }

  //テキストの保存
  function saveText(){

    //ローカルストレージからJSON形式→配列で取得
    todolist_h = JSON.parse(localStorage.getItem(APP_NAME));

    //現在時刻を取得
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var day = now.getDate();
    var week = now.getDay();

    var weekName = ["日","月","火","水","木","金"];//曜日名配列

    if(todolist_h == null){
      todolist_h = [];
    }

    var text = $("#formText");//フォームからテキスト取得
  

    var val = [text.val(),false,year,month,day,weekName[week]];

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
      alert("Todoが入力されていません");
      return false;
    }else if(20 < text.length){
      alert("文字数は20文字以下にしてください");
      return false;
    }

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
