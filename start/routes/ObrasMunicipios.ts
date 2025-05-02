import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/obra_municipios", "ObrasMunicipiosController.find");
    Route.get("/obra_municipios/:id", "ObrasMunicipiosController.find");
    Route.post("/obra_municipios", "ObrasMunicipiosController.create");
    Route.put("/obra_municipios/:id", "ObrasMunicipiosController.update");
    Route.delete("/obra_municipios/:id", "ObrasMunicipiosController.delete");
});