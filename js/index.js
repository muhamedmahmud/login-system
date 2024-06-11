const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});
loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

let userName = document.getElementById("createName");
let createEmail = document.getElementById("createEmail");
let createPass = document.getElementById("createPass");

let email = document.getElementById("email");
let pass = document.getElementById("pass");

let users = JSON.parse(localStorage.getItem("users")) || [];

function createAcc() {
  let user = {
    userName: userName.value,
    email: createEmail.value,
    pass: createPass.value,
  };

  // Validate the password
  if (!validatePassword(user.pass)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Password",
      text: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    });
    return; // Stop execution if password is invalid
  }

  let x = check(user);
  if (x) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    Swal.fire({
      icon: "success",
      title: "Account Created",
      text: "Your account has been created successfully!",
    });
    container.classList.remove("active");
    clearSignUp();
  } else {
    Swal.fire({
      icon: "error",
      title: "User Exists",
      text: "An account with this information already exists.",
    });
  }
}

function check(user) {
  for (let i = 0; i < users.length; i++) {
    if (
      user.userName === users[i].userName &&
      user.email === users[i].email &&
      user.pass === users[i].pass
    ) {
      return false;
    }
  }
  return true;
}

function clearSignUp() {
  userName.value = "";
  createEmail.value = "";
  createPass.value = "";
}

function loginAcc() {
  let user = {
    email: email.value,
    pass: pass.value
  };
  let userFound = false;
  for (let i = 0; i < users.length; i++) {
    if (user.email === users[i].email && user.pass === users[i].pass) {
      localStorage.setItem("currentUser", JSON.stringify(users[i]));
      userFound = true;
      window.location.href = 'welcome.html';
      break;
    }
  }
  if (!userFound) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid email or password.",
    });
  }
}

function validatePassword(password) {
  if (password.length < 8) {
    return false;
  }

  if (!/[A-Z]/.test(password)) {
    return false;
  }

  if (!/[a-z]/.test(password)) {
    return false;
  }

  if (!/\d/.test(password)) {
    return false;
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    return false;
  }

  return true;
}
