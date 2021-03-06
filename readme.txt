チームラボ　オンラインスキルアップ Node.js

STEP 1 : Todo リスト (フロントエンド)

#制作環境:
 言語:　HTML　CSS javascript(jQuery)　
 文字コード: UTF-8
 開発環境:atom
 動作確認:Google Chrome,Safari(input dateフォームの入力が異なる)


#仕様:
  ・投稿はチェックと内容からなる
  ・投稿データはローカルストレージに保存する
  ・新しい投稿ほど上に保存される
  ・HTMLタグが入力された場合はエスケープする


#ファイル内容:

index.html
TodoリストのアプリケーションのHTML

src/ todo.css
      Todoリストアプリのスタイルシート
     todo.js
      Todoリストアプリ用のjavascriptファイル

readme.text
      これ、Todoリストアプリケーションの詳細を書き記す

delds.sh
      git commit の際に　mac特有の.DSstore　を削除するシェルスクリプト


#使い方(基本仕様の説明):
  Todoリストの追加は下のフォームで行う。テキストボックスでTodoの名前、dateフォームで締め切り日時の指定を設定し、
  追加ボタンを押すと上のTodoリストエリアに追加されていきます。新しく追加されたものは上に積まれていきます。

  Todoが完了すれば、左のチェックボックスにチェックを入れてチェック状態にする。チェック状態になったTodoを削除する際は
  上の「Todoを完了する」ボタンを押し、削除されます。

  Todoの内容、締め切り日時、追加日時、チェック状態はブラウザのlocalStorageに保存され、ロード時に読み込まれ、再描画しています。

 #追加機能の説明:
  ステータスバー:
  ページの上部にあるプログレスバーで現在の全体のTodoの進捗状態が見れます。また忙しい度が、わかります。

  メモパッド:
  Todoの一つ一つにはメモパッドがついています。Todoを進めるにあたっての進捗状態や、覚えておくことなどをメモできます。
  また、「保存」ボタンを押すことで、localStorageに内容が保存され、ロード時に読み込まれ、表示されます。

  日時指定:
  Todoを登録する際に、日時を指定して、締め切り日時を常に見ることができます。

#デザインコンセプト:
  このTodoリストアプリケーションは学校の「黒板」をイメージして作成しました。自分のブラウザに一人一つ「黒板」を持ってみるのも、
  面白いのではないかと思いで、チョークの色をイメージしたテキストの色、手書き感にこだわりました。


#作成して見て:
  localStorageを用いた保存形式が理解できて、Todoリスト以外にも応用して何か作れそうだと感じた。
  ログイン情報等ユーザーの情報を保存しておくなどに使えそう。
  リアルタイムにlocalStorageの情報を書き換えて、描画する処理を書くのに手間がかかりました。
  Step1ではフロントエンドのTodoということで、ユーザーそれぞれのブラウザで機能するのに適したものを作るように心がけたが、
  Step2に進むことができたら、これまであまり勉強してこなかったサーバーサイドに触れることができるので機能の幅が広がりそうなので
  頑張りたいです。
