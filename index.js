const chatList = document.querySelector(".chat-list");
const addChatForm = document.querySelector(".new-chat");
const updateUsernameForm = document.querySelector(".new-name");
const updateMessage = document.querySelector(".update-message");
const chatRooms = document.querySelector(".chat-rooms");

const chatUi = new ChatUI(chatList);

const defaultRoom = "general";
const defaultUsername = "Anonymous";
const usernameFromLocalStorage = localStorage.username;
const username = usernameFromLocalStorage ? usernameFromLocalStorage : defaultUsername;
const chatroom = new Chatroom(defaultRoom, username);

addChatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = addChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => {
            addChatForm.reset();
        })
        .catch((error) => {
            console.log("Error is: ", error);
        });
});

updateUsernameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = updateUsernameForm.name.value.trim();
    updateUsernameForm.reset();
    chatroom.updateUsername(username);
    updateMessage.innerHTML = `
        Your name has been updated to 
        <span class="text-info fs-4 text-capitalize">${username}</span> !!
    `;
    setTimeout(() => {
        updateMessage.innerText = '';
    }, 3000);
});

chatRooms.addEventListener('click', (event) => {
    if (event.target.tagName === "BUTTON") {
        chatUi.clear();
        const room = event.target.getAttribute('id');
        chatroom.updateRoom(room);
        loadChats();
    }
});

const loadChats = () => {
    chatroom.getChats((data) => {
        chatUi.render(data);
    });
}

loadChats();