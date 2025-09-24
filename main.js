var btnMenu = document.querySelector('.fa-solid.fa-bars')
var menuMobile = document.querySelector(".navbar-container-mobile")
console.log(btnMenu)
btnMenu.addEventListener('click',e=>{
    menuMobile.classList.toggle('display');
})