const subjects = [
    { id: 1, name: 'math', result: 8.5 },
    { id: 2, name: 'physics', result: 7.5 },
    { id: 3, name: 'chemistry', result: 9.0 },
    { id: 4, name: 'biology', result: 6.5 },
];

let sum = 0;

for (let i = 0; i < subjects.length; i++) {
    if (subjects[i].result >= 8.5) {
        console.log(subjects[i].name + ": 4.0")
    };

    sum += subjects[i].result;

}
let max = 0;
for (let i = 0; i < subjects.length; i++) {
    if (subjects[i].result > max) {
        max = subjects[i].result;
    }
}
console.log("Max : " + max);
console.log("sum : " + sum);



let card = document.querySelector(".card");

if (card) {
    card.setAttribute("data-id", "42");
    card.style.color = "red";
}

let noti = document.createElement("div");
let message = document.createElement("p");
message.textContent = "this is a notification";

noti.appendChild(message);

noti.style.backgroundColor = "yellow";
noti.style.padding = "10px";
noti.style.border = "1px solid black";
noti.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

let firstForm = document.querySelector("form");
if (firstForm) {
    firstForm.appendChild(noti);
}

let form = document.querySelector("#subjects");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let noti = document.createElement("div");
    noti.textContent = "Nhập thành công!";

    noti.style.backgroundColor = "orange";
    noti.style.color = "white";
    noti.style.padding = "10px";
    noti.style.marginTop = "15px";
    noti.style.borderRadius = "5px";
    noti.style.textAlign = "center";

    form.appendChild(noti);

    form.reset();

    setTimeout(function () {
      noti.remove();
    }, 3000);
  });
}
