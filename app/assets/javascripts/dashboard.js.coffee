# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$ ->
  id = 0
  $(document).on "click", ".open-EditRoleDialog", ->
    userId = $(this).data("id")
    id = userId
    $(".modal-body #userId").val userId

    console.log("loading with ID = " + userId);
    $.ajax
      type: "POST"
      dataType: "json"
      data: id: userId
      url: "http://localhost:3000/dashboard/roleCheck"
      success: (data) ->
        console.log(data)
        $("#chkAdmin").prop "checked", false
        $("#chkManager").prop "checked", false
        $("#chkStaff").prop "checked", false

        if data.length isnt 0
          i = 0
          while i < data.length
            if data[i].name is "admin"
              $("#chkAdmin").prop "checked", true
            if data[i].name is "field_manager"
              $("#chkManager").prop "checked", true
            if data[i].name is "field_staff"
              $("#chkStaff").prop "checked", true
            i++
        return

    return

  $(document).on "click", "#saveRoles", ->
    checkedValueAdmin = $("#chkAdmin").is(':checked')
    checkedValueManager = $("#chkManager").is(':checked')
    checkedValueStaff = $("#chkStaff").is(':checked')
    console.log("sending with id = " + id)
    console.log([
          checkedValueAdmin
          checkedValueManager
          checkedValueStaff
        ])

    $.ajax
      type: "POST"
      dataType: "json"
      data:
        id: id
        roles: [
          checkedValueAdmin
          checkedValueManager
          checkedValueStaff
        ]
      url: "http://localhost:3000/dashboard/roleAdd"
      success: (data) ->
        console.log(data)
        return






