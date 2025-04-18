import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/procedimientos", "ProcedimientosController.find");
    Route.get("/procedimientos/:id", "ProcedimientosController.find");
    Route.post("/procedimientos", "ProcedimientosController.create");
    Route.put("/procedimientos/:id", "ProcedimientosController.update");
    Route.delete("/procedimientos/:id", "ProcedimientosController.delete");
})