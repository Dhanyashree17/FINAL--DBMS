document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM content loaded');

  const profileButton = document.getElementById('profileButton');
  const userDetailsContainer = document.getElementById('userDetailsContainer');
  const logoutButton = document.getElementById('logoutButton');

  if (profileButton && userDetailsContainer && logoutButton) {
      console.log('Profile button found');

      profileButton.addEventListener('click', function () {
          console.log('Profile button clicked');

          // Retrieve the email from local storage
          const email = localStorage.getItem('email');

          if (email) {
              console.log('Email found in local storage:', email);
              // If email exists, display user details
              displayUserDetails(email);
              userDetailsContainer.style.display = 'block';
          } else {
              console.error('Email not found in local storage');
              // Handle the case when email is not found in local storage
          }
      });

      // Logout button click event
      logoutButton.addEventListener('click', function () {
          console.log('Logout button clicked');
          // Clear user details from local storage
          localStorage.removeItem('email');
          // Redirect to home page
          const baseUrl = window.location.protocol + '//' + window.location.host;
          window.location.href = baseUrl + '/home.html';
      });
  } else {
      console.error('Profile button, user details container, or logout button not found');
      // Handle the case when any of these elements are not found
  }

  function displayUserDetails(email) {
      // Fetch user details using the email
      fetchUserDetails(email);
  }

  function fetchUserDetails(email) {
      fetch(`/api/userDetails/${email}`)
          .then(handleResponse)
          .then(data => {
              console.log('User details:', data);

              // Clear previous content (if any)
              userDetailsContainer.innerHTML = '';

              // Create elements to display user details
              const userDetailsHeader = document.createElement('h2');
              userDetailsHeader.textContent = 'User Details';
              const userDetailsList = document.createElement('ul');

              // Add user details as list items
              const keys = Object.keys(data);
              keys.forEach(key => {
                  const listItem = document.createElement('li');
                  listItem.textContent = `${key}: ${data[key]}`;
                  userDetailsList.appendChild(listItem);
              });

              // Append elements to userDetailsContainer
              userDetailsContainer.appendChild(userDetailsHeader);
              userDetailsContainer.appendChild(userDetailsList);
          })
          .catch(handleError);
  }

  // Function to handle fetch response
  function handleResponse(response) {
      if (response.ok) {
          return response.json();
      } else {
          return response.json().then(data => {
              throw new Error(data.error);
          });
      }
  }

  // Function to handle errors
  function handleError(error) {
      console.error('Error fetching user details:', error);
      // Handle the error appropriately
  }
});

function loginAndRedirect() {
  const email = document.getElementById('loginemail').value;
  const password = document.getElementById('loginpassword').value;

  fetch('/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          return response.json().then(data => {
              throw new Error(data.error);
          });
      }
  })
  .then(data => {
      const email = data.email;
      const userId = data.id;

      // Store user information in local storage
      storeUserInfoInLocalStorage(email, userId);

      // Fetch and display user details using the email
      fetchUserDetails(email);

      // Redirect to home page
      const baseUrl = window.location.protocol + '//' + window.location.host;
      window.location.href = baseUrl + '/home.html';
  })
  .catch(error => {
      console.error('Error logging in:', error);
      alert(error.message);
  });
}

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
