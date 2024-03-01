import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class SocketClient implements OnModuleInit {
  public socketClient: Socket;

  constructor() {
    this.socketClient = io('http://localhost/3000');
  }

  onModuleInit(): any {
    this.registerConsumerEvent();
  }

  private registerConsumerEvent() {
    this.socketClient.emit('newMessage', { msg: 'hi' });
    this.socketClient.on('client', () => {
      console.log('connect to the gateway');
    });
    this.socketClient.on('onMessage', (payload: object) => {
      console.log(payload);
    });
  }
}
