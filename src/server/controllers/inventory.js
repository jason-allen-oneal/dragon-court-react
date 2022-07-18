class InventoryController {
  constructor() {}

  init(app, socket) {
    socket.on("inventory-dump", async (input) => {
      console.log(input);
    });
  }
}

module.exports = new InventoryController();
