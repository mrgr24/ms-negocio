import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/gps", "GpsController.find");
    Route.get("/gps/:id", "GpsController.find");
    Route.post("/gps", "GpsController.create");
    Route.put("/gps/:id", "GpsController.update");
    Route.delete("/gps/:id", "GpsController.delete");
});