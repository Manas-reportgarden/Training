require 'rails_helper'

RSpec.describe CollegesController, type: :controller do
  context 'Testing college controller' do

    it "Render show view" do
      get :show, id: College.create!('name': 'HIIT', 'established_year': 1999)
      expect(response).to render_template('show')
    end

    it 'should pass params to college' do
      post :create, :college => {'name': 'HIIT', 'established_year': 1999}
      assigns[:college].name.should == "HIIT"
      assigns[:college].established_year.should == 1999
    end

    it 'Creates an instance of the college' do
      expect{
        post :create, :college => {'name': 'HIIT', 'established_year': 1999}
      }.to change(College, :count).by(1)
    end

    it 'checks http success response and code' do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it 'destroys college' do
      colg = College.create!('name': 'HIIT', 'established_year': 1999)
      expect {
        delete :destroy, id: colg.id
      }.to change(College, :count).by(-1)
    end

  end
end
