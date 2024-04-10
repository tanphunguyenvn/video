Rails.application.routes.draw do
  post '/sign-up', to: 'users#create'
  post '/sign-in', to: 'users#login'

  resources :shares, only: [:create, :index, :show]
end
