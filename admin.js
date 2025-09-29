let modalContainer = document.getElementById("modalContainer");
    let elements = [];

    // create modal
    function createModal(type, config = {}) {
      let modal = document.createElement("div");
      modal.className = "modal";
      modal.draggable = true;

      if (type === "input") {
        modal.innerHTML = `
          <div class="label-header">
          <span class="label-ip">Input field</span> 
          <span class="x">X</span></div>
          <label><span>Type:</span>
            <select class="type">
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
              <option value="number">Number</option>
            </select>
          </label>
          <label><span>Label:</span><input type="text" class="label"></label>
          <label><span>Name:</span><input type="text" class="name"></label>
          <label><span>ID:</span><input type="text" class="id"></label>
          <label><span>Placeholder:</span><input type="text" class="placeholder"></label>
          <label><span>Require</span><input type="checkbox" class="required"></label>
        `;
      } else if (type === "textarea") {
        modal.innerHTML = `
          <div class="label-header">
          <span class="label-area">Textarea field</span> 
          <span class="x">X</span></div>
          <label><span>Label:</span><input type="text" class="label"></label>
          <label><span>Name:</span><input type="text" class="name"></label>
          <label><span>ID:</span><input type="text" class="id"></label>
          <label><span>Placeholder:</span><input type="text" class="placeholder"></label>
          <label><span>Require</span><input type="checkbox" class="required"></label>
        `;
      }

      modal.dataset.type = type;
      modalContainer.appendChild(modal);

      // Gán lại dữ liệu từ config nếu có
      if (config) {
        if (type === "input") {
          modal.querySelector(".type").value = config.inputType || "text";
        }
        modal.querySelector(".label").value = config.label || "";
        modal.querySelector(".name").value = config.name || "";
        modal.querySelector(".id").value = config.id || "";
        modal.querySelector(".placeholder").value = config.placeholder || "";
        modal.querySelector(".required").checked = config.required || false;
      }

      // drag & drop
      modal.addEventListener("dragstart", () => {
        modal.classList.add("dragging");
      });
      modal.addEventListener("dragend", () => {
        modal.classList.remove("dragging");
        reorder();
      });

      modal.querySelector(".x").addEventListener("click", (e) => {
        let targetEl =e.target.parentElement.parentElement
        removeModal(targetEl)
      });

          
    }

    // Cập nhật lại mảng elements
    function reorder() {
      let newOrder = [];
      document.querySelectorAll(".modal").forEach(m => {
        let obj = {
          type: m.dataset.type,
          label: m.querySelector(".label")?.value || "",
          name: m.querySelector(".name")?.value || "",
          id: m.querySelector(".id")?.value || "",
          placeholder: m.querySelector(".placeholder")?.value || "",
          required: m.querySelector(".required")?.checked || false
        };
        if (m.dataset.type === "input") {
          obj.inputType = m.querySelector(".type")?.value || "text";
        }
        newOrder.push(obj);
      });
      elements = newOrder;
    }

    // Drag contai
    modalContainer.addEventListener("dragover", e => {
      e.preventDefault();
      let dragging = document.querySelector(".dragging");
      let afterElement = getDragAfterElement(modalContainer, e.clientY);
      if (afterElement == null) {
        modalContainer.appendChild(dragging);
      } else {
        modalContainer.insertBefore(dragging, afterElement);
      }
      
    });

    
    
      

    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.modal:not(.dragging)')];
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // add
    document.querySelector(".add-input").onclick = () => createModal("input");
    document.querySelector(".add-textarea").onclick = () => createModal("textarea");

    // save
    document.querySelector(".save").onclick = () => {
      reorder();
      localStorage.setItem("formElements", JSON.stringify(elements));
      alert("Đã lưu thành công!");
    };

    //  reset
    document.querySelector(".reset").onclick = () => {
      localStorage.removeItem("formElements");
      modalContainer.innerHTML = "";
      elements = [];
    };



    // load
    window.onload = () => {
      let saved = JSON.parse(localStorage.getItem("formElements") || "[]");
      saved.forEach(el => {
        createModal(el.type, el);
      });
      elements = saved;
    };
// delete
    function removeModal(modalElement) {
    
    modalElement.remove();
    reorder(); 
}


// modalContainer.addEventListener("click", e => {
    
//     if (e.target.classList.contains("x")) {
        
//         const modalToRemove = e.target.closest(".modal");

//         if (modalToRemove) {
//             removeModal(modalToRemove);
//         }
//     }
// });

