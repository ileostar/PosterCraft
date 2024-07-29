import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newMessage')
  handleMessage(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    this.server.emit('onMessage', {
      msg: 'new Message',
      content: body,
    });
  }

  // 接收客户端消息的处理器
  @SubscribeMessage('messageToClient')
  handleMessageToClient(@MessageBody() data: string): void {
    console.log('Received message from client:', data);
    // 在这里处理接收到的消息，比如转发给其他客户端
  }

  // 发送消息给所有客户端的方法
  sendMessageToAll(message: string): void {
    this.server.emit('messageToAll', message);
  }

  // 发送消息给特定客户端（假设你有某种方式来确定socketId）
  sendMessageToClient(socketId: string, message: string): void {
    this.server.to(socketId).emit('messageToClient', message);
  }
}
