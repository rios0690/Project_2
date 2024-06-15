$(window).on('load', function () {
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function () {
      $(this).remove();
    });
  }
});
$(document).ready(function () {
  populateList();

});
var currentfilterDepartmentSelect;
var currentfilterLocationSelect;
var currentfilterDepartment;
$("#searchInp").on("keyup", function () {
  var txt = $("#searchInp").val();
  $("#personnelTableBody").empty();
  $("#departmentTableBody").empty();
  $("#locationTableBody").empty();
  var tableBody = $("#personnelTableBody");
  var departmentTableBody = $("#departmentTableBody");
  var locationTableBody = $("#locationTableBody");
  if ($("#personnelBtn").hasClass("active")) {
    $.ajax({
      url: "libs/php/searchAll.php",
      type: "POST",
      dataType: "json",
      data: { txt },
      success: function (result) {

        var resultCode = result.status.code;

        if (resultCode == 200) {
          var frag = document.createDocumentFragment();

          result.data.found.forEach(function (result, index) {
            var name = result.lastName + ", " + result.firstName;
            var department = result.departmentName;
            var email = result.email;
            var id = result.id;
            var location = result.locationName;
            var departmentID = result.departmentID;
            var locationID = result.locationID;

            var row = document.createElement("tr");
            row.setAttribute("data-department-id", departmentID);
            row.setAttribute("data-location-id", locationID);

            var firstCell = document.createElement("td");
            firstCell.classList = "align-middle text-nowrap";

            var firstCellText = document.createTextNode(name);
            firstCell.append(firstCellText);

            row.append(firstCell);

            var secondCell = document.createElement("td");
            secondCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
            var secondCellText = document.createTextNode(department);
            secondCell.append(secondCellText);

            row.append(secondCell);

            var thirdCell = document.createElement("td");
            thirdCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
            var thirdCellText = document.createTextNode(location);
            thirdCell.append(thirdCellText);

            row.append(thirdCell);

            var fourthCell = document.createElement("td");
            fourthCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
            var fourthCellText = document.createTextNode(email);
            fourthCell.append(fourthCellText);

            row.append(fourthCell);



            var buttonsCell = document.createElement("td");
            buttonsCell.classList = "text-end text-nowrap";
            var editButton = document.createElement("button");
            editButton.classList = "btn btn-primary btn-sm me-2";
            editButton.setAttribute("type", "button");
            editButton.setAttribute("data-bs-toggle", "modal");
            editButton.setAttribute("data-bs-target", "#editPersonnelModal");
            editButton.setAttribute("data-id", id);
            editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';

            var deleteButton = document.createElement("button")
            deleteButton.classList = "btn btn-primary btn-sm me-2";
            deleteButton.setAttribute("type", "button");
            deleteButton.setAttribute("data-bs-toggle", "modal");
            deleteButton.setAttribute("data-bs-target", "#deletePersonnelModal");
            deleteButton.setAttribute("data-id", id);
            deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';

            buttonsCell.append(editButton, deleteButton);
            row.append(buttonsCell);
            frag.append(row);

          });

          tableBody.append(frag);
          

        }
      }
    })
  } else if ($("#departmentsBtn").hasClass("active")) {
    $.ajax({
      url: "libs/php/searchDepartments.php",
      type: "POST",
      dataType: "json",
      data: { txt },
      success: function (result) {

        var resultCode = result.status.code;

        console.log(resultCode);

        if (resultCode == 200) {
          var frag = document.createDocumentFragment();

          result.data.found.forEach(function (result, index) {
            var name = result.name;
            var id = result.id;
            var location = result.location;
            var locationID = result.locationID;

            var row = document.createElement("tr");
            row.setAttribute("data-location-id", locationID);

            var firstCell = document.createElement("td");
            firstCell.classList = "align-middle text-nowrap";

            var firstCellText = document.createTextNode(name);
            firstCell.append(firstCellText);

            row.append(firstCell);

            var secondCell = document.createElement("td");
            secondCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
            var secondCellText = document.createTextNode(location);
            secondCell.append(secondCellText);

            row.append(secondCell);

            var buttonsCell = document.createElement("td");
            buttonsCell.classList = "text-end text-nowrap";
            var editButton = document.createElement("button");
            editButton.classList = "btn btn-primary btn-sm me-2";
            editButton.setAttribute("type", "button");
            editButton.setAttribute("data-bs-toggle", "modal");
            editButton.setAttribute("data-bs-target", "#editDepartmentModal");
            editButton.setAttribute("data-id", id);
            editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';

            var deleteButton = document.createElement("button")
            deleteButton.classList = "btn btn-primary btn-sm me-2";
            deleteButton.setAttribute("type", "button");
            deleteButton.setAttribute("data-bs-toggle", "modal");
            deleteButton.setAttribute("data-bs-target", "#deleteDepartmentModal");
            deleteButton.setAttribute("data-id", id);
            deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';

            buttonsCell.append(editButton, deleteButton);
            row.append(buttonsCell);
            frag.append(row);

            

          });

          departmentTableBody.append(frag);
          

        }
      }
    })

  } else if ($("#locationsBtn").hasClass("active")) {

    $.ajax({
      url: "libs/php/searchLocations.php",
      type: "POST",
      dataType: "json",
      data: { txt },
      success: function (result) {

        var resultCode = result.status.code;

        console.log(resultCode);

        if (resultCode == 200) {
          var frag = document.createDocumentFragment();

          result.data.found.forEach(function (result, index) {
            var name = result.name;
            var id = result.id;

            var row = document.createElement("tr");

            var firstCell = document.createElement("td");
            firstCell.classList = "align-middle text-nowrap";

            var firstCellText = document.createTextNode(name);
            firstCell.append(firstCellText);

            row.append(firstCell);


            var buttonsCell = document.createElement("td");
            buttonsCell.classList = "text-end text-nowrap";
            var editButton = document.createElement("button");
            editButton.classList = "btn btn-primary btn-sm me-2";
            editButton.setAttribute("type", "button");
            editButton.setAttribute("data-bs-toggle", "modal");
            editButton.setAttribute("data-bs-target", "#editLocationModal");
            editButton.setAttribute("data-id", id);
            editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';

            var deleteButton = document.createElement("button")
            deleteButton.classList = "btn btn-primary btn-sm me-2";
            deleteButton.setAttribute("type", "button");
            deleteButton.setAttribute("data-bs-toggle", "modal");
            deleteButton.setAttribute("data-bs-target", "#deleteLocationModal");
            deleteButton.setAttribute("data-id", id);
            deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';

            buttonsCell.append(editButton, deleteButton);
            row.append(buttonsCell);
            frag.append(row);

            

          });

          locationTableBody.append(frag);

          
          
        }
      }
    })

  }
})

