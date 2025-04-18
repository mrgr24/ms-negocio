import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/polizas", "PolizasController.find");
    Route.get("/polizas/:id", "PolizasController.find");
    Route.post("/polizas", "PolizasController.create");
    Route.put("/polizas/:id", "PolizasController.update");
    Route.delete("/polizas/:id", "PolizasController.delete");
});