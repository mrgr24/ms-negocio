import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/gobernantes_municipios", "GobernantesMunicipiosController.find");
    Route.get("/gobernantes_municipios/:id", "GobernantesMunicipiosController.find");
    Route.post("/gobernantes_municipios", "GobernantesMunicipiosController.create");
    Route.put("/gobernantes_municipios/:id", "GobernantesMunicipiosController.update");
    Route.delete("/gobernantes_municipios/:id", "GobernantesMunicipiosController.delete");
});