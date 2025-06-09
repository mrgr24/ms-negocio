import Ws from 'App/Services/Ws'
Ws.boot() //Llamado al metodo boot para inicializar el servidor de WebSockets
/**
* Listen for incoming socket connections
*/
Ws.io.on('connection', (socket) => { //Comienza a escuchar conexiones entrantes
    console.log("nuevo dispositivo conectado")
    let id = socket.id; //Obtiene el id del socket que puedo saber quien se conecta
    const body = socket.handshake.query
    console.log("body del socket " + JSON.stringify(body))
    console.log("se conectó " + id)
    socket.emit('notifications', { hello: 'world' })
})
//Configuracion para que el servidor este a la escucha de clientes

//Cuantas personas se conectan al socket