$("#refreshBtn").click(function () {

  if ($("#personnelBtn").hasClass("active")) {

    populateList();
    currentfilterDepartmentSelect = '';
    currentfilterLocationSelect = '';

  } else {

    if ($("#departmentsBtn").hasClass("active")) {

      populateDepartments();
      currentfilterDepartment = '';

    } else {

      populateLocations();

    }

  }

});

$("#filterBtn").click(function () {

  if ($("#personnelBtn").hasClass("active")) {
    $("#filterPersonnelModal").modal("show");
    $("#selectPersonnelDepartment").empty();
    $("#selectPersonnelLocation").empty();

    //Populate Departments

    $("#selectPersonnelDepartment").append($('<option>', {
      text: 'All',
      value: ''
    }));
    $.ajax({
      url:
        "libs/php/getAllDepartments.php",
      type: "POST",
      dataType: "json",
      success: function (result) {
        var resultCode = result.status.code;

        if (resultCode == 200) {
          console.log(result.data);
          $.each(result.data, function () {
            $("#selectPersonnelDepartment").append(
              $("<option>", {
                value: this.id,
                text: this.name
              })
            );
          });
          $("#selectPersonnelDepartment").val(currentfilterDepartmentSelect);
        }
      }
    });
    //Populate Locations
    $("#selectPersonnelLocation").append($('<option>', {
      text: 'All',
      value: ''
    }));

    $.ajax({
      url:
        "libs/php/getAllLocations.php",
      type: "POST",
      dataType: "json",
      success: function (result) {
        var resultCode = result.status.code;

        if (resultCode == 200) {
          console.log(result.data);
          $.each(result.data, function () {
            $("#selectPersonnelLocation").append(
              $("<option>", {
                value: this.id,
                text: this.name
              })

            );
          });
          $("#selectPersonnelLocation").val(currentfilterLocationSelect);

        }
      }
    });



  } else {

    if ($("#departmentsBtn").hasClass("active")) {
      $("#filterDepartmentModal").modal("show");
      $("#selectDepartmentLocation").empty;
      $("#selectDepartmentLocation").append($('<option>', {
        text: 'All',
        value: ''
      }));

      $.ajax({
        url:
          "libs/php/getAllLocations.php",
        type: "POST",
        dataType: "json",
        success: function (result) {
          var resultCode = result.status.code;

          if (resultCode == 200) {
            console.log(result.data);
            $.each(result.data, function () {
              $("#selectDepartmentLocation").append(
                $("<option>", {
                  value: this.id,
                  text: this.name
                })
              );
            });
            $("#selectDepartmentLocation").val(currentfilterDepartment)
          }
        }
      });



    }
  }

});
//Filter Personnel by departments
$("#selectPersonnelDepartment").change(function () {

  if (this.value > 0) {
    $("#selectPersonnelLocation").val('');


    $("#personnelTableBody").empty();
    $("#selectPersonnelDepartment").empty;



    var txt = $("#selectPersonnelDepartment").find(":selected").text();
    var tableBody = $("#personnelTableBody");
    currentfilterDepartmentSelect = $('#selectPersonnelDepartment').val();

    $.ajax({
      url: "libs/php/searchAll.php",
      type: "POST",
      dataType: "json",
      data: { txt },
      success: function (result) {
       
        var resultCode = result.status.code;

        if (resultCode == 200) {
          var frag = document.createDocumentFragment();

          result.data.found.forEach(function (result, index) {
            var name = result.lastName + ", " + result.firstName;
            var department = result.departmentName;
            var email = result.email;
            var id = result.id;
            var location = result.locationName;
            var departmentID = result.departmentID;
            var locationID = result.locationID;

            var row = document.createElement("tr");
            row.setAttribute("data-department-id", departmentID);
            row.setAttribute("data-location-id", locationID);

            var firstCell = document.createElement("td");
            firstCell.classList = "align-middle text-nowrap";

            var firstCellText = document.createTextNode(name);
            firstCell.append(firstCellText);

            row.append(firstCell);

            var secondCell = document.createElement("td");
            secondCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
            var secondCellText = document.createTextNode(department);
            secondCell.append(secondCellText);

            row.append(secondCell);

            var thirdCell = document.createElement("td");
            thirdCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
            var thirdCellText = document.createTextNode(location);
            thirdCell.append(thirdCellText);

            row.append(thirdCell);

            var fourthCell = document.createElement("td");
            fourthCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
            var fourthCellText = document.createTextNode(email);
            fourthCell.append(fourthCellText);

            row.append(fourthCell);



            var buttonsCell = document.createElement("td");
            buttonsCell.classList = "text-end text-nowrap";
            var editButton = document.createElement("button");
            editButton.classList = "btn btn-primary btn-sm me-2";
            editButton.setAttribute("type", "button");
            editButton.setAttribute("data-bs-toggle", "modal");
            editButton.setAttribute("data-bs-target", "#editPersonnelModal");
            editButton.setAttribute("data-id", id);
            editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';

            var deleteButton = document.createElement("button")
            deleteButton.classList = "btn btn-primary btn-sm me-2";
            deleteButton.setAttribute("type", "button");
            deleteButton.setAttribute("data-bs-toggle", "modal");
            deleteButton.setAttribute("data-bs-target", "#deletePersonnelModal");
            deleteButton.setAttribute("data-id", id);
            deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';

            buttonsCell.append(editButton, deleteButton);
            row.append(buttonsCell);
            frag.append(row);
            

          });

          tableBody.append(frag);

         
          
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

        console.log("AJAX request failed: " + textStatus, 'error');
      }

    })

  }
})
//Filter Personnel by Location
$("#selectPersonnelLocation").change(function () {

  if (this.value > 0) {
    $("#selectPersonnelDepartment").val('');

    $("#personnelTableBody").empty();
    $("#selectPersonnelLocation").empty;
    var txt = $("#selectPersonnelLocation").find(":selected").text();
    var tableBody = $("#personnelTableBody");
    currentfilterLocationSelect = $('#selectPersonnelLocation').val();



    $.ajax({
      url: "libs/php/searchAll.php",
      type: "POST",
      dataType: "json",
      data: { txt },
      success: function (result) {

        var resultCode = result.status.code;

        if (resultCode == 200) {
          var frag = document.createDocumentFragment();

          result.data.found.forEach(function (result, index) {
            var name = result.lastName + ", " + result.firstName;
            var department = result.departmentName;
            var email = result.email;
            var id = result.id;
            var location = result.locationName;
            var departmentID = result.departmentID;
            var locationID = result.locationID;

            var row = document.createElement("tr");
            row.setAttribute("data-department-id", departmentID);
            row.setAttribute("data-location-id", locationID);

            var firstCell = document.createElement("td");
            firstCell.classList = "align-middle text-nowrap";

            var firstCellText = document.createTextNode(name);
            firstCell.append(firstCellText);

            row.append(firstCell);

            var secondCell = document.createElement("td");
            secondCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
            var secondCellText = document.createTextNode(department);
            secondCell.append(secondCellText);

            row.append(secondCell);

            var thirdCell = document.createElement("td");
            thirdCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
            var thirdCellText = document.createTextNode(location);
            thirdCell.append(thirdCellText);

            row.append(thirdCell);

            var fourthCell = document.createElement("td");
            fourthCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
            var fourthCellText = document.createTextNode(email);
            fourthCell.append(fourthCellText);

            row.append(fourthCell);



            var buttonsCell = document.createElement("td");
            buttonsCell.classList = "text-end text-nowrap";
            var editButton = document.createElement("button");
            editButton.classList = "btn btn-primary btn-sm me-2";
            editButton.setAttribute("type", "button");
            editButton.setAttribute("data-bs-toggle", "modal");
            editButton.setAttribute("data-bs-target", "#editPersonnelModal");
            editButton.setAttribute("data-id", id);
            editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';

            var deleteButton = document.createElement("button")
            deleteButton.classList = "btn btn-primary btn-sm me-2";
            deleteButton.setAttribute("type", "button");
            deleteButton.setAttribute("data-bs-toggle", "modal");
            deleteButton.setAttribute("data-bs-target", "#deletePersonnelModal");
            deleteButton.setAttribute("data-id", id);
            deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';

            buttonsCell.append(editButton, deleteButton);
            row.append(buttonsCell);
            frag.append(row);

          });

          tableBody.append(frag);

         
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

        console.log("AJAX request failed: " + textStatus, 'error');
      }

    })



  }
})
//Filter Departments by Location
$("#selectDepartmentLocation").change(function () {
  $("#departmentTableBody").empty();
  var txt = $("#selectDepartmentLocation").find(":selected").text();
  var tableBody = $("#departmentTableBody");
  currentfilterDepartment = $("#selectDepartmentLocation").val();
  $.ajax({
    url:
      "libs/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        
        var frag = document.createDocumentFragment();

       $.each(result.data, function (index) {
          if (txt == result.data[index].location) {
            var name = result.data[index].name;
            var id = result.data[index].id;
            var location = result.data[index].location;
            var locationID = result.data[index].locationID;

            var row = document.createElement("tr");
            row.setAttribute("data-location-id", locationID);

            var firstCell = document.createElement("td");
            firstCell.classList = "align-middle text-nowrap";

            var firstCellText = document.createTextNode(name);
            firstCell.append(firstCellText);

            row.append(firstCell);

            var secondCell = document.createElement("td");
            secondCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
            var secondCellText = document.createTextNode(location);
            secondCell.append(secondCellText);

            row.append(secondCell);

            var buttonsCell = document.createElement("td");
            buttonsCell.classList = "text-end text-nowrap";
            var editButton = document.createElement("button");
            editButton.classList = "btn btn-primary btn-sm me-2";
            editButton.setAttribute("type", "button");
            editButton.setAttribute("data-bs-toggle", "modal");
            editButton.setAttribute("data-bs-target", "#editDepartmentModal");
            editButton.setAttribute("data-id", id);
            editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';

            var deleteButton = document.createElement("button")
            deleteButton.classList = "btn btn-primary btn-sm me-2";
            deleteButton.setAttribute("type", "button");
            deleteButton.setAttribute("data-bs-toggle", "modal");
            deleteButton.setAttribute("data-bs-target", "#deleteDepartmentModal");
            deleteButton.setAttribute("data-id", id);
            deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';

            buttonsCell.append(editButton, deleteButton);
            row.append(buttonsCell);
            frag.append(row);
            
          }
          tableBody.append(frag);
        });

      } else {
        console.log('error');

      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('error');

    }
  });

})

$("#addBtn").click(function () {

  if ($("#personnelBtn").hasClass("active")) {

    $("#addPersonnelModal").modal("show");

  } else {

    if ($("#departmentsBtn").hasClass("active")) {

      $("#addDepartmentModal").modal("show");

    } else {

      $("#addLocationModal").modal("show");

    }

  }

});

$('#addPersonnelModal').on('show.bs.modal', function () {
  $.ajax({
    url:
      "libs/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        console.log(result.data);
        $.each(result.data, function () {
          $("#addPersonnelDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name
            })
          );
        });
        populateList();


      } else {
        console.log('error');

      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('error');

    }
  });
});

