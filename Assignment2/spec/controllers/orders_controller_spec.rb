require 'rails_helper'

RSpec.describe OrdersController, type: :controller do
  context 'Testing order controller' do

    it 'Render show view' do
      customer = Customer.create!('name': 'Raju', 'email': 'abc@gmail.com', 'city': 'Hyderabad', 'pincode': 500072)
      item = Item.create!('name': 'Bat', 'price': 130.0)
      get :show, id: Order.create!( 'customer_id': customer.id, 'item_id': item.id )
      expect(response).to render_template('show')
    end

    it 'should pass params to orders' do
      customer = Customer.create!('name': 'Raju', 'email': 'abc@gmail.com', 'city': 'Hyderabad', 'pincode': 500072)
      item = Item.create!('name': 'Bat', 'price': 130.0)
      post :create, :order => {'customer_id': customer.id, 'item_id': item.id }
      assigns[:order].customer_id.should == customer.id
      assigns[:order].item_id.should == item.id
    end

    it 'Creates an instance of order' do
      customer = Customer.create!('name': 'Raju', 'email': 'abc@gmail.com', 'city': 'Hyderabad', 'pincode': 500072)
      item = Item.create!('name': 'Bat', 'price': 130.0)
      expect{
        post :create, :order => {'customer_id': customer.id, 'item_id': item.id }
      }.to change(Order, :count).by(1)
    end

    it 'checks http success response and code for #index' do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it 'destroys order' do
      customer = Customer.create!('name': 'Raju', 'email': 'abc@gmail.com', 'city': 'Hyderabad', 'pincode': 500072)
      item = Item.create!('name': 'Bat', 'price': 130.0)
      order = Order.create!( 'customer_id': customer.id, 'item_id': item.id )
      expect {
        delete :destroy, id: order.id
      }.to change(Order, :count).by(-1)
    end

  end
end
