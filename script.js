const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_2 = document.getElementById('password2');

// Show Error Message Function
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';

    const errorMessage = formControl.querySelector('small');
    errorMessage.innerText = message;
}

// Show Successes Message Function
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check is email valid function
const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid')
    }
}

// Check for the required input
const checkRequiredInput = (inputArr) => {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getInputName(input)} is required`)
        } else {
            showSuccess(input)
        }
    });
}


// Uppercase the first letter of the input name
const getInputName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check the length of the username ad password input
const checkInputLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${getInputName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getInputName(input)}  must be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

// Check if the passwords match each other
const checkPasswordsMatch = (input_1, input_2) => {
    if (input_1.value !== input_2.value) {
        showError(password_2, 'Password do not match');
    }
}

// Event Listener
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputArr = [username, email, password, password_2];

    checkRequiredInput(inputArr);

    checkInputLength(username, 4, 12);
    checkInputLength(password, 6, 16);

    checkEmail(email);

    checkPasswordsMatch(password, password_2)
})