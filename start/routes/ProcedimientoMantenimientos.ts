import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/procedimiento_mantenimientos", "ProcedimientoMantenimientosController.find");
    Route.get("/procedimiento_mantenimientos/:id", "ProcedimientoMantenimientosController.find");
    Route.post("/procedimiento_mantenimientos", "ProcedimientoMantenimientosController.create");
    Route.put("/procedimiento_mantenimientos/:id", "ProcedimientoMantenimientosController.update");
    Route.delete("/procedimiento_mantenimientos/:id", "ProcedimientoMantenimientosController.delete");
});