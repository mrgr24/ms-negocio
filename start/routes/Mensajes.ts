import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/mensajes", "MensajesController.find");
    Route.get("/mensajes/:id", "MensajesController.find");
    Route.post("/mensajes", "MensajesController.create");
    Route.put("/mensajes/:id", "MensajesController.update");
    Route.delete("/mensajes/:id", "MensajesController.delete");
});