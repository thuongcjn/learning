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

      if (type === "input") {
        const typeSelect = modal.querySelector(".type");
        
        const placeholderInput = modal.querySelector(".placeholder"); 
        
        
        placeholderInput.type = typeSelect.value;
        
        typeSelect.addEventListener("change", (e) => {
            const newType = e.target.value;
            
            
            placeholderInput.type = newType;
            
           
           // modal.querySelector(".label-ip").textContent = newType.charAt(0).toUpperCase() + newType.slice(1) + " field";
            
        });
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
       
      if (!validateModals()) {
        // Nếu validateModals trả về false, dừng hàm và không lưu
       
        return; 
      } 

     
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


const nameIdRegex = /^[a-zA-Z0-9][a-zA-Z0-9_-]{2,}$/;
const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w{2,}$/;
const numberRegex =/^\d+$/;





function validateModals() {
    let isValid = true;
    const modals = document.querySelectorAll(".modal");

    modals.forEach((m, index) => {
        const labelInput = m.querySelector(".label");
        const nameInput = m.querySelector(".name");
        const idInput = m.querySelector(".id");
        const placeholderIp = m.querySelector('.placeholder')
        if(m.querySelector(".type")){
          var dataselect = m.querySelector(".type")

          
           if(dataselect.value === "email" && dataselect){
          if(!emailRegex.test(placeholderIp.value.trim())){
            alert('vui long nhap dung dinh dang email')
            isValid = false;
            return;
          }
        }

         if(dataselect.value === "number"){
          if(!numberRegex.test(placeholderIp.value.trim())){
            alert('vui long nhap dung dinh dang number')
            isValid = false;
            return;
          }
        }
       


        }
        const haveInput = m.querySelector(".label-ip")
        if (!labelInput.value.trim()) {
            alert(`Lỗi tại phần tử ${index + 1}: Trường Label không được để trống.`);
            isValid = false;
            return; 
        }
        if (!nameInput.value.trim()) {
            alert(`Lỗi tại phần tử ${index + 1}: Trường Name không được để trống.`);
            isValid = false;
            return;
        }
        if (!idInput.value.trim()) {
            alert(`Lỗi tại phần tử ${index + 1}: Trường ID không được để trống.`);
            isValid = false;
            return;
        }
        //   if (!placeholderIp.value.trim()) {
        //     alert(`Lỗi: Trường placeholder không được để trống.`);
        //     isValid = false;
        //     return;
        // }



       


        if (!nameIdRegex.test(nameInput.value.trim())) {
            alert(`Lỗi tại phần tử ${index + 1}: Trường Name "${nameInput.value}" không hợp lệ. Vui lòng sử dụng chữ cái, số, gạch dưới, gạch ngang và không bắt đầu bằng số.`);
            isValid = false;
            return;
        }
        if (!nameIdRegex.test(idInput.value.trim())) {
            alert(`Lỗi tại phần tử ${index + 1}: Trường ID "${idInput.value}" không hợp lệ. Vui lòng sử dụng chữ cái, số, gạch dưới, gạch ngang và không bắt đầu bằng số.`);
            isValid = false;
            return;
        }
        
       
    });

    return isValid;
}
