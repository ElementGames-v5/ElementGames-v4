// main.js
import { db } from './firebase-config.js';
import { collection, doc, setDoc, addDoc, getDoc, query, where, getDocs, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';

const usersCollection = collection(db, 'users');
const chatsCollection = collection(db, 'chats');

async function searchUser(username) {
    try {
        const q = query(usersCollection, where("name", "==", username));
        const querySnapshot = await getDocs(q);
        
        // Log to see the raw data structure received
        console.log("Query Snapshot:", querySnapshot);
        
        const users = [];
        querySnapshot.forEach(doc => {
            users.push({ uid: doc.id, ...doc.data() });
        });
        
        // Log the processed user list for verification
        console.log("Users Found:", users);
        return users;
    } catch (error) {
        console.error("Error searching users:", error);
    }
}


async function startChat(user1, user2) {
    const chatId = [user1, user2].sort().join("_"); // Ensures consistent chat ID order
    const chatDoc = doc(chatsCollection, chatId);

    // Create chat if it doesn't exist
    const chatSnapshot = await getDoc(chatDoc);
    if (!chatSnapshot.exists()) {
        await setDoc(chatDoc, { users: [user1, user2] });
    }
    return chatDoc;
}

async function sendMessage(chatDoc, senderId, text) {
    const messagesCollection = collection(chatDoc, "messages");
    await addDoc(messagesCollection, {
        senderId,
        text,
        timestamp: Date.now()
    });
}

function listenForMessages(chatDoc, callback) {
    const messagesCollection = collection(chatDoc, "messages");
    onSnapshot(messagesCollection, snapshot => {
        const messages = [];
        snapshot.forEach(doc => messages.push(doc.data()));
        messages.sort((a, b) => a.timestamp - b.timestamp); // Sort by time
        callback(messages);
    });
}

// Event Listeners for UI components
document.getElementById('userSearchBtn').addEventListener('click', async () => {
    const username = document.getElementById('userSearchInput').value;
    const users = await searchUser(username);
    // Display users in UI
});

document.getElementById('userSearchBtn').addEventListener('click', async () => {
    const username = document.getElementById('userSearchInput').value;
    const users = await searchUser(username);
    
    // Clear previous search results
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    if (users.length === 0) {
        userList.innerHTML = `<p>No users found</p>`;
    } else {
        // Display each found user with a button to start chat
        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.innerHTML = `
                <p>${user.name}</p>
                <button onclick="startChatWithUser('${user.uid}', '${user.name}')">Chat</button>
            `;
            userList.appendChild(userItem);
        });
    }
});

let currentChatDoc = null;  // Reference to the active chat document

async function startChatWithUser(otherUserId, otherUserName) {
    try {
        currentChatDoc = await startChat(currentUser.uid, otherUserId); // Assuming currentUser is defined
        document.getElementById('messageList').innerHTML = '';  // Clear current messages

        // Listen for messages and update the UI
        listenForMessages(currentChatDoc, displayMessages);
    } catch (error) {
        console.error("Error starting chat:", error);
    }
}

function displayMessages(messages) {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';  // Clear existing messages

    messages.forEach(message => {
        const messageItem = document.createElement('div');
        messageItem.className = message.senderId === currentUser.uid ? 'message-sent' : 'message-received';
        messageItem.innerText = message.text;
        messageList.appendChild(messageItem);
    });
}
