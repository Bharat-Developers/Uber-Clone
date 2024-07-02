import { io } from "socket.io-client";

const URL = process.env.SOCKET_LINK

// https://socket.io/docs/v4/middlewares/   part Sending credentials
// https://socket.io/docs/v4/namespaces/    using namespace for rider

const value = `; ${document.cookie}`;
const parts = value.split(`; ${'Dtoken'}=`);
let token = null;
if (parts.length === 2) {
    token = parts.pop().split(';').shift();
}

const socket = io('http://localhost:5002/', {
    autoConnect: false, auth: {
        token: token,
        role: 'driver'
    }
},)

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket