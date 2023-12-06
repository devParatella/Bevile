document.addEventListener("DOMContentLoaded", () => {
    const messagesContainer = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", () => {
        const messageText = messageInput.value;
        if (messageText.trim() !== "") {
            // Create and append a new message element
            const messageElement = document.createElement("div");
            messageElement.innerText = messageText;
            messagesContainer.appendChild(messageElement);

            // Clear the input field
            messageInput.value = "";

            // Optionally, send the message to a server for processing and storage
            // You can use WebSocket or AJAX for this purpose.
        }
    });
});
