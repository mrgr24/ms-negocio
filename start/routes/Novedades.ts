import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/novedades", "NovedadesController.find");
    Route.get("/novedades/:id", "NovedadesController.find");
    Route.post("/novedades", "NovedadesController.create");
    Route.put("/novedades/:id", "NovedadesController.update");
    Route.delete("/novedades/:id", "NovedadesController.delete");
});