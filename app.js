let myLibrary = [];

function Course(ttle, src, day2Com, compltd) {
  this.tilte = ttle;
  this.source = src;
  this.day2Complete = day2Com;
  this.dayLeft = day2Com;
  this.completed = compltd;
}

function addCourseToLibrary() {

    // all dom selected item
    const addBtn = document.querySelector(".add");
    const form = document.querySelector(".form");
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const cancelAdd = document.querySelector("#formCancel");
    const title = document.querySelector("#title");
    const cardAddBtn = document.querySelector(".form-btn"); 
    const source = document.querySelector("#source");
    const day2Com = document.querySelector("#day2comp");
    // selection of dom element end here

    // add button functionality
    addBtn.addEventListener("click", ()=>{
      // console.log(form);
       form.classList.toggle("inActive");
       header.classList.toggle("blur");
       main.classList.toggle("blur");
    });
    
    // cancel adding cource btn
    cancelAdd.addEventListener("click", ()=>{
      form.classList.add("inActive");
      header.classList.toggle("blur");
      main.classList.toggle("blur");
    });

    cardAddBtn.addEventListener("click", (e)=>{
      e.preventDefault();
      console.log(title.value );
      console.log(source.value);
      console.log(day2Com.value);
      form.classList.add("inActive");
      header.classList.toggle("blur");
      main.classList.toggle("blur");
    })
    
}
addCourseToLibrary() 