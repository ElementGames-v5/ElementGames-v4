// Firebase Authentication and Firestore setup

const auth = firebase.auth();

const db = firebase.firestore();



// Access to Firestore collections

const usersCollection = db.collection("users");

const chatsCollection = db.collection("chats"); // Collection to store chat documents



// Initialize currentUser as a placeholder for now

let currentUser = { uid: "", name: "" };



// Firebase Auth listener to get the current user info

auth.onAuthStateChanged(user => {

    if (user) {

        currentUser.uid = user.uid;

        fetchCurrentUserName(user.uid);

    } else {

        console.log("No user is signed in");

    }

});



// Fetch the current user's name from Firestore

async function fetchCurrentUserName(uid) {

    try {

        const doc = await usersCollection.doc(uid).get();

        if (doc.exists) {

            currentUser.name = doc.data().name;

        } else {

            console.log("No user document found");

        }

    } catch (error) {

        console.error("Error fetching current user name:", error);

    }

}



// Search for a user by name

// Search for a user by name
async function searchUser() { // Removed the 'username' parameter
    try {
        const querySnapshot = await usersCollection.get(); // Get all documents from the collection

        const users = [];
        querySnapshot.forEach(doc => {
            users.push({ uid: doc.id, ...doc.data() });
        });

        return users;
    } catch (error) {
        console.error("Error searching users:", error);
    }
}



// Display users in search results

document.getElementById('userSearchBtn').addEventListener('click', async () => {

    const username = document.getElementById('userSearchInput').value;

    const users = await searchUser(username);



    const userList = document.getElementById('userList');

    userList.innerHTML = '';



    if (users.length === 0) {

        userList.innerHTML = `<p>No users found</p>`;

    } else {

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



// Function to start a chat between two users

async function startChat(user1Id, user2Id) {

    const chatId = [user1Id, user2Id].sort().join("_"); // Unique ID based on both user IDs

    const chatDocRef = chatsCollection.doc(chatId);



    try {

        // Create a new chat document if it doesn't exist

        const chatDoc = await chatDocRef.get();

        if (!chatDoc.exists) {

            await chatDocRef.set({

                users: [user1Id, user2Id],

                createdAt: new Date(),

            });

        }

        return chatDocRef;

    } catch (error) {

        console.error("Error starting chat:", error);

    }

}



// Start a chat with selected user

let currentChatDoc = null; // Make sure this is defined at the top level for use in other functions

async function startChatWithUser(otherUserId, otherUserName) {

    try {

        if (!currentUser.uid) {

            console.error("Current user UID is not available");

            return;

        }



        currentChatDoc = await startChat(currentUser.uid, otherUserId); // Store the chat document reference here

        document.getElementById('messageList').innerHTML = '';

        listenForMessages(currentChatDoc, displayMessages);



        // Use setTimeout to give time for the DOM to update and ensure button is available

        setTimeout(() => {

            const sendMessageBtn = document.getElementById('sendMessageBtn');

            console.log("sendMessageBtn element:", sendMessageBtn); // Debugging line

            if (sendMessageBtn) {

                sendMessageBtn.addEventListener('click', async () => {

                    const messageText = document.getElementById('messageInput').value;

                    if (messageText.trim() !== "") {

                        if (currentChatDoc) { // Ensure currentChatDoc is available before sending the message

                            await currentChatDoc.collection("messages").add({

                                text: messageText,

                                senderId: currentUser.uid,

                                timestamp: new Date()

                            });

                            document.getElementById('messageInput').value = '';

                        } else {

                            console.error("No active chat found.");

                        }

                    }

                });

            } else {

                console.error("sendMessageBtn element not found.");

            }

        }, 100); // 100ms delay to give time for DOM to render



    } catch (error) {

        console.error("Error starting chat:", error);

    }

}



// Display messages in the chat window

function displayMessages(messages) {

    const messageList = document.getElementById('messageList');

    messageList.innerHTML = '';



    messages.forEach(message => {

        const messageItem = document.createElement('div');

        messageItem.className = message.senderId === currentUser.uid ? 'message-sent' : 'message-received';



        // Format the timestamp

        const timestamp = message.timestamp.toDate(); // Convert Firestore timestamp to Date object

        const options = { hour: 'numeric', minute: 'numeric' };

        const timeString = timestamp.toLocaleTimeString('en-US', options);



        // Add the time to the message element

        messageItem.innerHTML = `

            <p>${message.text}</p>

            <span class="message-time">${timeString}</span>

        `;



        messageList.appendChild(messageItem);

    });

}



// Listen for real-time updates to messages

function listenForMessages(chatDoc, callback) {

    chatDoc.collection("messages").orderBy("timestamp").onSnapshot((snapshot) => {

        const messages = snapshot.docs.map(doc => doc.data());

        callback(messages);

    });

}