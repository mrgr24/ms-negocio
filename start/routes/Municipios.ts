import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.post("/municipios/sincronizar", "MunicipiosController.sincronizar");
    Route.get("/municipios", "MunicipiosController.index");
});