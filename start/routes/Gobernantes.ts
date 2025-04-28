import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    // Rutas CRUD básicas
    Route.get("/gobernantes", "GobernantesController.find")
    Route.get("/gobernantes/:id", "GobernantesController.find")
    Route.post("/gobernantes", "GobernantesController.create")
    Route.put("/gobernantes/:id", "GobernantesController.update")
    Route.delete("/gobernantes/:id", "GobernantesController.delete")

    // Rutas para asignaciones
    Route.post("/gobernantes/:id/asignar-departamento", "GobernantesController.asignarDepartamento")
    Route.post("/gobernantes/:id/asignar-municipio", "GobernantesController.asignarMunicipio")

    // Rutas para consultas
    Route.get("/gobernantes/:id/asignaciones", "GobernantesController.obtenerAsignacionesActivas")
    Route.get("/gobernantes/:id/historico", "GobernantesController.obtenerHistorico")

    // Crear archivo de configuración para la API de Colombia si es necesario en el frontend
    // Consultar departamentos directamente desde el frontend
    // Consultar ciudades independientemente de la asignación de gobernantes
})
.middleware('MsSecMid')