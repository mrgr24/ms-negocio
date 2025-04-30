import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/repuestos_procedimientos_mantenimientos", "RepuestosProcedimientosMantenimientosController.find");
    Route.get("/repuestos_procedimientos_mantenimientos/:id", "RepuestosProcedimientosMantenimientosController.find");
    Route.post("/repuestos_procedimientos_mantenimientos", "RepuestosProcedimientosMantenimientosController.create");
    Route.put("/repuestos_procedimientos_mantenimientos/:id", "RepuestosProcedimientosMantenimientosController.update");
    Route.delete("/repuestos_procedimientos_mantenimientos/:id", "RepuestosProcedimientosMantenimientosController.delete");
});