import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/operario_especialidades", "OperarioEspecialidadesController.find");
    Route.get("/operario_especialidades/:id", "OperarioEspecialidadesController.find");
    Route.post("/operario_especialidades", "OperarioEspecialidadesController.create");
    Route.put("/operario_especialidades/:id", "OperarioEspecialidadesController.update");
    Route.delete("/operario_especialidades/:id", "OperarioEspecialidadesController.delete");
});