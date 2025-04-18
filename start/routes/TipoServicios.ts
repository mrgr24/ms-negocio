import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/tipo_servicios", "TipoServiciosController.find");
    Route.get("/tipo_servicios/:id", "TipoServiciosController.find");
    Route.post("/tipo_servicios", "TipoServiciosController.create");
    Route.put("/tipo_servicios/:id", "TipoServiciosController.update");
    Route.delete("/tipo_servicios/:id", "TipoServiciosController.delete");
});