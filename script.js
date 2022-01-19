var search;
let jumbo = document.createElement("div");
jumbo.setAttribute("class", "jumbotron");

let jumbo_div = document.createElement("div");
jumbo_div.setAttribute("class", "w-100 jumbo_div p-4");

let open_lib_logo = document.createElement("img");
open_lib_logo.src = "img/lib.jpg";
open_lib_logo.alt = "logo";
open_lib_logo.setAttribute("class", "img-fluid pb-2 m-auto");

let form = document.createElement("form");
form.id = "search_form";
form.classList.add("w-100");

let input_div = document.createElement("div");
input_div.classList.add("input-group", "col-md-4", "m-auto");

let input = document.createElement("input");
input.classList.add("form-control", "py-2");
input.id = "search-input";
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Search Author or Book Title");
input.name = "search";

let span = document.createElement("span");
span.classList.add("input-group-append");

let span_button = document.createElement("button");
span_button.classList.add("btn", "btn-clr", "btn-outline-secondary");
span_button.setAttribute("type", "submit");
span_button.setAttribute("onclick", "searchData(event)");

let icon = document.createElement("i");
icon.classList.add("fa", "fa-book");

let modal_main_div = document.createElement("div");
modal_main_div.setAttribute("id", "myModal");
modal_main_div.classList.add("modal", "fade");
modal_main_div.setAttribute("role", "dialog");

let modal_sub_div = document.createElement("div");
modal_sub_div.setAttribute("class", "modal-dialog modal-lg");

let modal_content_div = document.createElement("div");
modal_content_div.classList.add("modal-content");

let modal_header = document.createElement("div");
modal_header.classList.add("modal-header");

let modal_header_button = document.createElement("button");
modal_header_button.setAttribute("type", "button");
modal_header_button.setAttribute("class", "close");
modal_header_button.setAttribute("data-dismiss", "modal");
modal_header_button.innerHTML = `&times;`;

let modal_header_h1 = document.createElement("h3");
modal_header_h1.id = "modal-title";
modal_header_h1.setAttribute("class", "modal-title");

modal_header.append(modal_header_h1, modal_header_button);

let modal_body = document.createElement("div");
modal_body.setAttribute("class", "modal-body");

let modal_body_iframe = document.createElement("iframe");
modal_body_iframe.id = "modifrm";
modal_body_iframe.setAttribute("src", "");
modal_body_iframe.setAttribute("frameborder", "0");
modal_body_iframe.setAttribute("style", "width: 100%;min-height: 470px;");

modal_body.append(modal_body_iframe);

let modal_footer = document.createElement("div");
modal_footer.setAttribute("class", "modal-footer");

let modal_footer_button = document.createElement("button");
modal_footer_button.setAttribute("type", "button");
modal_footer_button.setAttribute("class", "btn btn-default");
modal_footer_button.setAttribute("data-dismiss", "modal");
modal_footer_button.innerText = "Close";

modal_footer.append(modal_footer_button);

modal_main_div.append(modal_sub_div);
modal_sub_div.append(modal_content_div);
modal_content_div.append(modal_header, modal_body, modal_footer);

jumbo.append(jumbo_div);
jumbo_div.append(open_lib_logo, form);
form.append(input_div);
input_div.append(input, span);
span.append(span_button);
span_button.append(icon);

let container = document.createElement("div");
container.setAttribute("class", "container");

let row = document.createElement("div");
row.id = "main_content";
row.setAttribute("class", "row");

document.body.append(jumbo, container, modal_main_div);
container.append(row);

function searchData(event) {
  event.preventDefault();
  search = document.getElementById("search-input").value;
  if (!search) {
    alert("Enter Book Name or Author to search");
    return false;
  } else {
    getData();
  }
}

async function getData() {
  let url = "https://openlibrary.org/search.json?q=" + search;

  try {
    let response = await fetch(url);
    let data = await response.json();
    let result = data["docs"].filter(
      (element) => element["has_fulltext"] == true
    );
    console.log(result);
    if (result.length > 0) {
      let row = document.querySelector("#main_content");
      row.innerHTML = "";
      let h2 = document.createElement("h2");
      h2.setAttribute("class", "w-100 text-center py-2");
      h2.innerHTML = "Search Result";
      row.append(h2);

      for (i = 0; i < result.length; i++) {
        let col = document.createElement("div");
        col.setAttribute("class", "col-md-4 p-2");

        let card = document.createElement("div");
        card.setAttribute("class", "card w-100 hvr-float-shadow");

        let card_img = document.createElement("img");
        card_img.setAttribute("class", "card-img-top img-fluid max-ht");
        card_img.setAttribute(
          "src",
          "https://covers.openlibrary.org/b/id/" +
            result[i]["cover_i"] +
            "-L.jpg"
        );
        card_img.setAttribute("alt", "card-img ");

        let card_body = document.createElement("div");
        card_body.setAttribute("class", "card-body");

        let card_h4 = document.createElement("h4");
        card_h4.setAttribute("class", "card-title");
        card_h4.innerText = result[i]["title"];

        let card_p = document.createElement("p");
        card_p.setAttribute("class", "card-text");
        card_p.innerHTML = `<b>Author Name:</b> ${
          result[i]["author_name"][0]
        }<br> <b>publish_year : </b> ${
          result[i]["publish_year"][0]
        } <br> <b>Subject : </b> ${result[i]["subject"].join()} `;

        let card_button = document.createElement("button");
        card_button.setAttribute("class", "btn btcl");
        card_button.id = `https://openlibrary.org${result[i]["key"]}`;
        card_button.setAttribute("onclick", "details(this)");
        card_button.innerText = "For More Details";

        card_body.append(card_h4, card_p, card_button);
        card.append(card_img, card_body);
        col.append(card);
        row.append(col);
      }
    } else {
      let row = document.querySelector("#main_content");
      row.innerHTML = "";
      let h3 = document.createElement("h3");
      h3.setAttribute("class", "w-100 text-center py-2 text-danger");
      h3.innerHTML = "Sorry no results found !!";
      row.append(h3);
    }
  } catch (error) {
    console.log(error);
  }
}

function details(e) {
  document.getElementById("modifrm").setAttribute("src", e.id);
  $("#myModal").modal("show");
}
