
Rails.application.routes.draw do
  root to: 'posts#index'
# get 'posts/new', to: 'posts#new' ←削除
  post 'posts', to: 'posts#create'
  # get 'posts', to: 'posts#checked'# queryパラメーター
  get 'posts/:id', to: 'posts#checked'# pathパラメーター
end




# Rails.application.routes.draw do
#   get 'posts', to: 'posts#index'
#   get 'posts/new', to: 'posts#new'
#   post 'posts', to: 'posts#create'
# end
