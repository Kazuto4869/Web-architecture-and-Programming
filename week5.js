fetch("https://jsonplaceholder.typicode.com/users")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.error("Something went wrong:", error);
  });

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    let body = document.querySelector("#body");

    users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name.toUpperCase()}</td>
            <td>${user.address.street}, ${user.address.suite}, ${user.address.city}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
        `;
        body.appendChild(row);
    });
    
    // const tableBody = document.getElementById("body");
    // let content = "";
    // users.forEach((user) => {
    //   content += `
    //     <tr>
    //       <td>${user.id}</td>
    //       <td>${user.name}</td>
    //       <td>${user.address.street}, ${user.address.suite}, ${user.address.city}</td>
    //       <td>${user.email}</td>
    //       <td>${user.phone}</td>
    //     </tr>
    //   `;
    // });
    // tableBody.innerHTML = content;

}
    
  catch (error) {
    console.error("Something went wrong:", error);
  }
}

async function layDuLieu(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
    } catch (error) {
    console.error("Something went wrong:", error);
    }
}

fetchUsers();

layDuLieu("https://jsonplaceholder.typicode.com/users")
  .then((data) => console.log(data));


