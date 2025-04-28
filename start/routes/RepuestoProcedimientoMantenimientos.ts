import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/repuesto_procs", "RepuestoProcsController.find");
    Route.get("/repuesto_procs/:id", "RepuestoProcsController.find");
    Route.post("/repuesto_procs", "RepuestoProcsController.create");
    Route.put("/repuesto_procs/:id", "RepuestoProcsController.update");
    Route.delete("/repuesto_procs/:id", "RepuestoProcsController.delete");
});