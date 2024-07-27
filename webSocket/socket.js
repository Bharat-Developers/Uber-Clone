import { io } from "socket.io-client";

const URL = process.env.SOCKET_LINK 

// https://socket.io/docs/v4/middlewares/   part Sending credentials
const socket = io(URL, {autoConnect: false,auth: {
    token: localStorage.getItem('token') ,
    user: ''// driver or rider
} },)

socket.onAny((event, ...args) => {
    console.log(event, args);
  });
  

// when component is created
// created() {
//     socket.on("connect_error", (err) => {
//       if (err.message === "invalid username") {
//         this.usernameAlreadySelected = false;
//       }
//     });
//   }

//when component is destroyed
// destroyed() {
//     socket.off("connect_error");
//   }

export default socket;


//on submit form (go button)
// socket.emit('register', token);



// notes
// socket component will be render when driver click go button ,
// the middleware will authenticate the token , then add connection to collection list on serve
// socket compenent will unmount on driver click , then connection will be removed on disconnect


// rider will enbale on socket when source and destination address is give and confrim buttom is clicked
// then token is verified at middleware , id is store in server collection list ,
// on trip end socket will close and id will be delete from collection list