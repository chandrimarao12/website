// // Event listener for pressing Enter in the input field
// document.getElementById('inputField').addEventListener('keydown', function(event) {
//     if (event.key === 'Enter' && this.value.trim() !== '') {
//         addMessage(this.value, 'user');
//         sendMessageToBackend(this.value);
//         this.value = '';  // Clear the input field
//     }
// });

// // Event listener for the send button
// document.getElementById('sendBtn').addEventListener('click', function() {
//     const message = document.getElementById('inputField').value;
//     if (message.trim() !== '') {
//         addMessage(message, 'user');
//         sendMessageToBackend(message);
//         document.getElementById('inputField').value = '';  // Clear the input field
//     }
// });

// // Event listener for image input
// document.getElementById('imageInput').addEventListener('change', function() {
//     const file = this.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             const imageUrl = e.target.result;
//             addMessage(`<img src="${imageUrl}" alt="Image" class="image-message">`, 'user');
//         };
//         reader.readAsDataURL(file);
//     }
// });

// // Function to add a message to the chat
// function addMessage(message, sender) {
//     const messageElement = document.createElement('div');
//     messageElement.classList.add('message', sender);
//     messageElement.innerHTML = message;
//     document.getElementById('messages').appendChild(messageElement);
//     scrollToBottom();
// }
// async function sendMessageToBackend(query) {
//     console.log(0);
//     try {
//         // Send the query to the backend
//         const response = await fetch('http://127.0.0.1:5000/summarize', { // Updated port
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ query }),
//         });
//         console.log("api call completed");
//         // Check if the response is OK
//         if (!response.ok) {
//             throw new Error(`Error: ${response.status}`);
//         }

//         // Parse the JSON response
//         const data = await response.json();

//         // Extract and display the summary
//         if (data && data.summary) {
//             addMessage(data.summary, 'bot');
//         } else {
//             addMessage("Sorry, I couldn't process that.", 'bot');
//         }
//     } catch (error) {
//         console.error('Error in sending request to backend:', error);
//         addMessage("There was an error processing your request. Please try again.", 'bot');
//     }
// }

// // Function to scroll the chat to the bottom
// function scrollToBottom() {
//     const messagesContainer = document.getElementById('messages');
//     messagesContainer.scrollTop = messagesContainer.scrollHeight;
// }
// Event listener for pressing Enter in the input field
document.getElementById('inputField').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && this.value.trim() !== '') {
        addMessage(this.value, 'user');
        sendMessageToBackend(this.value);
        this.value = '';  // Clear the input field
    }
});

// Event listener for the send button
document.getElementById('sendBtn').addEventListener('click', function() {
    const message = document.getElementById('inputField').value;
    if (message.trim() !== '') {
        addMessage(message, 'user');
        sendMessageToBackend(message);
        document.getElementById('inputField').value = '';  // Clear the input field
    }
});

function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = message;
    document.getElementById('messages').appendChild(messageElement);
    scrollToBottom();
    return messageElement; // Return the message element for later reference
}

function addLoadingAnimation() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('message', 'bot', 'loading-animation');
    loadingElement.innerHTML = `
        <div class="loading-spinner">
            <span>.</span><span>.</span><span>.</span>
        </div>
    `;
    document.getElementById('messages').appendChild(loadingElement);
    scrollToBottom();
    return loadingElement; // Return the loading element for later reference
}

// Function to remove a specific message
function removeMessage(messageElement) {
    if (messageElement && messageElement.parentNode) {
        messageElement.parentNode.removeChild(messageElement);
    }
}

// Function to send a message to the backend and handle the response
// async function sendMessageToBackend(query) {
//     const loadingMessage = addLoadingAnimation(); // Add loading message
//     try {
//         // Send the query to the backend
//         const response = await fetch('http://127.0.0.1:5000/summarize', { // Updated port
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ query }),
//         });

//         // Remove the loading message once the API call completes
//         removeMessage(loadingMessage);

//         // Check if the response is OK
//         if (!response.ok) {
//             throw new Error(`Error: ${response.status}`);
//         }

//         // Parse the JSON response
//         const data = await response.json();

//         // Extract and display the summary
//         if (data && data.summary) {
//             addMessage(data.summary, 'bot');
//         } else {
//             addMessage("Sorry, I couldn't process that.", 'bot');
//         }
//     } catch (error) {
//         console.error('Error in sending request to backend:', error);

//         // Remove the loading message if an error occurs
//         removeMessage(loadingMessage);

//         addMessage("There was an error processing your request. Please try again.", 'bot');
//     }
// }

async function sendMessageToBackend(query) {
    const loadingMessage = addLoadingAnimation(); // Add loading message
    try {
        // Send the query to the backend
        const response = await fetch('https://magnetic-celka-chandrima-ac1425a3.koyeb.app/summarize', { // Updated port
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        // Remove the loading message once the API call completes
        removeMessage(loadingMessage);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Extract and display the summary
        if (data && data.summary) {
            addMessage(data.summary, 'bot');
            let msg="";
            // Display the search results with URLs
            if (data.results && data.results.length > 0) {
                let linksMessage = "These are the links from which the summary is taken:<br>";
                data.results.forEach(result => {
                    linksMessage += `<a href="${result.url}" target="_blank">${result.url}</a><br>`;
                });

                const linksElement = document.createElement('div');
                linksElement.classList.add('message', 'bot');
                linksElement.innerHTML = linksMessage;
                document.getElementById('messages').appendChild(linksElement);
                scrollToBottom();
            }
        } else {
            addMessage("Sorry, I couldn't process that.", 'bot');
        }
    } catch (error) {
        console.error('Error in sending request to backend:', error);

        // Remove the loading message if an error occurs
        removeMessage(loadingMessage);

        addMessage("There was an error processing your request. Please try again.", 'bot');
    }
}


// Function to scroll the chat to the bottom
function scrollToBottom() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

