Rails.application.routes.draw do
  resources :oscillators do
    collection do
      post 'tune'
    end
  end

  root 'oscillators#index'
end
