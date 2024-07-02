const socketIO = (server: any) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: true,
            credentials: true
        }
    });

    const global = new Map();

    io.on('connection', (socket: any) => {
        socket.on('add-user', (userId: any) => {
            global.set(userId, socket.id);
        });

        socket.on('send-msg', (data: {
            senderId: string,
            receiverId: string,
            message: any,
            chat?: any
        }) => {
            const receiverId = data.receiverId;
            const userOnline = global.get(receiverId);
            if (userOnline) {
                if (data.chat) {
                    socket.to(userOnline).emit('msg-receive', { message: data.message, chat: data.chat });
                }
                else socket.to(userOnline).emit('msg-receive', { message: data.message });
            }
        });
    });
}

export default socketIO;
