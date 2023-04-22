import { io } from 'socket.io-client';
import { sockURL } from './config';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 7000,
        transports: ['websocket'],
    };
    return io(sockURL, options);
};
