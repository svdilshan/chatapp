document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-form form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            // Get form field values
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            // Required Fields Check
            if (!email && !password) {
                Swal.fire({
                    icon: 'error',
                    title: 'Missing Fields',
                    text: 'Please fill in both email and password.',
                });
                return; // Stop further validation
            } else if (!email) {
                Swal.fire({
                    icon: 'error',
                    title: 'Missing Email',
                    text: 'Please fill in your email address.',
                });
                return; // Stop further validation
            } else if (!password) {
                Swal.fire({
                    icon: 'error',
                    title: 'Missing Password',
                    text: 'Please fill in your password.',
                });
                return; // Stop further validation
            }

            // Email Validation (Basic)
            if (email && (!email.includes('@') || !email.includes('.'))) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Email',
                    text: 'Please enter a valid email address.',
                });
                return; // Stop further validation
            }

            // If all checks pass
            Swal.fire({
                icon: 'success',
                title: 'Validation Successful!',
                text: 'Login data is valid!',
                // timer: 2000, // Optional: auto-close timer
                // showConfirmButton: false // Optional: hide confirm button
            });

            // For now, we are not submitting the form to any backend.
            // In a real application, this is where you would proceed with form submission.
            // Example: loginForm.submit(); or an AJAX request.
        });
    }
});