$('#addDepartmentModal').on('show.bs.modal', function () {
  $.ajax({
    url:
      "libs/php/getAllLocations.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        console.log(result.data);
        $.each(result.data, function () {
          $("#addDepartmentLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name
            })
          );
        });
        populateDepartments()


      } else {
        console.log('error');

      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('error');

    }
  });
});

$("#personnelBtn").click(function () {
  $("#filterBtn").attr("disabled", false);
  populateList();
  currentfilterDepartmentSelect = '';
  currentfilterLocationSelect = '';


});

$("#departmentsBtn").click(function () {
  $("#filterBtn").attr("disabled", false);
  populateDepartments();
  currentfilterDepartment = '';


});

$("#locationsBtn").click(function () {
  $("#filterBtn").attr("disabled", true);
  populateLocations();

});



//Populate Personnel, Departments & Locations
function populateList() {
  $("#searchInp").val("");
  $("#personnelTableBody").empty();
  var tableBody = $("#personnelTableBody");
  $.ajax({
    url:
      "libs/php/getAll.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        var frag = document.createDocumentFragment();

        result.data.forEach(function (result, index) {
          var name = result.lastName + ", " + result.firstName;
          var department = result.department;
          var email = result.email;
          var id = result.id;
          var location = result.location;
          var departmentID = result.departmentID;
          var locationID = result.locationID;

          var row = document.createElement("tr");
          row.setAttribute("data-department-id", departmentID);
          row.setAttribute("data-location-id", locationID);

          var firstCell = document.createElement("td");
          firstCell.classList = "align-middle text-nowrap";

          var firstCellText = document.createTextNode(name);
          firstCell.append(firstCellText);

          row.append(firstCell);

          var secondCell = document.createElement("td");
          secondCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
          var secondCellText = document.createTextNode(department);
          secondCell.append(secondCellText);

          row.append(secondCell);

          var thirdCell = document.createElement("td");
          thirdCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
          var thirdCellText = document.createTextNode(location);
          thirdCell.append(thirdCellText);

          row.append(thirdCell);

          var fourthCell = document.createElement("td");
          fourthCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
          var fourthCellText = document.createTextNode(email);
          fourthCell.append(fourthCellText);

          row.append(fourthCell);



          var buttonsCell = document.createElement("td");
          buttonsCell.classList = "text-end text-nowrap";
          var editButton = document.createElement("button");
          editButton.classList = "btn btn-primary btn-sm me-2";
          editButton.setAttribute("type", "button");
          editButton.setAttribute("data-bs-toggle", "modal");
          editButton.setAttribute("data-bs-target", "#editPersonnelModal");
          editButton.setAttribute("data-id", id);
          editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';

          var deleteButton = document.createElement("button")
          deleteButton.classList = "btn btn-primary btn-sm me-2";
          deleteButton.setAttribute("type", "button");
          deleteButton.setAttribute("data-bs-toggle", "modal");
          deleteButton.setAttribute("data-bs-target", "#deletePersonnelModal");
          deleteButton.setAttribute("data-id", id);
          deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';

          buttonsCell.append(editButton, deleteButton);
          row.append(buttonsCell);
          frag.append(row);

        });

        tableBody.append(frag);

        


      } else {
        console.log('error');

      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('error');

    }
  });

}
function populateDepartments() {
  $("#searchInp").val("");
  $("#departmentTableBody").empty();
  var tableBody = $("#departmentTableBody");
  $.ajax({
    url:
      "libs/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        var frag = document.createDocumentFragment();

        result.data.forEach(function (result, index) {
          var name = result.name;
          var id = result.id;
          var location = result.location;
          var locationID = result.locationID;

          var row = document.createElement("tr");
          row.setAttribute("data-location-id", locationID);

          var firstCell = document.createElement("td");
          firstCell.classList = "align-middle text-nowrap";

          var firstCellText = document.createTextNode(name);
          firstCell.append(firstCellText);

          row.append(firstCell);

          var secondCell = document.createElement("td");
          secondCell.classList = "align-middle text-nowrap d-none d-md-table-cell";
          var secondCellText = document.createTextNode(location);
          secondCell.append(secondCellText);

          row.append(secondCell);

          var buttonsCell = document.createElement("td");
          buttonsCell.classList = "text-end text-nowrap";
          var editButton = document.createElement("button");
          editButton.classList = "btn btn-primary btn-sm me-2";
          editButton.setAttribute("type", "button");
          editButton.setAttribute("data-bs-toggle", "modal");
          editButton.setAttribute("data-bs-target", "#editDepartmentModal");
          editButton.setAttribute("data-id", id);
          editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';

          var deleteButton = document.createElement("button")
          deleteButton.classList = "btn btn-primary btn-sm me-2";
          deleteButton.setAttribute("type", "button");
          deleteButton.setAttribute("data-bs-toggle", "modal");
          deleteButton.setAttribute("data-bs-target", "#deleteDepartmentModal");
          deleteButton.setAttribute("data-id", id);
          deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';

          buttonsCell.append(editButton, deleteButton);
          row.append(buttonsCell);
          frag.append(row);

        });

        tableBody.append(frag);
        

      } else {
        console.log('error');

      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('error');

    }
  });

}
function populateLocations() {
  $("#searchInp").val("");
  $("#locationTableBody").empty();
  var tableBody = $("#locationTableBody");
  $.ajax({
    url:
      "libs/php/getAllLocations.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        var frag = document.createDocumentFragment();

        result.data.forEach(function (result, index) {
          var name = result.name;
          var id = result.id;

          var row = document.createElement("tr");

          var firstCell = document.createElement("td");
          firstCell.classList = "align-middle text-nowrap";

          var firstCellText = document.createTextNode(name);
          firstCell.append(firstCellText);

          row.append(firstCell);


          var buttonsCell = document.createElement("td");
          buttonsCell.classList = "text-end text-nowrap";
          var editButton = document.createElement("button");
          editButton.classList = "btn btn-primary btn-sm me-2";
          editButton.setAttribute("type", "button");
          editButton.setAttribute("data-bs-toggle", "modal");
          editButton.setAttribute("data-bs-target", "#editLocationModal");
          editButton.setAttribute("data-id", id);
          editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';

          var deleteButton = document.createElement("button")
          deleteButton.classList = "btn btn-primary btn-sm me-2";
          deleteButton.setAttribute("type", "button");
          deleteButton.setAttribute("data-bs-toggle", "modal");
          deleteButton.setAttribute("data-bs-target", "#deleteLocationModal");
          deleteButton.setAttribute("data-id", id);
          deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';

          buttonsCell.append(editButton, deleteButton);
          row.append(buttonsCell);
          frag.append(row);

        });

        tableBody.append(frag);
        


      } else {
        console.log('error');

      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('error');

    }
  });

}

