const chatList = document.querySelector(".chat-list");
const addChatForm = document.querySelector(".new-chat");

const defaultRoom = "general";
const defaultUsername = "Anonymous";
const chatroom = new Chatroom(defaultRoom, defaultUsername);
const chatUi = new ChatUI(chatList);

chatroom.getChats((data) => {
    chatUi.render(data);
})