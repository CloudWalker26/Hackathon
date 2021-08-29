// creating the form
function createForm() {
  const container = document.querySelector(".container");
  const heading = document.createElement("h1");
  const heading2 = document.createElement("p");
  const form = document.createElement("form");


  heading.innerText = "Welcome to Nationalize.io";
  heading2.innerText = "An API for predicting nationality from a name";
  form.setAttribute("id", "my-form");
  form.setAttribute("onsubmit", "onSearch()");

  form.innerHTML = `<label for="Name" class="form-label">Name</label>
      <input type="text" class="form-control" id="Name"  />
      <button type="submit" class="btn btn-primary">submit</button>`;
  container.append(heading, heading2, form);
}

// calling the external API
async function CallExternalAPI(searchTerm) {
  const response = await fetch(
    `https://api.nationalize.io/?name=${searchTerm}`
  );
  const data = await response.json();
  console.log(response.status);
  console.log(data);
  RenderResultTable(searchTerm, data);
}

// Getting the input
function onSearch() {
  const searchTerm = document.querySelector("#Name").value;
  CallExternalAPI(searchTerm);
}

// Display Table
function RenderResultTable(searchTerm, result) {
  const container = document.querySelector(".container");
  const DisplayPara = document.createElement("h4");
  DisplayPara.setAttribute("class", "DisplayPara");

  if (result.country.length > 0) {
    $(".DisplayPara").addClass("hidden");
    if ($(".table").hasClass("hidden")) $(".table").removeClass("hidden");
    var tableBody = $("#table-body");
    $("#table-body").empty();
     for (var i=0 in result.country)
    {
      var row = ` <tr>
                        <td>${searchTerm}</td>
                        <td>${result.country[i].country_id}</td>
                        <td>${result.country[i].probability}</td>`;
      tableBody.append(row);
    }
  } else {
    $(".table").addClass("hidden");
    if ($(".DisplayPara").hasClass("hidden")) $(".table").removeClass("hidden");

    DisplayPara.innerText = `The Data you not found in the dataset. Please Try with another Name`;
    container.append(DisplayPara);
  }
}

$(document).ready(function () {
  $(document).on("submit", "#my-form", function () {
    return false;
  });
});

createForm();