//EDIT, ADD & DELETE Personnel list

$("#editPersonnelModal").on("show.bs.modal", function (e) {

  $.ajax({
    url:
      "libs/php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {

      id: $(e.relatedTarget).attr("data-id")
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {


        $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);

        $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
        $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
        $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
        $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);

        $("#editPersonnelDepartment").html("");

        $.each(result.data.department, function () {
          $("#editPersonnelDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name
            })
          );
        });

        $("#editPersonnelDepartment").val(result.data.personnel[0].departmentID);
        populateList()

      } else {
        $("#editPersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editPersonnelModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
});

$("#editPersonnelForm").on("submit", function (e) {
  e.preventDefault();
  var firstName = $("#editPersonnelFirstName").val();
  var lastName = $("#editPersonnelLastName").val();
  var jobTitle = $("#editPersonnelJobTitle").val();
  var email = $("#editPersonnelEmailAddress").val();
  var departmentID = $("#editPersonnelDepartment").val();
  var id = $("#editPersonnelEmployeeID").val();


  $.ajax({
    url: "libs/php/updatePersonnel.php",
    type: "POST",
    dataType: "json",
    data: { firstName, lastName, id, jobTitle, email, departmentID },
    success: function (result) {
      $("#editPersonnelModal").modal("hide");
      var resultCode = result.status.code;


      if (resultCode == 200) {
        populateList();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editPersonnelModal").modal("hide");
      console.log("AJAX request failed: " + textStatus, 'error');
    }


  })
})

$("#addPersonnelForm").on("submit", function (e) {
  e.preventDefault();

  var firstName = $("#addPersonnelFirstName").val();
  var lastName = $("#addPersonnelLastName").val();
  var jobTitle = $("#addPersonnelJobTitle").val();
  var email = $("#addPersonnelEmailAddress").val();
  var departmentID = $("#addPersonnelDepartment").val();

  $.ajax({
    url: "libs/php/insertPersonnel.php",
    type: "POST",
    dataType: "json",
    data: { firstName, lastName, jobTitle, email, departmentID },
    success: function (result) {
      $("#addPersonnelModal").modal("hide");
      $("#addPersonnelFirstName").val('');
      $("#addPersonnelLastName").val('');
      $("#addPersonnelJobTitle").val('');
      $("#addPersonnelEmailAddress").val('');
      $("#addPersonnelDepartment").val('');
      var resultCode = result.status.code;
      console.log(resultCode);

      if (resultCode == 200) {
        populateList();
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addPersonnelModal").modal("hide");
      console.log("AJAX request failed: " + textStatus, 'error');
    }

  })

})
$("#deletePersonnelModal").on("show.bs.modal", function (e) {

  $.ajax({
    url:
      "libs/php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {

      id: $(e.relatedTarget).attr("data-id")
    },
    success: function (result) {
      var resultCode = result.status.code;


      if (resultCode == 200) {
        $("#deletePersonnelEmployee").val(result.data.personnel[0].id);
        $("#employeeName").html(result.data["personnel"][0].firstName +
          " " +
          result.data["personnel"][0].lastName);

      } else {
        $("#deletePersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
      populateList();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deletePersonnelModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });

});
$("#deletePersonnelForm").on("submit", function (e) {
  e.preventDefault();
  var id = $("#deletePersonnelEmployee").val();
  $.ajax({
    url:
      "libs/php/deletePersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {

      id: id
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#deletePersonnelModal").modal("hide");
        populateList();

      } else {
        $("#deletePersonnelModal").modal("hide");
        $("#deletePersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deletePersonnelModal").modal("hide");
      $("#deletePersonnelModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });

})


//EDIT, ADD & DELETE Department list

$("#editDepartmentModal").on("show.bs.modal", function (e) {

  $.ajax({
    url:
      "libs/php/getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id")
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {

        $("#editDepartmentID").val(result.data.department[0].id);

        $("#editDepartmentName").val(result.data.department[0].name);
        $("#editDepartmentLocation").html("");

        $.each(result.data.location, function () {
          $("#editDepartmentLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name
            })
          );
        });

        $("#editDepartmentLocation").val(result.data.department[0].locationID);
        populateDepartments();

      } else {
        $("#editDepartmentModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editDepartmentModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
});

$("#editDepartmentForm").on("submit", function (e) {
  e.preventDefault();
  var name = $("#editDepartmentName").val();
  var locationID = $("#editDepartmentLocation").val();
  var id = $("#editDepartmentID").val();


  $.ajax({
    url: "libs/php/updateDepartment.php",
    type: "POST",
    dataType: "json",
    data: { name, locationID, id },
    success: function (result) {
      $("#editDepartmentModal").modal("hide");
      var resultCode = result.status.code;


      if (resultCode == 200) {
        populateDepartments();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editDepartmentModal").modal("hide");
      console.log("AJAX request failed: " + textStatus, 'error');
    }


  })
})
$("#addDepartmentForm").on("submit", function (e) {
  e.preventDefault();

  var name = $("#addDepartmentName").val();
  var locationID = $("#addDepartmentLocation").val();


  $.ajax({
    url: "libs/php/insertDepartment.php",
    type: "POST",
    dataType: "json",
    data: { name, locationID },
    success: function (result) {
      $("#addDepartmentModal").modal("hide");
      $("#addDepartmentName").val('');
      $("#addDepartmentLocation").val('');
      var resultCode = result.status.code;

      if (resultCode == 200) {
        populateDepartments();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addDepartmentModal").modal("hide");
      console.log("AJAX request failed: " + textStatus, 'error');
    }

  })

})

$("#deleteDepartmentModal").on("show.bs.modal", function (e) {
  $.ajax({
    url:
      "libs/php/getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id")
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#deleteDepartmentID").val(result.data.department[0].id);
        $("#deleteDepartmentName").html(result.data.department[0].name);
        var id = result.data.department[0].id;
        var departmentName = result.data.department[0].name;

        checkDepartmentUse(id, departmentName);
      } else {
        $("#deleteDepartmentModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteDepartmentModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
  function checkDepartmentUse(id, departmentName) {
    $.ajax({
      url:
        "libs/php/checkDepartmentUse.php",
      type: "POST",
      dataType: "json",
      data: {

        id: id
      },
      success: function (result) {

        var resultCode = result.status.code;

        if (resultCode == 200) {
          if (result.data.department[0].personnelCount == 0) {
            var confirmationMessage = "Are you sure you want to delete '<strong>" + departmentName + "</strong>'?";
            $("#checkDepartment").html(confirmationMessage);
            $("#yesDepartmentButton").show();
            $("#cancelDepartmentButton").show();
            $("#okDepartmentButton").hide();
          } else {
            var message = "You cannot remove the entry for <strong>" + departmentName + "</strong> because it has <strong>" + result.data.department[0].personnelCount + "</strong> employees assigned to it.";
            $("#checkDepartment").html(message);
            $("#yesDepartmentButton").hide();
            $("#okDepartmentButton").show();
            $("#cancelDepartmentButton").hide();
          }
        } else {
          $("#deleteDepartmentModal").modal("hide");
          $("#deleteDepartmentModal .modal-title").replaceWith(
            "Error retrieving data"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#deleteDepartmentModal").modal("hide");
        $("#deleteDepartmentModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    });
  }

});
$("#deleteDepartmentForm").on("submit", function (e) {
  e.preventDefault();
  var id = $("#deleteDepartmentID").val();
  console.log(id);
  $.ajax({
    url:
      "libs/php/deleteDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {

      id: id
    },
    success: function (result) {

      var resultCode = result.status.code;
      console.log(resultCode);

      if (resultCode == 200) {
        $("#deleteDepartmentModal").modal("hide");
        populateDepartments();

      } else {
        $("#deleteDepartmentModal").modal("hide");
        $("#deleteDepartmentModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteDepartmentModal").modal("hide");
      $("#deleteDepartmentModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
})

//EDIT, ADD & DELETE Location list
$("#editLocationModal").on("show.bs.modal", function (e) {
  populateLocations();
  $.ajax({
    url:
      "libs/php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id")
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {

        $("#editLocationName").val(result.data[0].name);
        $("#editLocationID").val(result.data[0].id);

      } else {
        $("#editLocationModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editLocationModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
});

$("#editLocationForm").on("submit", function (e) {

  e.preventDefault();
  var name = $("#editLocationName").val();
  var id = $("#editLocationID").val();

  $.ajax({
    url: "libs/php/updateLocation.php",
    type: "POST",
    dataType: "json",
    data: { name, id },
    success: function (result) {
      $("#editLocationModal").modal("hide");
      var resultCode = result.status.code;

      if (resultCode == 200) {
        populateLocations();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editLocationModal").modal("hide");
      console.log("AJAX request failed: " + textStatus, 'error');
    }


  })

})

$("#addLocationForm").on("submit", function (e) {

  e.preventDefault();

  var name = $("#addLocationName").val();

  $.ajax({
    url: "libs/php/insertLocation.php",
    type: "POST",
    dataType: "json",
    data: { name },
    success: function (result) {
      $("#addLocationModal").modal("hide");
      $("#addLocationName").val('');
      var resultCode = result.status.code;

      if (resultCode == 200) {
        populateLocations();
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addLocationModal").modal("hide");
      console.log("AJAX request failed: " + textStatus, 'error');
    }

  })
})
$("#deleteLocationModal").on("show.bs.modal", function (e) {
  $.ajax({
    url:
      "libs/php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id")
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#deleteLocationID").val(result.data[0].id);
        $("#deleteLocationName").html(result.data[0].name);
        var locationID = result.data[0].id;
        var locationName = result.data[0].name;
        checkLocationUse(locationID, locationName);

      } else {
        $("#deleteLocationModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteLocationModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
  function checkLocationUse(locationID, locationName) {
    $.ajax({
      url:
        "libs/php/checkLocationUse.php",
      type: "POST",
      dataType: "json",
      data: {

        id: locationID
      },
      success: function (result) {

        var resultCode = result.status.code;

        if (resultCode == 200) {
          if (result.data.location[0].departmentCount == 0) {
            var confirmationMessage = "Are you sure you want to delete '<strong>" + locationName + "</strong>'?";
            $("#checkLocation").html(confirmationMessage);
            $("#yesLocationButton").show();
            $("#cancelLocationButton").show();
            $("#okLocationButton").hide();
          } else {
            var message = "You cannot remove the entry for <strong>" + locationName + "</strong> because it has <strong>" + result.data.location[0].departmentCount + "</strong> departments assigned to it.";
            $("#checkLocation").html(message);
            $("#yesLocationButton").hide();
            $("#okLocationButton").show();
            $("#cancelLocationButton").hide();
          }
        } else {
          $("#deleteLocationModal").modal("hide");
          $("#deleteLocationModal .modal-title").replaceWith(
            "Error retrieving data"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#deleteLocationModal").modal("hide");
        $("#deleteLocationModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    });

  }

});
$("#deleteLocationForm").on("submit", function (e) {
  e.preventDefault();
  var id = $("#deleteLocationID").val();
  console.log(id);
  $.ajax({
    url:
      "libs/php/deleteLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {

      id: id
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#deleteLocationModal").modal("hide");
        populateLocations();

      } else {
        $("#deleteLocatioModal").modal("hide");
        $("#deletePLocationModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteLocationModal").modal("hide");
      $("#deleteLocationModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });


})