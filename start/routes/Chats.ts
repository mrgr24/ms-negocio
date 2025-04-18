import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/chats", "ChatsController.find");
    Route.get("/chats/:id", "ChatsController.find");
    Route.post("/chats", "ChatsController.create");
    Route.put("/chats/:id", "ChatsController.update");
    Route.delete("/chats/:id", "ChatsController.delete");
});