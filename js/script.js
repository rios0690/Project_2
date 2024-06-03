
$(document).ready(function () {
  populateList();

});
$("#searchInp").on("keyup", function () {
  $("#personnelTableBody").empty();
  var txt = $("#searchInp").val();

  $.ajax({
    url: "libs/php/SearchAll.php",
    type: "POST",
    dataType: "json",
    data: { txt },
    success: function (result) {
      
      var resultCode = result.status.code;

      console.log(resultCode);

      if (resultCode == 200) {
        $.each(result.data.found, function (index) {
          $("#personnelTableBody").append(
            "<td>", `<tr data-department-id="${result.data.found[index].departmentID}" data-location-id= "${result.data.found[index].locationID}">
            <td  class="align-middle text-nowrap">
              ${result.data.found[index].lastName}, ${result.data.found[index].firstName}
            </td>
            
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data.found[index].departmentName}
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data.found[index].locationName}
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data.found[index].email}
            </td>
            <td class="text-end text-nowrap">
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${result.data.found[index].id}">
                <i class="fa-solid fa-pencil fa-fw"></i>
              </button>
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deletePersonnelModal" data-id="${result.data.found[index].id}">
                <i class="fa-solid fa-trash fa-fw"></i>
              </button>
            </td>
          </tr>`

          );
        });
        
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {
      
      console.log("AJAX request failed: " + textStatus, 'error');
    }

  })

});

$("#refreshBtn").click(function () {

  if ($("#personnelBtn").hasClass("active")) {

    populateList();

  } else {

    if ($("#departmentsBtn").hasClass("active")) {

      populateDepartments();

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
      }
    }
    });
    //Populate Locations

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
      }
    }
    });
    
    
  
 } else {

    if ($("#departmentsBtn").hasClass("active")) {
      $("#filterDepartmentModal").modal("show");
      $("#selectDepartmentLocation").empty();

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
        }
      }
      });

     

    } 
  }

});


