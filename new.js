// // handle form control

// var addInput = document.querySelector(".add-input")
// var addTextarea = document.querySelector(".add-textarea")
// var btnSave = document.querySelector(".save")
// var btReset = document.querySelector(".reset")

// const handleAddInput = () =>{
//      const newFormInstance = InputFormContainer.cloneNode(true);
//     document.body.append(newFormInstance)
// }
// addInput.addEventListener('click',handleAddInput)
// // define input field
// const InputFormContainer = document.createElement('div')
// InputFormContainer.className = "containerForm"
// // labelMain
// const nameForm = document.createElement('label')
// nameForm.textContent = "input field"
// // x
// const divX = document.createElement('div')
// divX.textContent = "X"
// divX.className = "btn-x"
// //type
// const labelType = document.createElement('label')
// labelType.textContent = "Type"
// // typeChoose
// const optionsData = [
//     { text: " Text", value: "text" },
//     { text: "Number", value: "number" },
//     { text: "Date", value: "date" },
//     { text: "Time", value: "time" }
// ];

// const typeChoose = document.createElement('select')
// typeChoose.id = "dataTypeSelect";
// typeChoose.name = "data_type";
// optionsData.forEach(optionInfo => {
//     // Tạo thẻ <option> mới
//     const optionElement = document.createElement("option");

//     // Đặt nội dung hiển thị (text) và giá trị gửi đi (value)
//     optionElement.textContent = optionInfo.text;
//     optionElement.value = optionInfo.value;

//     // Thêm option vào thẻ select
//     typeChoose.appendChild(optionElement);
// });

// // label
// const lableText = document.createElement('label')
// lableText.textContent = "Label"
// // label input
// const labelInput = document.createElement('input')
// labelInput.className = "labelInput"
// // name
// const labelName = document.createElement('label')
// labelName.textContent = "Name"

// //name Inpt
// const nameInput = document.createElement('input')
// nameInput.className = "nameInput"
// // id 
// const labelId = document.createElement('label')
// labelId.textContent = "Id"
// // id input
// const idInput = document.createElement('input')
// idInput.className= "idInput"
// // place
// const labelPlace = document.createElement('label')
// labelPlace.textContent = "Placeholder"
// // placeInput
// const placeholderInput = document.createElement('input')
// placeholderInput.className = "placeholderInput"
// // require lable
// const labelRequire = document.createElement('label')
// labelRequire.textContent = "Require"
// // require check
// const requireCheck = document.createElement('input')
// requireCheck.type = 'checkbox'
// requireCheck.className = "requireCheck"

// InputFormContainer.append(nameForm,divX,labelType,typeChoose,lableText,labelInput,labelName,nameInput,
//     labelId,idInput,labelPlace,placeholderInput,labelRequire,requireCheck
// )
