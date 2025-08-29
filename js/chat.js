document.addEventListener('DOMContentLoaded', function () {
    // --- DOM Elements ---
    const body = document.querySelector('body.chat-page'); // For mobile view switching
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const messageInput = document.getElementById('messageInput');
    const messageArea = document.getElementById('messageArea');
    const emojiBtn = document.getElementById('emojiBtn');
    const attachBtn = document.getElementById('attachBtn');
    const chatListItems = document.querySelectorAll('.chat-list .list-group-item');
    const chatHeaderUserName = document.querySelector('.chat-header .user-name');
    const backToChatListBtn = document.getElementById('backToChatListBtn');
    // const chatHeaderUserStatus = document.querySelector('.chat-header .user-status'); // If dynamic status needed

    // --- Functions ---
    function addMessage(text, type, time) {
        if (!text.trim()) return;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.textContent = text;

        const timeDiv = document.createElement('div');
        timeDiv.classList.add('message-time');
        timeDiv.textContent = time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        if (messageArea) {
            messageArea.appendChild(messageDiv);
            messageArea.scrollTop = messageArea.scrollHeight; // Auto-scroll to bottom
        }

        if (type === 'sent' && messageInput) {
            messageInput.value = ''; // Clear input after sending
        }
    }

    function simulateReply() {
        // More varied replies or context-based replies could be added here
        const replies = [
            "Thanks for your message! I'll get back to you shortly.",
            "Okay, I understand.",
            "Interesting point. Let me think about that.",
            "Can you provide more details?",
            "I'll look into that for you."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        addMessage(randomReply, 'received');
    }

    // --- Event Listeners ---
    if (sendMessageBtn && messageInput) {
        sendMessageBtn.addEventListener('click', () => {
            addMessage(messageInput.value, 'sent');
            // Simulate a reply (for demo purposes)
            setTimeout(simulateReply, 1000 + Math.random() * 1000); // Reply with slight delay
        });

        messageInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) { // Send on Enter, unless Shift+Enter for newline
                event.preventDefault(); // Prevent default newline in input
                sendMessageBtn.click();
            }
        });
    }

    if (emojiBtn) {
        emojiBtn.addEventListener('click', () => {
            Swal.fire({
                title: 'Emoji Feature',
                text: 'Emoji picker is not yet implemented.',
                icon: 'info',
                confirmButtonText: 'Okay'
            });
        });
    }

    if (attachBtn) {
        attachBtn.addEventListener('click', () => {
            Swal.fire({
                title: 'Attachment Feature',
                text: 'File attachment functionality is not yet implemented.',
                icon: 'info',
                confirmButtonText: 'Okay'
            });
        });
    }
    
    // Auto-scroll to bottom on initial page load if messages are present
    if (messageArea) {
        window.addEventListener('load', () => {
             messageArea.scrollTop = messageArea.scrollHeight;
        });
    }

    // Chat list item click handling (conceptual & mobile view switch)
    if (chatListItems.length > 0 && chatHeaderUserName) {
        chatListItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                // Remove active class from all items
                chatListItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');

                // Update chat header with the selected user's name
                const userNameElement = this.querySelector('h6'); // Target the h6 for name
                const userName = userNameElement ? userNameElement.textContent.trim() : "Selected Chat"; 
                
                if (chatHeaderUserName.firstChild && chatHeaderUserName.firstChild.nodeType === Node.ELEMENT_NODE) {
                    // If the first child is an icon, preserve it and update the text content next to it
                    chatHeaderUserName.childNodes[1].nodeValue = ` ${userName}`; // Update text node
                } else {
                     chatHeaderUserName.textContent = userName; // Fallback if no icon
                }
                // chatHeaderUserStatus.textContent = "Online"; // Or fetch actual status

                // Clear current messages and load new ones (conceptual)
                if(messageArea) messageArea.innerHTML = `<div class="text-center text-muted p-3">Messages with ${userName} would load here.</div>`;
                
                // Mobile Specific Action: Switch to conversation view
                if (body) {
                    body.classList.add('conversation-view-active');
                }

                // No SweetAlert for switching chat to avoid alert fatigue on mobile when just tapping to view.
                // The visual switch is the primary feedback.
            });
        });
    }

    // Handle Back Button Click/Tap (Mobile)
    if (backToChatListBtn && body) {
        backToChatListBtn.addEventListener('click', function() {
            body.classList.remove('conversation-view-active');
            // Optional: Clear active state from chat list items, or leave the last selected.
            // For now, leaving it selected is fine.
            // chatListItems.forEach(i => i.classList.remove('active'));
            // chatHeaderUserName.textContent = "Chats"; // Reset header
        });
    }
});
