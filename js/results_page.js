document.addEventListener('DOMContentLoaded', function () {
    // --- DOM Elements ---
    const suggestedPathsEl = document.getElementById('suggestedPaths');
    const viewDetailedReportLink = document.getElementById('viewDetailedReportLink');
    const exploreEngineeringBtn = document.getElementById('exploreEngineeringBtn');
    const exploreITBtn = document.getElementById('exploreITBtn');
    const connectInstructorBtn = document.getElementById('connectInstructorBtn');
    const retakeAssessmentBtn = document.querySelector('.card-footer .btn-secondary'); // Retake button

    // --- Load and Display Results (Conceptual) ---
    function loadResults() {
        try {
            const storedResults = localStorage.getItem('mcqResults');
            const storedQuestions = localStorage.getItem('mcqQuestions'); // For context if needed

            if (storedResults && suggestedPathsEl) {
                const answers = JSON.parse(storedResults);
                // const questions = JSON.parse(storedQuestions); // If you need questions text

                // Simple logic to determine career path based on answers (placeholder)
                // This is highly simplistic and would be complex in a real app.
                let engineeringScore = 0;
                let creativeScore = 0;
                let businessScore = 0;
                let leadershipScore = 0;

                // Example: if question 1's answer 'A' leans to engineering, 'B' to creative etc.
                if (answers[0] === 'A') engineeringScore++;
                if (answers[0] === 'B') creativeScore++;
                if (answers[0] === 'C') businessScore++;
                if (answers[0] === 'D') leadershipScore++;
                
                if (answers[1] === 'A') engineeringScore++; // Assuming 'Quiet and independent' for engineering/analytical
                if (answers[1] === 'B') creativeScore++;   // 'Collaborative and bustling' for creative/leadership
                if (answers[1] === 'C') businessScore++;   // 'Structured and predictable' for business/data
                if (answers[1] === 'D') leadershipScore++; // 'Dynamic and fast-paced' for leadership

                // Add more scoring logic based on other answers...

                let paths = [];
                let description = "Based on your responses, these fields align well with your aptitudes: ";
                
                // Determine suggested paths (very basic example)
                const scores = { Engineering: engineeringScore, Creative: creativeScore, Business: businessScore, Leadership: leadershipScore };
                const maxScore = Math.max(...Object.values(scores));
                
                for (const path in scores) {
                    if (scores[path] === maxScore && maxScore > 0) {
                        paths.push(path);
                    }
                }

                if (paths.length === 0) { // Default if no clear path or few answers
                    paths.push("General Exploration");
                    description = "Your responses suggest a diverse set of interests. We recommend further exploration across various fields.";
                } else {
                    description += paths.join(', ') + ".";
                }

                suggestedPathsEl.innerHTML = `
                    Based on your responses, we suggest the following career path(s): 
                    <strong>${paths.join(', ')}</strong>.
                    <br><small>${description}</small>
                `;

                // Update CTA buttons based on results (example)
                if (exploreEngineeringBtn) exploreEngineeringBtn.style.display = paths.includes('Engineering') ? 'inline-block' : 'none';
                if (exploreITBtn) exploreITBtn.style.display = (paths.includes('Engineering') || paths.includes('IT') || paths.includes('Business')) ? 'inline-block' : 'none'; // Assuming IT can relate to Eng or Business

            } else if (suggestedPathsEl) {
                suggestedPathsEl.innerHTML = "Could not load your results. Please try retaking the assessment.";
            }
        } catch (e) {
            console.error("Error loading or parsing results from localStorage", e);
            if (suggestedPathsEl) {
                suggestedPathsEl.innerHTML = "There was an error displaying your results. Please try retaking the assessment.";
            }
        }
    }

    // --- Event Listeners for Buttons ---
    if (viewDetailedReportLink) {
        viewDetailedReportLink.addEventListener('click', (e) => {
            e.preventDefault();
            Swal.fire({
                title: 'Coming Soon!',
                text: 'A detailed report feature is currently under development.',
                icon: 'info',
                confirmButtonText: 'Got it!'
            });
        });
    }

    if (exploreEngineeringBtn) {
        exploreEngineeringBtn.addEventListener('click', () => {
            Swal.fire('Navigating...', 'Taking you to Engineering resources (placeholder).', 'info');
            // window.location.href = '/resources/engineering'; // Placeholder
        });
    }

    if (exploreITBtn) {
        exploreITBtn.addEventListener('click', () => {
            Swal.fire('Navigating...', 'Taking you to IT & Software Development resources (placeholder).', 'info');
            // window.location.href = '/resources/it'; // Placeholder
        });
    }

    if (connectInstructorBtn) {
        connectInstructorBtn.addEventListener('click', (e) => {
            e.preventDefault();
            Swal.fire('Navigating...', 'Taking you to the instructor connection page (placeholder).', 'info');
            // window.location.href = 'assigned_instructor_view.html'; // Or a dedicated connect page
        });
    }
    
    if (retakeAssessmentBtn) {
        retakeAssessmentBtn.addEventListener('click', (e) => {
            e.preventDefault();
             Swal.fire({
                title: 'Retake Assessment?',
                text: "Your previous results (if any) from this session might be cleared from the browser.",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, retake!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Optionally clear localStorage for results before retake
                    // localStorage.removeItem('mcqResults');
                    // localStorage.removeItem('mcqQuestions');
                    window.location.href = 'mcq_exam.html';
                }
            });
        });
    }

    // --- Initial Load ---
    if (document.querySelector('.results-container')) { // Check if we are on the results page
        loadResults();
    }
});
