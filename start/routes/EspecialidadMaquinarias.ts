import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/especialidad_maquinarias", "EspecialidadMaquinariasController.find");
    Route.get("/especialidad_maquinarias/:id", "EspecialidadMaquinariasController.find");
    Route.post("/especialidad_maquinarias", "EspecialidadMaquinariasController.create");
    Route.put("/especialidad_maquinarias/:id", "EspecialidadMaquinariasController.update");
    Route.delete("/especialidad_maquinarias/:id", "EspecialidadMaquinariasController.delete");
});