class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
    # @posts = Post.all  # 1番目のレコードを@postに代入
  end

  # def new
  # 

  def create
    post = Post.create(content: params[:content], checked: false)
    # 既読や未読の情報を追加したため「メモ作成時に未読の情報を保存するようにしたこと」
    render json:{ post: post } # Ajaxを実現するため「レスポンスをJSONに変更したこと」
    
    # Post.create(content: params[:content])
    # redirect_to action: :index# メモを保存した後にトップページへリダイレクトされる
  end

  def checked
    # binding.pry
    post = Post.find(params[:id])
    if post.checked # 既読であるか否かを判定するプロパティを指定
      post.update(checked: false) 
    else
      post.update(checked: true)
    end
    # 「update 更新」のActiveRecord
    item = Post.find(params[:id]) # if の処理の結果db内に、falseか trueになって入ってる情報を持ってきてる
    render json: { post: item }
    # ルーティングでリクエストしてきたjsファイルにrender json: で選択しなくても自動で返される
  end

end
