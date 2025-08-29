document.addEventListener('DOMContentLoaded', function () {
    // Profile Edit/View Elements
    const editProfileBtn = document.getElementById('editProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editProfileSection = document.getElementById('editProfileSection');
    const profileEditForm = document.getElementById('profileEditForm');
    // Assuming the display section is the direct previous sibling or identifiable uniquely
    // For this example, let's assume editProfileBtn is inside the display section card
    const displaySection = editProfileBtn ? editProfileBtn.closest('.profile-section') : null;


    // Display fields (spans)
    const displayFullName = document.getElementById('displayFullName');
    const displaySchool = document.getElementById('displaySchool');
    const displayInterests = document.getElementById('displayInterests');
    const displaySkills = document.getElementById('displaySkills');

    // Edit form fields
    const editFullName = document.getElementById('editFullName');
    const editSchool = document.getElementById('editSchool');
    const editInterests = document.getElementById('editInterests');
    const editSkills = document.getElementById('editSkills');

    // Logout Button
    // Assuming a common structure for logout link in the navbar across pages
    const logoutLinks = document.querySelectorAll('a.nav-link[href="login.html"]'); // More generic selector

    // --- 1. Toggle Edit Mode & Update Display ---
    if (editProfileBtn && editProfileSection && profileEditForm && displaySection) {
        editProfileBtn.addEventListener('click', () => {
            // Populate edit form with current display values before showing
            editFullName.value = displayFullName.textContent;
            editSchool.value = displaySchool.textContent;
            editInterests.value = displayInterests.textContent;
            editSkills.value = displaySkills.textContent;

            editProfileSection.style.display = 'block';
            displaySection.style.display = 'none'; // Hide display section
        });

        cancelEditBtn.addEventListener('click', () => {
            editProfileSection.style.display = 'none';
            displaySection.style.display = 'block'; // Show display section
        });

        profileEditForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // --- 2. Form Validation ---
            const fullNameValue = editFullName.value.trim();
            if (!fullNameValue) {
                Swal.fire({
                    icon: 'error',
                    title: 'Validation Error',
                    text: 'Full Name cannot be empty!',
                });
                return;
            }

            // Simulate Save: Update display fields with new values from the form
            displayFullName.textContent = fullNameValue;
            displaySchool.textContent = editSchool.value.trim();
            displayInterests.textContent = editInterests.value.trim();
            displaySkills.textContent = editSkills.value.trim();

            // Hide edit form and show display section
            editProfileSection.style.display = 'none';
            displaySection.style.display = 'block';

            Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your profile has been updated successfully.',
                timer: 2000,
                showConfirmButton: false
            });
        });
    }


    // --- 3. Logout Functionality ---
    logoutLinks.forEach(logoutLink => {
        // Check if it's the logout link specifically from user_profile.html context, if necessary
        // For now, attaching to any link that leads to login.html and has nav-link class
        if (logoutLink.textContent.trim().toLowerCase() === 'logout') { // Make sure it's the "Logout" link
            logoutLink.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent default link navigation
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You will be logged out.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6', // Or var(--primary-accent-blue) if accessible
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, logout!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Perform actual logout (clear session, etc.) in a real app
                        window.location.href = 'login.html'; // Redirect to login page
                    }
                });
            });
        }
    });

});
