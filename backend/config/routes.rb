Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  resources :answers_surveys, only: %i[create]
  resources :surveys, only: %i[index]
  resources :questions, only: %i[show]

  namespace :admin do
    resources :users
    resources :roles
    resources :survey_subjects
    resources :surveys
    resources :question_types
    resources :questions
    resources :options

    root to: "users#index"
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: %i[index create]
      resources :surveys, only: %i[index show]
      resources :roles, only: %i[index]
      resources :answers_surveys, only: %i[create show]
      resources :answers, only: %i[create]
    end
  end

  get '/jwt_example', to: 'jwt_example#index'
  get '/', to: 'admin/users#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
   # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
