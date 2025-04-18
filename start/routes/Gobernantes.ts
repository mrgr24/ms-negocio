import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/gobernantes", "GobernantesController.find");
    Route.get("/gobernantes/:id", "GobernantesController.find");
    Route.post("/gobernantes", "GobernantesController.create");
    Route.put("/gobernantes/:id", "GobernantesController.update");
    Route.delete("/gobernantes/:id", "GobernantesController.delete");
});