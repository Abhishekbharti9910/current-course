// all dom selected item
const addBtn = document.querySelector(".add");
const form = document.querySelector(".form");
const header = document.querySelector("header");
let main = document.querySelector("main");
const cancelAdd = document.querySelector("#formCancel");
const title = document.querySelector("#title");
const cardAddBtn = document.querySelector(".form-btn");
const source = document.querySelector("#source");
const day2Com = document.querySelector("#day2comp");

// selection of dom element end here

let myCourses = [];

function Course(ttle, src, day2Com, compltd) {
  this.title = ttle;
  this.source = src;
  this.day2Complete = day2Com;
  this.dayLeft = day2Com;
  this.completed = compltd;
}

//card template and methods on card
const MethodOnCourse = {
  htmlMarkup: function () {
    const template = `<div class="card-container ${this.title}">
          <span id="del" data-title="${this.title}" onclick="deleteCard()">X</span>
          <div class="cardI"><h2>${this.title}</h2></div>
          <div class="cardI"><h4>Source : ${this.source}</h4></div>
          <div class="cardI"><h4>Day to complete : ${this.day2Complete}</h4></div>
          <div class="cardI" id="dayLeft">
              <div id="cred">●</div>
              <div><h4>Day left : ${this.dayLeft}</h4></div>
          </div>
          <div class="mark"><button class="btn-effect">${this.completed}</button></div>
          </div>`
    return template;
  },
  //course id function
  // course date left function
  // course complete function
}
// card template end here 

Course.prototype = Object.create(MethodOnCourse);

function addCourseToLibrary() {
  // add button functionality
  addBtn.addEventListener("click", () => {
    // console.log(form);
    form.classList.toggle("inActive");
    header.classList.toggle("blur");
    main.classList.toggle("blur");
  });

  // cancel adding cource btn
  cancelAdd.addEventListener("click", () => {
    form.classList.add("inActive");
    header.classList.toggle("blur");
    main.classList.toggle("blur");
  });

  //driver function 
  cardAddBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let course = new Course(title.value, source.value, day2Com.value);
    console.log(!isCourseExist(course));
    console.log(fillRight(course));
    if (!isCourseExist(course) && fillRight(course)) {
      addCourse(course);
      addInMain(course);
      form.classList.add("inActive");
      header.classList.toggle("blur");
      main.classList.toggle("blur");
    }
    else {
      let warn = document.querySelector("#warn");
      if (isCourseExist(course)) {
        warn.innerHTML = "Course already exist in your schedule"
      }
      else{
        warn.innerHTML = "Please give correct inputs";
      }
      document.querySelector("#warn").classList.remove("inActive");
    }
  })

  // add courses array to local storage
  function addToLocalStorage(arr) {
    localStorage.setItem("myCourses", JSON.stringify(arr));
  }
  // function for checking all fields are correctly filled
  function fillRight(course) {
    let reGex = /^\d*$/;
    let k = course.day2Complete || "A";
    if (course.title.length >=2 && course.source.length >= 2 && reGex.test(k) && k <= 120) {
      return true;
    }
    else{
      return false;
    }
  }
  // function to check weather the following course exist or not
  function isCourseExist(course) {
    myCourses = JSON.parse(localStorage.getItem("myCourses")) || [];
    for (let item of myCourses) {
      if (item.title == course.title) { return true; }
    }
    return false;
  }

  // add course to myCourses
  function addCourse(course) {
    myCourses = JSON.parse(localStorage.getItem("myCourses")) || [];
    myCourses.push(course);
    localStorage.removeItem("myCourses");
    // console.log(myCourses);
    addToLocalStorage(myCourses);
  }

  // function for adding class without harming stuff alredy present there
  function addInMain(course) {
    main.innerHTML += course.htmlMarkup();
  }


}

// making tamplate for object for onload
function htmlMarkup(course) {
  const template = `<div class="card-container ${course.title}">
<span id="del" data-title="${course.title}" onclick="deleteCard()">X</span>
<div class="cardI"><h2>${course.title}</h2></div>
<div class="cardI"><h4>Source : ${course.source}</h4></div>
<div class="cardI"><h4>Day to complete : ${course.day2Complete}</h4></div>
<div class="cardI" id="dayLeft">
    <div id="cred">●</div>
    <div><h4>Day left : ${course.dayLeft}</h4></div>
</div>
<div class="mark"><button class="btn-effect">${course.completed}</button></div>
</div>`
  return template;
};

// this add in main function add course present in local storage
// to page on load 
function addInMain(course) {
  main.innerHTML += course;
}
let addFromLStorage = function () {
  const localData = JSON.parse(localStorage.getItem("myCourses"));
  for (let i = 0; i < localData.length; i++) {
    addInMain(htmlMarkup(localData[i]))
  }
}

let rmvWarn = function () {
  title.addEventListener("keydown", () => {
    document.querySelector("#warn").classList.add("inActive");
  })
}



//delete card
function deleteCard() {
  // driver function
  // console.log("hello");
  let delBtn = document.querySelectorAll("#del");
  delBtn.forEach((node) => {
    node.addEventListener("click", () => {
      dltCardLocalStorage(node);
      let delCard = document.querySelector(`.${node.dataset.title}`)
      delCard.remove();
    })
  })

  // delting card from local storage
  function dltCardLocalStorage(node) {
    let loclStrg = JSON.parse(localStorage.getItem("myCourses"));
    for (const key in loclStrg) {
      if (loclStrg[key].title == node.dataset.title) {
        loclStrg.splice(key, 1);
        localStorage.setItem("myCourses", JSON.stringify(loclStrg))
      }
    }
  }

}

rmvWarn();
addCourseToLibrary();
addFromLStorage();
deleteCard();