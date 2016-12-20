Rails.application.routes.draw do

  scope "collegeInfo" do
    resources :colleges
  end

  scope "studentInfo" do
    resources :students
  end

  root 'students#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
