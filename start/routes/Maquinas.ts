import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/maquinas", "MaquinasController.find");
    Route.get("/maquinas/:id", "MaquinasController.find");
    Route.post("/maquinas", "MaquinasController.create");
    Route.put("/maquinas/:id", "MaquinasController.update");
    Route.delete("/maquinas/:id", "MaquinasController.delete");
});