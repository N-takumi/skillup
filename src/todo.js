function todolist(){

  var APP_NAME = "Todolist_APP";//アプリ名
  var APP_VERSION = 0.1;//バージョン

  var todolist_h = [];//todo保存用　配列

  function init(){

    //ローカルストレージ内のTodoを読み込む
    showText();

    //


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

      if(todolist_h.length == 0 || todolist_h == null){
        alert("現在Todoは保存されていません");
      }else if(window.confirm("保存されているTodo"+todolist_h.length+"つを全て削除しますか?")){
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

    //メモ保存ボタンクリック時の状態保存
    $(document).on('click','.memoSave',function(){
      console.log("hello");
      var id = (this.id);

      console.log(id);

      var str = $("#Amemo"+id).val();
      todolist_h[this.id][4] = str;

      console.log(str);

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

            var year = todolist_h[i][2][0];//追加年
            var month = todolist_h[i][2][1];//月
            var day = todolist_h[i][2][2];//日

            var liyear = todolist_h[i][3][0];//指定年
            var limonth = todolist_h[i][3][1];//月
            var liday = todolist_h[i][3][2];//日

            if(todolist_h[i][1]){
              className = "todo_checked";//チェック時の初期化
            }

            //表示する前にエスケープ
            html.push($('<li  class = '+className+'>').html("<div id = 'todoText'><input class='CheckBox' id ="+i+" type='checkbox'/>"+"<span id ='todo_title'>"+" "+escapeText(value)+"</span>"
                     +("<span id='time'><span id = 'limit_time'>締切日時:"+liyear+"年  "+limonth
                     +"月"+liday+"日"+"</span></br><span id = 'todo_time'> 追加日時:"+year+"年 "+month+"月"+day
                     +"日"+"</span></span></div><span id = 'memo'><span class ='memoForm'>メモ ▽ <input "
                     +" id = "+i+" class='memoSave' type='submit'  value = '保存'/></br><span id='memoPad'>"
                     +"<textarea id = "+"Amemo"+i+"></textarea></span></span></br>"
                     +"</span>")));
          }
        }
        list.append(html);

        for(var i = 0;i < todolist_h.length;i++){
          isCheck = todolist_h[i][1];//チェックボックスの状態を格納
          memo = todolist_h[i][4];//メモの状態を格納
          if(isCheck == true)checkCount++;
          $("#"+i).prop('checked',isCheck);
          $("#Amemo"+i).prop('value',memo);
        }

      }else{
        todolist_h = [];
      }

      var busyStr  = "";

      //Todoが一つもない時、メッセージを表示
      if(todolist_h.length == 0){
        $("#enptyStr").css({
          "display":"block"
        });
        busyStr = "忙がしくない";
      }

      if(0 < todolist_h.length && todolist_h.length < 5){
        busyStr = "ちょっと忙しい";
      }else if(5 < todolist_h.length && todolist_h.length < 10){
        busyStr = "割と忙しい";
      }else if(11 < todolist_h.length && todolist_h.length < 15){
        busyStr = "忙しい!!";
      }else if(15 < todolist_h.length && todolist_h.length < 20){
        busyStr = "めっちゃ忙しい!!";
      }else if(20 < todolist_h.length && todolist_h.length < 30){
        busyStr = "めちゃくちゃ忙しい!!";
      }


      $("#compTodo_text").html("残りTodo数:　<span id = 'checkCount'>"+checkCount+"/"+todolist_h.length+
      "</span>"+"      忙しい度:<span id = 'busyStr'>"+busyStr+"</span>");//Todo数/忙しい度更新
      $("progress").attr('value',(checkCount/todolist_h.length)*100);//プログレスバー更新

      console.log("showText!");
  }

  //テキストの保存
  function saveText(){

    //ローカルストレージからJSON形式→配列で取得
    todolist_h = JSON.parse(localStorage.getItem(APP_NAME));

    if(todolist_h == null){//存在しない場合は作成する
      todolist_h = [];
    }

    //現在時刻を取得
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var day = now.getDate();
    var week = now.getDay();


    var nowDate = [year,month,day];//現在時刻を一つの配列にまとめる

    var text = $("#formText");//フォームからテキスト取得
    var limitDate = $("#formLimit").val().split("-");//指定日時取得(yyyy-mmmm-ddddから配列に変換)

    var val = [text.val(),false,nowDate,limitDate," "];//localStorageに入れる形で格納

    //入力チェックを行う
    if(checkData(val[0],nowDate,limitDate)){
      //通ればセット
      todolist_h.push(val);
      localStorage.setItem(APP_NAME,JSON.stringify(todolist_h));
      //テキストボックスをからにする
      text.val("");
    }

  }

  //Todoのクリア
  function clearText(){
    todolist_h = [];//空配列で初期化
    localStorage.setItem(APP_NAME,JSON.stringify(todolist_h));
  }


  //入力されたテキスト・指定日時をエラーチェック
  function checkData(text,nowDate,limitDate){

    //文字数チェック
    if(0 == text.length){
      alert("Todoが入力されていません");
      return false;
    }else if(15 < text.length){
      alert("文字数は15文字以下にしてください");
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

    //指定日時チェック(追加日時より前の日時を選択していないか)
    if(limitDate[0] == undefined || limitDate[1] == undefined){
        alert("指定日時が入力されていません");
          return false;
      }else if((limitDate[0] < nowDate[0]) || (limitDate[0] == nowDate[0] && limitDate[1] < nowDate[1]) ||
        (limitDate[0] == nowDate[0] && limitDate[1] == nowDate[1] && limitDate[2] < nowDate[2])){
        alert("指定日時が既に過ぎています");
        return false;
      }else if((limitDate[0]==nowDate[0] && limitDate[1]==nowDate[1] && limitDate[2] == nowDate[2])){
        if(window.confirm("指定日時が今日ですが登録しますか?")){
          return true;
        }else{
          return false;
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
