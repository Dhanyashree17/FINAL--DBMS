// Contents of script.js

function storeUserInfoInLocalStorage(email, userId) {
    // Check if both email and userId are provided
    if (email && userId) {
        // Store the email and userId in local storage
        localStorage.setItem('email', email);
        localStorage.setItem('userId', userId);
        console.log('User information stored in local storage:', { email, userId });
    } else {
        console.error('Email or userId is missing. User information not stored in local storage.');
    }
}

// Other functions and logic related to your application
