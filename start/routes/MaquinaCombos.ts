import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/maquinas_combos", "MaquinasCombosController.find");
    Route.get("/maquinas_combos/:id", "MaquinasCombosController.find");
    Route.post("/maquinas_combos", "MaquinasCombosController.create");
    Route.put("/maquinas_combos/:id", "MaquinasCombosController.update");
    Route.delete("/maquinas_combos/:id", "MaquinasCombosController.delete");
});