// this is the location where the server is hosting our socket.io
const socket = io('http://localhost:8080');

const messageForm = document.getElementById('send-container');
const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');

const name = prompt('What is your name?');
appendMessage("You joined the chat");

socket.emit('new-user', name);

socket.on('user-connected', name => {
    appendMessage(`${name} connected`);
})
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
   const message = messageInput.value;
   appendMessage(`You : ${message}`);
    // now send this message from client to the sever
    socket.emit('send-chat-message', message);
    messageInput.value = '';
})

// when the chat-message event trigger we receive some data from our server
socket.on('chat-message', data => {
    appendMessage(`${data.name} : ${data.message}`);
})

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    chatContainer.append(messageElement);
}

