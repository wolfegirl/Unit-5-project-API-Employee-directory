let personHTML = '';
let modalHTML = ''; 
let employeeBoxes = '';
let span = $('.close')[0];
let employees = [];
let matchedEmployeeList = [];

//function to captialize the first letter
function capitalize(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
//AJAX call

!function AJAXrequest(){
  $.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    success: function(data) {
      employees = data.results;
      showEmployees(data);
    }
  }); //end success function
}();

//callback to show the grid of employees from AJAX request

function showEmployees (data) {      
  $.each(employees, function(i, person) {
    personHTML += '<li class="grid-33 tablet-grid-40 box center">';
    personHTML += '<div class="employee-container" id="'+ person.id.value + '">'
    personHTML += '<div class="picture"><img src="'+ person.picture.medium + '" class="image"></div>';
    personHTML += '<div class="employee-info"><h2>' + capitalize(person.name.first) + ' ' + capitalize(person.name.last) + '</h2>';
    personHTML += '<p>' + person.email + '</p>';
    personHTML += '<p>' + capitalize(person.location.city) + '</p>';
    personHTML += '</div>'
    personHTML += '</div></li>';    
  });//end each  
  $('#employees').html(personHTML);
}

//open up a modal window when an employee is clicked

!function openModal () {
  $('#employees').on('click', '.employee-container', (function (e) {
    e.preventDefault();
    //capturing the current id
    let currentID = ($(this).attr('id'));
    //testing to see what index value the current id holds
    let index = employees.findIndex(employee => employee.id.value === currentID);
    //setting the index value to be the user clicked to access that user info
    let userClicked = employees[index]; 

    //format date
    let bDateString = new Date(userClicked.dob);
    let birthday = (bDateString.getMonth() +1) + '/' + bDateString.getDate() + '/' + bDateString.getFullYear();
    
    //creating the modal with the user clicked info
    modalHTML = `
    <div class="modal-content">
    <span class="close">&times;</span>
    <div class="picture"><img src="${userClicked.picture.large}" class="image"></div>
    <div><h1>${capitalize(userClicked.name.first)} ${capitalize(userClicked.name.last)}</h1></div>
    <div><p>${userClicked.email}</p></div>
    <div><p>${capitalize(userClicked.location.city)}</p></div>
    <div><hr class="styled"></div>
    <div><p>${userClicked.phone}</p></div>
    <div><p>${capitalize(userClicked.location.street)} ${capitalize(userClicked.location.city)}, ${capitalize(userClicked.location.state)}  ${userClicked.location.postcode}</p></div>
    <div><p>Birthday: ${birthday}</p>
    </div>`;
    //events
    $('.modal').html(modalHTML).show();
    closeModal();
    closeModalClickWindow();
  }));
}();

//close modal

function closeModal () {
  $('.close').on('click', function () {
    $('.modal').hide();
  });
};

//close modal when window is clicked - not working

function closeModalClickWindow () {
  $('document').on('click', function () {
    $('.modal').hide();
  });
};

//search function
function searchList() {
  $('#search').click(function() {
    matchedEmployeeList.length = 0;
    let searchValue = $('#search').val().toLowerCase();
    console.log(searchValue);
    for (i = 0; i < employees.length; i += 1) {
      name = employees[i].find(person.name.first);
      userName = employees[i].find(person.login.username);
      if (name.text().indexOf(searchValue) !==-1 || userName.text().indexOf(searchValue) !==-1) {
      matchedEmployeeList.push(name, userName);
      }
    }
  });
};
searchList();
