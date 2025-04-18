import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/mantenimientos", "MantenimientosController.find");
    Route.get("/mantenimientos/:id", "MantenimientosController.find");
    Route.post("/mantenimientos", "MantenimientosController.create");
    Route.put("/mantenimientos/:id", "MantenimientosController.update");
    Route.delete("/mantenimientos/:id", "MantenimientosController.delete");
});