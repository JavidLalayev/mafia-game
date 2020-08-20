import io from 'socket.io-client';

let link = "http://localhost:3000/";

const socket = io(link);

export default socket;