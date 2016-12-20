window.StudentInfo =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  initialize: ->
    new StudentInfo.Routers.Students
    new StudentInfo.Routers.Colleges
    Backbone.history.start({pushState: true})

$(document).ready ->
  StudentInfo.initialize()
