import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/obras", "ObrasController.find");
    Route.get("/obras/:id", "ObrasController.find");
    Route.post("/obras", "ObrasController.create");
    Route.put("/obras/:id", "ObrasController.update");
    Route.delete("/obras/:id", "ObrasController.delete");
});