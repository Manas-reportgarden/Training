require 'rails_helper'

RSpec.describe ItemsController, type: :controller do
  context 'Testing Item controller' do

    it 'Render show view' do
      get :show, id: Item.create!( 'name': 'Bat', 'price': 130.0 )
      expect(response).to render_template('show')
    end

    it 'should pass params to customers' do
      post :create, :item => {'name': 'Bat', 'price': 130.0}
      assigns[:item].name.should == 'Bat'
      assigns[:item].price.should == 130.0
    end

    it 'Creates an instance of item' do
      expect{
        post :create, :item => {'name': 'Bat', 'price': 130.0}
      }.to change(Item, :count).by(1)
    end

    it 'checks http success response and code for #index' do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it 'destroys item' do
      item = Item.create!('name': 'Bat', 'price': 130.0)
      expect {
        delete :destroy, id: item.id
      }.to change(Item, :count).by(-1)
    end

  end
end
