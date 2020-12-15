class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
    # @posts = Post.all  # 1番目のレコードを@postに代入
  end

  # def new
  # end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index# メモを保存した後にトップページへリダイレクトされる
  end

  
  def checked
    # 設定したURLパラメーターから、既読したメモのidが渡されるように設定するので、
    # そのidを使用して該当するレコードを取得
    post = Post.find(params[:id])
    if post.checked # post.checkedという既読であるか否かを判定
      post.update(checked: false)# 既読であれば「既読を解除するためにfalseへ変更」
    else
      post.update(checked: true)# 既読でなければ「既読にするためtrueへ変更」
    end# update=更新 というActive record

    item = Post.find(params[:id])
    render json: { post: item }
    # ルーティングにリクエストを送ってきたjsファイルに勝手に送ってくれる
  end
end


