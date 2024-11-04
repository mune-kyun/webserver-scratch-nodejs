import * as net from "net";

/*
Listening socket:
- bind & listen
- accept
- close

Connection socket:
- read
- write
- close
*/

// listening socket
let server = net.createServer();
server.on('connection', newConn);   // on accept
server.on('error', (err: Error) => { throw err; });
server.listen({host: '127.0.0.1', port: 1234});

function newConn(socket: net.Socket): void {
    console.log('new connection', socket.remoteAddress, socket.remotePort);

    socket.on('end', () => {
        // FIN received. The connection will be closed automatically.
        console.log('EOF.');
    });

    socket.on('data', (data: Buffer) => {
        console.log('data:', data);
        socket.write(data); // echo back the data to peers

        // actively closed the connection if the data contains 'q'
        socket.end();
    });
}
