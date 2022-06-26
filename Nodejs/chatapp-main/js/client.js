const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messagecontainer = document.querySelector(".container");
var audio = new Audio('tune.mp3');


const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position == 'left'){
    audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = ''
})


 const myname = prompt("Enter your name to join");
socket.emit('new-user-joined', myname);

socket.on('user-joined' , myname=>{
    append (`${myname} joined the chat`,'left')
})


socket.on('receive' , data=>{
    append (`${data.myname}: ${data.message}`,'left')
})

socket.on('left' , myname=>{
    append (`${myname} left the chat`,'left')
})