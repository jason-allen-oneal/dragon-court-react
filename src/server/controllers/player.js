class PlayerController {
  constructor() {}

  init(app, socket) {
    socket.on("player-create", async (input) => {
      let status = "error";
      const result = await app.services.player.create(input);
      if (result) {
        status = "ok";
      }

      socket.emit("player-create-response", { status: status });
    });

    socket.on("player-get", async (input) => {
      let data;
      const result = await app.services.player.getPlayer(input.pid);

      if (result.status === "ok") {
        data = result.data;
      } else {
        data = false;
      }

      socket.emit("player-get-response", data);
    });

    socket.on("player-update", async (input) => {
      const result = await app.services.player.update(input);

      socket.emit("player-update-response", result);
    });

    socket.on("player-equip-item", async (input) => {
      const p = input.player;
      const i = await app.services.inventory.getItem(p.id, input.item);

      let status = "";
      let results;

      const result = await app.services.inventory.equip(p, i);

      if (result.status === "ok") {
        status = "ok";
        if (result.reduce === true) {
          p.backpack = p.backpack - 1;
          await app.services.player.update(p);
        }
      } else {
        status = "error";
        results = "Something went wrong.";
      }

      if (status === "ok") {
        results = await app.services.player.getPlayer(p.id);
        results = results.data;
      }

      socket.emit("player-update-response", {
        status: status,
        action: "equipped",
        item: i.name,
        data: results,
      });
    });

    socket.on("player-buy-item", async (input) => {
      const p = input.player;
      const i = await app.services.item.get(input.item);
      let status = "";
      let data = {};

      if (p.backpack === p.backpackMax) {
        status = "error";
        result = "You are carrying too much!";

        data = {
          status: status,
          data: result,
        };
      } else {
        let result = await app.services.inventory.add(i, p.id);
        result.p.cash = parseInt(result.p.cash - i.cost);
        result.p.cashToday = parseInt(result.p.cashToday - i.cost);

        if (result.add) {
          result.p.backpack = result.p.backpack + 1;
        }

        const playerUpdate = await app.services.player.update(result.p);
        if (playerUpdate.affectedRows) {
          status = "ok";
          result = result.p;
        } else {
          status = "error";
          result = "Something went wrong.";
        }

        data = {
          status: status,
          action: "purchased",
          item: i.name,
          data: result,
        };
      }

      socket.emit("player-update-response", data);
    });

    socket.on("player-sell-item", async (input) => {
      const p = input.player;
      const i = await app.services.item.getItem(input.item);

      let status = "";

      p.cash = p.cash + (i.cost - i.cost / 0.02);
      p.cashToday = p.cashToday + (i.cost - i.cost / 0.02);

      p.inventory = p.inventory.splice(
        p.inventory.findIndex((item) => item.id === i.id),
        1
      );

      const playerUpdate = await app.services.player.update(p);
      if (playerUpdate.affectedRows) {
        status = "ok";
      } else {
        status = "error";
        result = "Something went wrong.";
      }
      if (status === "ok") {
        result = await app.services.player.getPlayer(p.id);
      }

      socket.emit("player-update-response", {
        status: status,
        action: "sold",
        data: result,
      });
    });

    socket.on("player-identify-item", async (input) => {
      const p = input.player;
      const i = await app.services.inventory.getItem(input.item);

      let status = "";
      let result = "";

      if (i.identified) {
        status = "error";
        result = "Item is already identified.";
      } else {
        p.cash = p.cash - 40;
        p.cashToday = p.cashToday - 40;
        i.identified = 1;

        await app.services.inventory.update(i);
        const playerUpdate = await app.services.player.update(p);
        if (playerUpdate.affectedRows) {
          status = "ok";
        } else {
          status = "error";
          result = "Something went wrong.";
        }
        if (status === "ok") {
          result = await app.services.player.get(p.id);
        }
      }

      socket.emit("player-update-response", {
        status: status,
        action: "identified",
        data: result,
      });
    });

    socket.on("player-polish-item", async (input) => {
      const p = input.player;
      const i = await app.services.inventory.getItem(input.item);

      let status = "";
      let result = "";
    });
  }
}

module.exports = new PlayerController();
