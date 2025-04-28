import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/repuestos", "RepuestosController.find");
    Route.get("/repuestos/:id", "RepuestosController.find");
    Route.post("/repuestos", "RepuestosController.create");
    Route.put("/repuestos/:id", "RepuestosController.update");
    Route.delete("/repuestos/:id", "RepuestosController.delete");
});