document.addEventListener('DOMContentLoaded', function () {
    // --- DOM Elements ---
    const instructorAssignedCard = document.getElementById('instructorAssignedCard');
    const noInstructorCard = document.getElementById('noInstructorCard');
    const contactSupportBtn = noInstructorCard ? noInstructorCard.querySelector('.btn-outline-info') : null;

    // --- Logic to Simulate Instructor Assignment ---
    // In a real app, this would be based on data fetched from a server
    // or user's state (e.g., after completing an assessment).
    // For this demo, we'll use a simple flag.
    // Try changing this to false to see the other state.
    const isInstructorAssigned = true; 

    if (instructorAssignedCard && noInstructorCard) {
        if (isInstructorAssigned) {
            instructorAssignedCard.style.display = 'block';
            noInstructorCard.style.display = 'none';
        } else {
            instructorAssignedCard.style.display = 'none';
            noInstructorCard.style.display = 'block';
        }
    }

    // --- Event Listeners ---
    if (contactSupportBtn) {
        contactSupportBtn.addEventListener('click', function (event) {
            event.preventDefault();
            Swal.fire({
                title: 'Contact Support',
                text: 'This would typically open a support request form or provide contact details.',
                icon: 'info',
                confirmButtonText: 'Got it!'
            });
        });
    }

    // Example: Add SweetAlert to "Send Message" button if it exists
    const sendMessageBtn = document.querySelector('a.btn-success[href="chat.html"]');
    if (sendMessageBtn && isInstructorAssigned) { // Only if instructor is assigned
        sendMessageBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default navigation
            Swal.fire({
                title: 'Open Chat?',
                text: `You are about to open a chat with ${document.getElementById('assignedInstructorName')?.textContent || 'your instructor'}.`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, open chat!',
                cancelButtonText: 'Not now'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'chat.html'; // Proceed to chat page
                }
            });
        });
    }
});
