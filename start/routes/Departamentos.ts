import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.post("/departamentos/sincronizar", "DepartamentosController.sincronizar");
    Route.get("/departamentos", "DepartamentosController.index");
})