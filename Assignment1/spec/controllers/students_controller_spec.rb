require 'rails_helper'

RSpec.describe StudentsController, type: :controller do
  context 'Testing student controller' do

    it 'Render show view' do
      colg = College.create!('name': 'HIIT', 'established_year': 1999)
      get :show, id: Student.create!('student_id': 5, 'department': 'a1', 'maths': 85, 'physics': 65, 'chemistry': 92, 'year': 2016, 'college_id': colg.id)
      expect(response).to render_template('show')
    end

    it 'should pass params to student' do
      colg = College.create!('name': 'HIIT', 'established_year': 1999)
      post :create, :student => {'student_id': 5, 'department': 'a1', 'maths': 85, 'physics': 65, 'chemistry': 92, 'year': 2016, 'college_id': colg.id}
      assigns[:student].student_id.should == 5
      assigns[:student].maths.should == 85
      assigns[:student].physics.should == 65
      assigns[:student].chemistry.should == 92
      assigns[:student].year.should == 2016
      assigns[:student].college_id.should == colg.id
    end

    it 'Creates an instance of the college' do
      colg = College.create!('name': 'HIIT', 'established_year': 1999)
      expect{

        post :create, :student => {'student_id': 5, 'department': 'a1', 'maths': 85, 'physics': 65, 'chemistry': 92, 'year': 2016, 'college_id': colg.id}
      }.to change(Student, :count).by(1)
    end

    it 'checks http success response and code for #index' do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it 'destroys student' do
      colg = College.create!('name': 'HIIT', 'established_year': 1999)
      stu  = Student.create!('student_id': 5, 'department': 'a1', 'maths': 85, 'physics': 65, 'chemistry': 92, 'year': 2016, 'college_id': colg.id)
      expect {
        delete :destroy, id: stu.id
      }.to change(Student, :count).by(-1)
    end

  end
end
