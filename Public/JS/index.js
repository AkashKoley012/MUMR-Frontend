const App = document.getElementById("app");

var isAdmin = false;

const start = async () => {
    App.innerHTML = `
    <div class="login-box">
    <p>Login</p>
    <form action="http://localhost:3000/api/user">
        <div class="user-box">
            <input required="" name="" type="text" id="name"/>
            <label>Email</label>
        </div>
        <div class="user-box">
            <input required="" name="" type="password" id="password"/>
            <label>Password</label>
        </div>
        <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
        </a>
    </form>
    </div>`;
    const btn = document.querySelector("form a");
    btn.addEventListener("click", async () => {
        var data = {
            name: document.getElementById("name").value,
            password: document.getElementById("password").value,
        };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        };
        let response = await fetch("http://localhost:3000/api/user/login", options);
        data = await response.json();
        if (data.message) alert(data.message);
        else {
            isAdmin = data.isAdmin;
            App.innerHTML = `
                <header id="header">
                <div class="left">
                    <div id="home" class="head-item">Home</div>
                    <div id="about" class="head-item">About</div>
                </div>
                <div class="home-item">MUMR</div>
                <div class="right">
                    <div id="search-bar" class="head-item">
                        <input placeholder="Type to search..." required="" class="input" name="text" type="text" />
                        <svg viewBox="0 0 512 512" class="ionicon" xmlns="http://www.w3.org/2000/svg">
                            <title>Search</title>
                            <path stroke-width="32" stroke-miterlimit="10" stroke="currentColor" fill="none" d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"></path>
                            <path d="M338.29 338.29L448 448" stroke-width="32" stroke-miterlimit="10" stroke-linecap="round" stroke="currentColor" fill="none"></path>
                        </svg>
                    </div>
                    <div id="profile-img" class="head-item">
                        <img src="Public/Images/avatar.png" alt="" />
                    </div>
                </div>
            </header> 
            <main id="card-section"></main>`;
            const Card = document.getElementById("card-section");
            const users = await fetch("http://localhost:3000/api/user");
            const UsersData = await users.json();
            UsersData.map((user) => {
                Card.innerHTML += `
                    <div class="card">
                    ${
                        isAdmin
                            ? `<i class="fa-solid fa-pen-to-square update" data-id=${user.id}></i>
                    <i class="fa-solid fa-trash-can delete" data-id=${user.id}></i>`
                            : ""
                    }
                        <div class="name">${user.name}</div>
                        <div class="role">${user.role}</div>
                    </div>`;
            });
            if (isAdmin)
                Card.innerHTML += `
                <div class="card">
                <i class="fa-solid fa-circle-plus" id="add-user"></i>
                </div>
                `;
            const add = document.querySelector("#add-user");
            add.addEventListener("click", async () => {
                let data = {
                    name: prompt("Enter name"),
                    role: prompt("Enter role"),
                    password: prompt("Enter password"),
                };
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(data),
                };
                let response = await fetch("http://localhost:3000/api/user", options);
                data = await response.json();
            });
            Card.addEventListener("click", async (event) => {
                // console.log(event.target);
                if (event.target.classList.contains("update")) {
                    let data = {
                        id: event.target.getAttribute("data-id"),
                        name: prompt("Enter name"),
                        role: prompt("Enter role"),
                        password: prompt("Enter password"),
                    };
                    console.log(data);
                    const options = {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify(data),
                    };
                    let response = await fetch("http://localhost:3000/api/user", options);
                    data = await response.json();
                }

                if (event.target.classList.contains("delete")) {
                    let data = {
                        id: event.target.getAttribute("data-id"),
                    };
                    const options = {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify(data),
                    };
                    let response = await fetch("http://localhost:3000/api/user", options);
                    data = await response.json();
                }
            });
        }
    });
};

start();
