class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = database.collection('chats');
        this.unsub;
    }

    addChat = async (message) => {
        const now = new Date();

        const chat = {
            message,
            room: this.room,
            username: this.username,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };

        const response = await this.chats.add(chat);
        return response;
    }
}