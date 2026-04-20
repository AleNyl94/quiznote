import { Server } from 'socket.io'

/**
 * Setting up the web-socket connection.
 *
 * @param {*} server The server.
 */
export const setupSocket = (io) => {
  // Logs in the console when user is connected to the application
  io.on('connection', (socket) => {
    console.log('User Connected', socket.id)
    // TODO add connections for when websocket usage is needed, quiz or notes etc.
    socket-on('disconnect', () => {
      console.log('User Disconnected')
    })
  })
}