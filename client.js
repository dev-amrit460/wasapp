const socket = io();

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container1");
var audio = new Audio('tune.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play()
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    var ms = new Set(message);
    if (message.length != 0) {
        if (ms.size == 1 && ms.has(" ")) {

        }
        else {
            append(`you: ${message}`, 'right');
            socket.emit('send', message);
            messageInput.value = '';
        }

    }

})
let name = prompt("Your Name Please : ");
if(name==undefined || name==null || name==""){
    name="Person";
};

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
})
socket.on('left', name => {
    append(`${name} left the chat`, 'left');
})