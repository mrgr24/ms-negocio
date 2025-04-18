import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/combos", "CombosController.find");
    Route.get("/combos/:id", "CombosController.find");
    Route.post("/combos", "CombosController.create");
    Route.put("/combos/:id", "CombosController.update");
    Route.delete("/combos/:id", "CombosController.delete");
});