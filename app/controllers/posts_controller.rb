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
    post = Post.find(params[:id])
    if post.checked # 既読であるか否かを判定するプロパティを指定
      post.update(checked: false) # 「update 更新」のActiveRecord
    else
      post.update(checked: true)
    end
    # 「update 更新」のActiveRecord
    item = Post.find(params[:id])
    render json: { post: item }
  end

end
