import Ws from '@adonisjs/websocket-client';

const URL = process.env.WS;

export class SocketConnection {

    connect( handler, options ) {
      this.ws = Ws(URL, options ).connect();
  
      this.ws.on('open', () => {
        console.log('Connection initialized')
        handler({ type: 'online'})
      });
  
      this.ws.on('close', () => {
        console.log('Connection closed')
        handler({ type: 'offline'})
      });
  
      return this;
    }
  
    subscribe (channel, handler ) {
      
      if (!this.ws) {
        setTimeout(() => this.subscribe(channel), 1000)
      } else {
        const result = this.ws.subscribe(channel);
        
        result.on('message', message => {
          console.log('Incoming', message);
          handler(message)
        });
  
        result.on('error', (error) => {
          console.error(error)
        });

        return result
      }
    }

  }
  
export default new SocketConnection()
