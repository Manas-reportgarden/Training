require 'rails_helper'

RSpec.describe CustomersController, type: :controller do
  context 'Testing customer controller' do

    it 'Render show view' do
      get :show, id: Customer.create!('name': 'Raju', 'email': 'abc@gmail.com', 'city': 'Hyderabad', 'pincode': 500072)
      expect(response).to render_template('show')
    end

    it 'should pass params to customers' do
      post :create, :customer => {'name': 'Raju', 'email': 'abc@gmail.com', 'city': 'Hyderabad', 'pincode': 500072}
      assigns[:customer].name.should == 'Raju'
      assigns[:customer].email.should == 'abc@gmail.com'
      assigns[:customer].city.should == 'Hyderabad'
      assigns[:customer].pincode.should == 500072
    end

    it 'Creates an instance of customer' do
      expect{
        post :create, :customer => {'name': 'Raju', 'email': 'abc@gmail.com', 'city': 'Hyderabad', 'pincode': 500072}
      }.to change(Customer, :count).by(1)
    end

    it 'checks http success response and code for #index' do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it 'destroys customer' do
      customer = Customer.create!('name': 'Raju', 'email': 'abc@gmail.com', 'city': 'Hyderabad', 'pincode': 500072)
      expect {
        delete :destroy, id: customer.id
      }.to change(Customer, :count).by(-1)
    end

  end
end
