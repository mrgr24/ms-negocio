import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/especialidades", "EspecialidadesController.find");
    Route.get("/especialidades/:id", "EspecialidadesController.find");
    Route.post("/especialidades", "EspecialidadesController.create");
    Route.put("/especialidades/:id", "EspecialidadesController.update");
    Route.delete("/especialidades/:id", "EspecialidadesController.delete");
});