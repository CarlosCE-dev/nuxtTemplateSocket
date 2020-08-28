<template>
  <div>
      <h1>Hola Mundo</h1>
  </div>
</template>

<script>

import SocketConnection from '~/classes/SocketChat';

export default {
  data:() => ({
    chatSubscription: null,
    id: null,
  }),
  created () {
    this.connect();
  },
  methods: {
    connect() {
      // Se realiza la conexion al servidor de socket
      const options = { query: { id: this.id } };
      SocketConnection.connect( this.handleSocketEvents, options );
      
      this.chatSubscription = SocketConnection.subscribe('socketManager', this.handleSocketEvents );
    },
    handleSocketEvents( message ){
    }
  },
  asyncData({ route }) {
    const { id } = route.query;
    return { id };
  }
}
</script>

<style scoped>

</style>