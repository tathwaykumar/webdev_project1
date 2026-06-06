// REDIRECT IF ALREADY LOGGED IN

let currentUser =
    localStorage.getItem(
        "currentUser"
    );

if (
    currentUser
    &&
    window.location.pathname
        .includes("index.html")
) {
    window.location.href =
        "dashboard.html";
}


// SWITCH FORMS

function showSignup() {

    document
        .getElementById(
            "loginForm"
        )
        .classList.remove(
            "active"
        );

    document
        .getElementById(
            "signupForm"
        )
        .classList.add(
            "active"
        );
}


function showLogin() {

    document
        .getElementById(
            "signupForm"
        )
        .classList.remove(
            "active"
        );

    document
        .getElementById(
            "loginForm"
        )
        .classList.add(
            "active"
        );
}


// SHOW PASSWORD

function togglePassword(id) {

    let input =
        document.getElementById(id);

    input.type =
        input.type ===
            "password"
            ?
            "text"
            :
            "password";
}


// PASSWORD STRENGTH

function checkPassword() {

    let password =
        document
            .getElementById(
                "signupPassword"
            )
            .value;

    let strength =
        document
            .getElementById(
                "passwordStrength"
            );

    if (password.length < 5) {

        strength.innerText =
            "❌ Weak Password";

        strength.style.color =
            "red";
    }

    else if (
        password.length < 8
    ) {

        strength.innerText =
            "⚠ Medium Password";

        strength.style.color =
            "orange";
    }

    else {

        strength.innerText =
            "✅ Strong Password";

        strength.style.color =
            "lightgreen";
    }
}


// SIGNUP WITH OTP

function signup() {

    let name =
        document
            .getElementById(
                "signupName"
            )
            .value;

    let email =
        document
            .getElementById(
                "signupEmail"
            )
            .value;

    let password =
        document
            .getElementById(
                "signupPassword"
            )
            .value;


    if (
        name === ""
        ||
        email === ""
        ||
        password === ""
    ) {

        showToast(
            "Fill all fields"
        );

        return;
    }


    let users =
        JSON.parse(
            localStorage.getItem(
                "users"
            )
        )
        || [];


    let emailExists =
        users.find(
            user =>
                user.email === email
        );

    if (emailExists) {

        showToast(
            "Email already exists"
        );

        return;
    }


    // OTP

    let otp =
        Math.floor(
            100000
            +
            Math.random()
            * 900000
        );

    alert(
        "Your OTP is: "
        +
        otp
    );

    let enteredOTP =
        prompt(
            "Enter OTP"
        );

    if (
        enteredOTP != otp
    ) {

        showToast(
            "Wrong OTP"
        );

        return;
    }




    users.push({

        name: name,
        email: email,
        password: password,
        image: "",
        online: false,
        notifications: []
    });


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    showToast(
        "Account Created!"
    );

    showLogin();
}


// LOGIN

function login() {

    let email =
        document
            .getElementById(
                "loginEmail"
            )
            .value;

    let password =
        document
            .getElementById(
                "loginPassword"
            )
            .value;


    let users =
        JSON.parse(
            localStorage.getItem(
                "users"
            )
        )
        || [];


    let foundUser =
        users.find(
            user =>
                user.email === email
                &&
                user.password === password
        );


    if (foundUser) {

        // ONLINE STATUS

        users =
            users.map(user => {

                if (
                    user.email
                    ===
                    foundUser.email
                ) {

                    user.online =
                        true;
                }

                return user;
            });


        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        // UPDATE CURRENT USER

        foundUser.online =
            true;

        localStorage.setItem(
            "currentUser",
            JSON.stringify(
                foundUser
            )
        );


        showToast(
            "Login Successful!"
        );


        setTimeout(
            () => {

                window.location.href =
                    "dashboard.html";

            },
            1000
        );
    }

    else {

        showToast(
            "Wrong Credentials"
        );
    }
}


// FORGOT PASSWORD

function showForgotPassword() {

    let email =
        prompt(
            "Enter registered email"
        );

    if (!email) {
        return;
    }

    let users =
        JSON.parse(
            localStorage.getItem(
                "users"
            )
        )
        || [];


    let user =
        users.find(
            u =>
                u.email === email
        );


    if (user) {

        alert(
            "Your Password: "
            +
            user.password
        );
    }

    else {

        alert(
            "No account found"
        );
    }
}


// TOAST

function showToast(message) {

    let toast =
        document
            .getElementById(
                "toast"
            );

    if (!toast) {
        return;
    }

    toast.innerText =
        message;

    toast.classList.add(
        "show-toast"
    );

    setTimeout(
        () => {

            toast.classList.remove(
                "show-toast"
            );

        },
        3000
    );
}