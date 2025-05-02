import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/maquina_combos", "MaquinasCombosController.find");
    Route.get("/maquina_combos/:id", "MaquinasCombosController.find");
    Route.post("/maquina_combos", "MaquinasCombosController.create");
    Route.put("/maquina_combos/:id", "MaquinasCombosController.update");
    Route.delete("/maquina_combos/:id", "MaquinasCombosController.delete");
});