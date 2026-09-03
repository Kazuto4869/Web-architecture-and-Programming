// const subjects = [
//     { id: 1, name: 'math', result: 8.5 },
//     { id: 2, name: 'physics', result: 7.5 },
//     { id: 3, name: 'chemistry', result: 9.0 },
//     { id: 4, name: 'biology', result: 6.5 },
// ];

// let sum = 0;

// for (let i = 0; i < subjects.length; i++) {
//     if (subjects[i].result >= 8.5) {
//         console.log(subjects[i].name + ": 4.0")
//     };

//     sum += subjects[i].result;

// }
// let max = 0;
// for (let i = 0; i < subjects.length; i++) {
//     if (subjects[i].result > max) {
//         max = subjects[i].result;
//     }
// }

// console.log("Max : " + max);
// console.log("sum : " + sum);

// let card = document.querySelector(".card");

// card.innerHTML; // get / set HTML content
// card.textContent; // get / set plain text

// card.getAttribute("data-id"); // read an attribute
// card.setAttribute("data-id", "42"); // write an attribute

// card.style.color = "red"; // set a CSS property directly

// let noti = document.createElement("div"); // create a new element
// let message = document.createElement("p");
// message.textContent = "this is a notification";

// noti.appendChild(message);

// noti.style.backgroundColor = "yellow";
// noti.style.padding = "10px";
// noti.style.border = "1px solid black";
// noti.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

// let form = document.querySelector("form");
// form.appendChild(noti);

// let noti = document.createElement("div");
// let message = document.createElement("p");
// message.textContent = "error";
// noti.appendChild(message);
// noti.style.backgroundColor = "red";
// noti.style.padding = "10px";
// noti.style.border = "1px solid black";
// noti.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

let form = document.querySelector("form");
form.appendChild(noti);

form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent the form from submitting normally

  console.log("Form submitted");
});

let requiredFields = form.querySelectorAll("[required]");
let hasEmptyField = false;

for (let i = 0; i < requiredFields.length; i++) {
  if (!requiredFields[i].value) {
    hasEmptyField = true;
    break;
  }
}

console.log("Has empty field: " + hasEmptyField);

let bedrooms = document.querySelector("#bedrooms");
let bedroomsNumber = Number(bedrooms.value);

if (bedroomsNumber < 1) {
  console.log("Invalid number of bedrooms");
}