//Filter Personnel by departments
$("#applyFilterPersonnel").click(function () {
  $("#personnelTableBody").empty();
  var txt = $("#selectPersonnelDepartment").find(":selected").text();
  

  $.ajax({
    url: "libs/php/SearchAll.php",
    type: "POST",
    dataType: "json",
    data: { txt },
    success: function (result) {
      $("#filterPersonnelModal").modal("hide");
      
      var resultCode = result.status.code;

      if (resultCode == 200) {

        $.each(result.data.found, function (index) {
          $("#personnelTableBody").append(
            "<td>", `<tr data-department-id="${result.data.found[index].departmentID}" data-location-id= "${result.data.found[index].locationID}">
            <td  class="align-middle text-nowrap">
              ${result.data.found[index].lastName}, ${result.data.found[index].firstName}
            </td>
            
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data.found[index].departmentName}
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data.found[index].locationName}
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data.found[index].email}
            </td>
            <td class="text-end text-nowrap">
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${result.data.found[index].id}">
                <i class="fa-solid fa-pencil fa-fw"></i>
              </button>
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deletePersonnelModal" data-id="${result.data.found[index].id}">
                <i class="fa-solid fa-trash fa-fw"></i>
              </button>
            </td>
          </tr>`

          );
        });
        
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {
      
      console.log("AJAX request failed: " + textStatus, 'error');
    }

  })

})

//Filter Personnel by Location
$("#applyFilterPersonnelLocation").click(function () {
  $("#personnelTableBody").empty();
  var txt = $("#selectPersonnelLocation").find(":selected").text();
  

  $.ajax({
    url: "libs/php/SearchAll.php",
    type: "POST",
    dataType: "json",
    data: { txt },
    success: function (result) {
      $("#filterPersonnelModal").modal("hide");
      
      var resultCode = result.status.code;

      if (resultCode == 200) {

        $.each(result.data.found, function (index) {
          $("#personnelTableBody").append(
            "<td>", `<tr data-department-id="${result.data.found[index].departmentID}" data-location-id= "${result.data.found[index].locationID}">
            <td  class="align-middle text-nowrap">
              ${result.data.found[index].lastName}, ${result.data.found[index].firstName}
            </td>
            
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data.found[index].departmentName}
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data.found[index].locationName}
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data.found[index].email}
            </td>
            <td class="text-end text-nowrap">
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${result.data.found[index].id}">
                <i class="fa-solid fa-pencil fa-fw"></i>
              </button>
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deletePersonnelModal" data-id="${result.data.found[index].id}">
                <i class="fa-solid fa-trash fa-fw"></i>
              </button>
            </td>
          </tr>`

          );
        });
        
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {
      
      console.log("AJAX request failed: " + textStatus, 'error');
    }

  })

})

//Filter Departments by Location
$("#applyFilterDepartment").click(function () {
  $("#departmentTableBody").empty();
  var txt = $("#selectDepartmentLocation").find(":selected").text();
  $.ajax({
    url:
      "libs/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        console.log(result.data);
        $("#filterDepartmentModal").modal("hide");

        $.each(result.data, function (index) {
          if(txt == result.data[index].location){
          $("#departmentTableBody").append(
            "<td>", `<tr data-location-id= "${result.data[index].locationID}">
            <td  class="align-middle text-nowrap">
              ${result.data[index].name}
            </td>
            
            ><td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data[index].location}
            </td>
            
            <td class="text-end text-nowrap">
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editDepartmentModal" data-id="${result.data[index].id}">
            <i class="fa-solid fa-pencil fa-fw"></i>
          </button>
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deleteDepartmentModal" data-id="${result.data[index].id}">
            <i class="fa-solid fa-trash fa-fw"></i>
          </button>
            </td>
          </tr>`

          );
        }
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

  populateList();


});

$("#departmentsBtn").click(function () {

  populateDepartments();

});

$("#locationsBtn").click(function () {

  populateLocations();

});



//Populate Personnel, Departments & Locations
function populateList() {
  $("#personnelTableBody").empty();
  $.ajax({
    url:
      "libs/php/getAll.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {


        $.each(result.data, function (index) {
          $("#personnelTableBody").append(
            "<td>", `<tr data-department-id="${result.data[index].departmentID}" data-location-id= "${result.data[index].locationID}">
            <td  class="align-middle text-nowrap">
              ${result.data[index].lastName}, ${result.data[index].firstName}
            </td>
            
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data[index].department}
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data[index].location}
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data[index].email}
            </td>
            <td class="text-end text-nowrap">
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${result.data[index].id}">
                <i class="fa-solid fa-pencil fa-fw"></i>
              </button>
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deletePersonnelModal" data-id="${result.data[index].id}">
                <i class="fa-solid fa-trash fa-fw"></i>
              </button>
            </td>
          </tr>`

          );
        });
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
  $("#departmentTableBody").empty();
  $.ajax({
    url:
      "libs/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        console.log(result.data);

        $.each(result.data, function (index) {
          $("#departmentTableBody").append(
            "<td>", `<tr data-location-id= "${result.data[index].locationID}">
            <td  class="align-middle text-nowrap">
              ${result.data[index].name}
            </td>
            
            ><td class="align-middle text-nowrap d-none d-md-table-cell">
            ${result.data[index].location}
            </td>
            
            <td class="text-end text-nowrap">
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editDepartmentModal" data-id="${result.data[index].id}">
            <i class="fa-solid fa-pencil fa-fw"></i>
          </button>
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deleteDepartmentModal" data-id="${result.data[index].id}">
            <i class="fa-solid fa-trash fa-fw"></i>
          </button>
            </td>
          </tr>`

          );
        });
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
  $("#locationTableBody").empty();
  $.ajax({
    url:
      "libs/php/getAllLocations.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        console.log(result.data);

        $.each(result.data, function (index) {
          $("#locationTableBody").append(
            "<td>", `<tr>
            <td  class="align-middle text-nowrap">
              ${result.data[index].name}
            </td>
            <td class="text-end text-nowrap">
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editLocationModal" data-id="${result.data[index].id}">
            <i class="fa-solid fa-pencil fa-fw"></i>
          </button>
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deleteLocationModal"  data-id="${result.data[index].id}">
            <i class="fa-solid fa-trash fa-fw"></i>
          </button>
            </td>
          </tr>`

          );
        });
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
        $("#employeeName").html(result.data.personnel[0].firstName);
        
      } else {
        $("#deletePersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
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
  
});

$("#deleteDepartmentForm").on("submit", function (e) {
  e.preventDefault();
  var id = $("#deleteDepartmentID").val();
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

});
$("#deleteLocationForm").on("submit", function (e) {
  e.preventDefault();
  var id = $("#deleteLocationID").val();
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
        $("#deletePersonnelModal .modal-title").replaceWith(
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