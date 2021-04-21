Rails.application.routes.draw do
  resources :questions, only: [:create]
  resources :users, only: [:create]

  namespace :admin do
    resources :users
    resources :questions
    resources :question_types
    resources :surveys

    root to: "users#index"
  end

  get '/jwt_example', to: 'jwt_example#index'
  get '/', to: 'admin/users#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
   # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
