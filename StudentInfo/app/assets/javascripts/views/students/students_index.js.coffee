class StudentInfo.Views.StudentsIndex extends Backbone.View

  template: JST['students/index']

  initialize: ->
    @collection.on('reset', @render, this)

  render: ->
    $(@el).html(@template(students: @collection))
    this
