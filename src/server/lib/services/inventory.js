class InventoryService {
  constructor(app) {
    this.app = app;
  }

  async getInventory(id) {
    const query =
      "SELECT i.name, i.region, i.shop, i.guts AS itmGuts, i.wits AS itmWits, i.charm AS itmCharm, i.attack AS itmAttack, i.defend AS itmDefend, i.skill AS itmSkill, i.cost, i.type, i.location, i.func, i.equippable, i.max_enchants, i.lvl, i.is_silver, i.is_crystal, i.attributes, pi.id, pi.item, pi.qty, pi.equipped, pi.identified, pi.abilities, pi.guts, pi.wits, pi.charm, pi.attack, pi.defend, pi.skill, pi.times_enchanted, pi.in_storage, pi.lvl AS itmLvl FROM player_items pi INNER JOIN items i on pi.item = i.id WHERE pi.player = ? AND pi.equipped = 0";
    const results = await this.app.db.query(query, [id]);

    return Promise.all(
      results.map((result) => {
        const data = {
          id: result.id,
          itmId: result.item,
          name: result.name,
          region: result.region,
          shop: result.shop,
          type: result.type,
          location: result.location,
          baseGuts: result.itmGuts,
          baseWits: result.itmWits,
          baseCharm: result.itmCharm,
          baseAttack: result.itmAttack,
          baseDefend: result.itmDefend,
          baseSkill: result.itmSkill,
          cost: result.cost,
          func: result.func,
          equippable: result.equippable,
          maxEnchants: result.max_enchants,
          isSilver: result.is_silver,
          isCrystal: result.is_crystal,
          qty: result.qty,
          equipped: result.equipped,
          identified: result.identified,
          abilities: result.abilites,
          guts: result.guts,
          wits: result.wits,
          charm: result.charm,
          attack: result.attack,
          defend: result.defend,
          skill: result.skill,
          timesEnchanted: result.times_enchanted,
          inStorage: result.in_storage,
          requiredLevel: result.lvl,
          itemLevel: result.itmLevel,
          attributes: result.attributes,
        };

        return data;
      })
    );
  }

  async getEquipment(id) {
    const data = {
      head: {},
      body: {},
      feet: {},
      left: {},
      right: {},
    };

    const query =
      "SELECT i.name, i.region, i.shop, i.guts AS itmGuts, i.wits AS itmWits, i.charm AS itmCharm, i.attack AS itmAttack, i.defend AS itmDefend, i.skill AS itmSkill, i.cost, i.type, i.location, i.func, i.equippable, i.max_enchants, i.lvl, i.is_silver, i.is_crystal, i.attributes, pi.id, pi.item, pi.qty, pi.equipped, pi.identified, pi.abilities, pi.guts, pi.wits, pi.charm, pi.attack, pi.defend, pi.skill, pi.times_enchanted, pi.in_storage, pi.lvl AS itmLvl FROM player_items pi INNER JOIN items i on pi.item = i.id WHERE pi.player = ? AND pi.equipped = 1";
    const results = await this.app.db.query(query, [id]);

    for (const item of results) {
      switch (item.location) {
        case "head":
          data.head = item;
          break;

        case "body":
          data.body = item;
          break;

        case "feet":
          data.feet = item;
          break;

        case "left":
          data.left = item;
          break;

        case "right":
          data.right = item;
          break;

        case "both":
          data.left = item;
          data.right = item;
          break;
      }
    }

    return data;
  }

  async getItem(id) {
    const query = "SELECT * FROM player_items WHERE id = ?";
    const results = await this.app.db.query(query, [id]);
    const result = await Promise.all(
      results.map((result) => {
        const data = {
          id: result.id,
          item: result.item,
          name: result.name,
          qty: result.qty,
          equipped: result.equipped,
          identified: result.identified,
          abilities: result.abilities,
          timesEnchanted: result.times_enchanted,
          inStorage: result.in_storage,
          name: result.name,
          region: result.region,
          shop: result.shop,
          funcs: result.funcs,
          effects: result.effects,
          cost: result.cost,
          equippable: result.equippable,
          level: result.lvl,
          maxEnchants: result.max_enchants,
          dropRate: result.drop_rate,
          isSilver: result.is_silver,
          isCrystal: result.is_crystal,
        };

        return data;
      })
    );

    return result[0];
  }

  async add(item, pid) {
    let query = "";
    let addToBackpackTotal = true;

    if (
      item.shop === "gems" ||
      item.type === "scroll" ||
      item.type === "battle" ||
      item.type == "access" ||
      item.type == "healing"
    ) {
      const q =
        "SELECT id, qty FROM player_items WHERE player = ? AND item = ?";
      const result = await this.app.db.query(q, [pid, item.id]);
      if (Array.isArray(result) && result.length > 0) {
        qty = result[0].qty + 1;
        const q2 =
          "UPDATE player_items SET qty = ? WHERE id = ? AND player = ?";
        results = await this.app.db.query(q2, [qty, result[0].id, pid]);
      } else {
        query =
          "INSERT INTO player_items SET item = ?, player = ?, qty = ?, equipped = ?, identified = ?, abilities = ?, guts = ?, wits = ?, charm = ?, attack = ?, defend = ?, skill = ?, times_enchanted = ?, in_storage = ?";
        results = await this.app.db.query(query, [
          item.id,
          pid,
          1,
          item.equipped,
          item.identified,
          item.abilities,
          item.guts,
          item.wits,
          item.charm,
          item.attack,
          item.defend,
          item.skill,
          item.timesEnchanted,
          item.inStorage,
        ]);
      }
      addToBackpackTotal = false;
    } else {
      query =
        "INSERT INTO player_items SET item = ?, player = ?, qty = ?, equipped = ?, identified = ?, abilities = ?, guts = ?, wits = ?, charm = ?, attack = ?, defend = ?, skill = ?, times_enchanted = ?, in_storage = ?";
      results = await this.app.db.query(query, [
        item.id,
        pid,
        1,
        0,
        item.identified,
        item.abilities,
        item.guts,
        item.wits,
        item.charm,
        item.attack,
        item.defend,
        item.skill,
        item.timesEnchanted,
        item.inStorage,
      ]);
    }

    const player = this.app.services.player.getPlayer(pid);

    return {
      p: player,
      add: addToBackpackTotal,
    };
  }

  async equip(player, item) {
    console.log("inventoryService.equip player", player);
    console.log("inventoryService.equip item", item);
    let status = "error";

    if (!item.equippable) {
      return item.name + " is not equippable!";
    }

    const oldItem = player.equipment[item.location];
    player.equipment[item.location] = item;

    const query = "UPDATE player_items SET equipped = ? WHERE id = ?";
    const result = await this.app.db.query(query, [1, item.id]);

    if (oldItem !== undefined && oldItem !== null) {
      const q = "UPDATE player_items SET equipped = ? WHERE id = ?";
      await this.app.db.query(q, [0, oldItem.id]);
    }

    console.log("inventoryService.equip result", result);

    if (result.affectedRows) {
      status = "ok";
    }

    return status;
  }

  async remove(item) {
    const query = "DELETE FROM player_items WHERE id = ?";
    return await this.app.db.query(query, [item.id]);
  }

  async polish(id) {
    const query = "SELECT * FROM player_items WHERE id = ?";
    const result = await this.app.db.query(query, [id]);
  }

  async update(item) {
    const query =
      "UPDATE player_items SET item = ?, player = ?, qty = ?, equipped = ?, identified = ?, abilities = ?, guts = ?, wits = ?, charm = ?, attack = ?, defend = ?, skill = ?, times_enchanted = ?, in_storage = ? WHERE id = ?";
    return await this.app.db.query(query, [
      item.item,
      item.player,
      item.qty,
      item.equipped,
      item.identified,
      item.abilities,
      item.guts,
      item.wits,
      item.charm,
      item.attack,
      item.defend,
      item.skill,
      item.timesEnchanted,
      item.inStorage,
      item.id,
    ]);
  }
}

module.exports = (app) => {
  return new InventoryService(app);
};
