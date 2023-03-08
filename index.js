const chatList = document.querySelector(".chat-list");
const addChatForm = document.querySelector(".new-chat");

const defaultRoom = "general";
const defaultUsername = "Anonymous";
const chatroom = new Chatroom(defaultRoom, defaultUsername);
const chatUi = new ChatUI(chatList);

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

chatroom.getChats((data) => {
    chatUi.render(data);
})