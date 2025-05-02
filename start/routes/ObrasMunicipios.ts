import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/obras_municipios", "ObrasMunicipiosController.find");
    Route.get("/obras_municipios/:id", "ObrasMunicipiosController.find");
    Route.post("/obras_municipios", "ObrasMunicipiosController.create");
    Route.put("/obras_municipios/:id", "ObrasMunicipiosController.update");
    Route.delete("/obras_municipios/:id", "ObrasMunicipiosController.delete");
});