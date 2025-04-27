import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/gobernantes_departamentos", "GobernantesDepartamentosController.find");
    Route.get("/gobernantes_departamentos/:id", "GobernantesDepartamentosController.find");
    Route.post("/gobernantes_departamentos", "GobernantesDepartamentosController.create");
    Route.put("/gobernantes_departamentos/:id", "GobernantesDepartamentosController.update");
    Route.delete("/gobernantes_departamentos/:id", "GobernantesDepartamentosController.delete");
});