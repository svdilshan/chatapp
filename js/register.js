document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.querySelector('.registration-form form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            // Get form field values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const userType = document.getElementById('userType').value;

            let missingFields = [];

            // Required Fields Check
            if (!fullName) missingFields.push('Full Name');
            if (!email) missingFields.push('Email Address');
            if (!password) missingFields.push('Password');
            if (!confirmPassword) missingFields.push('Confirm Password');
            if (!userType) missingFields.push('User Type'); // Also check userType

            if (missingFields.length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Missing Fields',
                    text: `Please fill in all required fields: ${missingFields.join(', ')}`,
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

            // Password Match Check
            if (password !== confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Password Mismatch',
                    text: 'Passwords do not match!',
                });
                return; // Stop further validation
            }

            // If all checks pass
            Swal.fire({
                icon: 'success',
                title: 'Validation Successful!',
                text: 'Registration data is valid!',
                // timer: 2000, // Optional: auto-close timer
                // showConfirmButton: false // Optional: hide confirm button
            });

            // For now, we are not submitting the form to any backend.
            // In a real application, this is where you would proceed with form submission.
            // Example: registrationForm.submit(); or an AJAX request.
        });
    }
});
