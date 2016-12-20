class StudentInfo.Routers.Colleges extends Backbone.Router
  routes:
    "collegeInfo/colleges": 'collegeIndex'

  initialize: ->
    @collection = new StudentInfo.Collections.Colleges()
    @collection.fetch({reset:true})

  collegeIndex: ->
    view =  new StudentInfo.Views.CollegesIndex(collection: @collection)
    $('#collegeInfo').html(view.render().el)
