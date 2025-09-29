var btnMenu = document.querySelector('.fa-solid.fa-bars')
var menuMobile = document.querySelector(".navbar-container-mobile")
console.log(btnMenu)
btnMenu.addEventListener('click',e=>{
    menuMobile.classList.toggle('display');
})



let data = JSON.parse(localStorage.getItem("formElements") || "[]");
    let form = document.querySelector(".form");

    data.forEach(el => {
      let div = document.createElement("div");
      div.className = "form-group";

      if (el.label) {
        let label = document.createElement("label");
        label.setAttribute("for", el.id);
        label.textContent = el.label;
        div.appendChild(label);
      }

      if (el.type === "input") {
        let input = document.createElement("input");
        input.type = el.inputType || "text";
        if (el.name) input.name = el.name;
        if (el.id) input.id = el.id;
        if (el.placeholder) input.placeholder = el.placeholder;
        if (el.required) input.required = true;
        div.appendChild(input);
      } else if (el.type === "textarea") {
        let textarea = document.createElement("textarea");
        if (el.name) textarea.name = el.name;
        if (el.id) textarea.id = el.id;
        if (el.placeholder) textarea.placeholder = el.placeholder;
        if (el.required) textarea.required = true;
        div.appendChild(textarea);
      }

      form.appendChild(div);
    });