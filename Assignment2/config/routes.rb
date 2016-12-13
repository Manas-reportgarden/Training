Rails.application.routes.draw do
  resources :orders
  resources :items
  resources :customers

  root 'orders#new'
  get '/customer_orders/:customer_id', to: 'orders#customer_orders', as: "customer_order"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
