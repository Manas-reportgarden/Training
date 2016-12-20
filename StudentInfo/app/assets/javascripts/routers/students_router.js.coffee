class StudentInfo.Routers.Students extends Backbone.Router
  routes:
    'studentInfo/students': 'studentIndex'


  studentIndex: ->
    @collection = new StudentInfo.Collections.Students()
    @collection.fetch({reset:true})
    view = new StudentInfo.Views.StudentsIndex(collection: @collection)
    $('#studentInfo').html(view.render().el)
