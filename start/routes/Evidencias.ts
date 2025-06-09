import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/evidencias", "EvidenciasController.find");
    Route.get("/evidencias/:id", "EvidenciasController.find");
    Route.post("/evidencias", "EvidenciasController.create");
    Route.put("/evidencias/:id", "EvidenciasController.update");
    Route.delete("/evidencias/:id", "EvidenciasController.delete");
    
    // Rutas específicas para manejo de archivos
    Route.post("/evidencias/upload", "EvidenciasController.upload_photo");
    Route.get("/evidencias/:id/photo", "EvidenciasController.get_photo");
});