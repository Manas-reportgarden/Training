class StudentInfo.Views.CollegesIndex extends Backbone.View

  template: JST['colleges/index']

  initialize: ->
    @collection.on('reset', @render, this)

  render: ->
    $(@el).html(@template(colleges: @collection))
    this
