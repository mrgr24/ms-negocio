import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/operarios", "OperariosController.find");
    Route.get("/operarios/:id", "OperariosController.find");
    Route.post("/operarios", "OperariosController.create");
    Route.put("/operarios/:id", "OperariosController.update");
    Route.delete("/operarios/:id", "OperariosController.delete");
});