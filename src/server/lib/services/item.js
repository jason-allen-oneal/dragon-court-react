class ItemService {
  constructor(app) {
    this.app = app;
  }

  async get(id) {
    const query = "SELECT * FROM items WHERE id = ?";
    const results = await this.app.db.query(query, [id]);

    const result = await Promise.all(
      results.map(async (result) => {
        const item = {
          id: result.id,
          name: result.name,
          region: result.region,
          shop: result.shop,
          type: result.type,
          location: result.location,
          guts: result.guts,
          wits: result.wits,
          charm: result.charm,
          attack: result.attack,
          defend: result.defend,
          skill: result.skill,
          cost: result.cost,
          func: result.func,
          equippable: result.equippable,
          qty: 1000,
          lvl: result.lvl,
          equipped: false,
          identified: true,
          abilities: "",
          maxEnchants: result.max_enchants,
          timesEnchanted: 0,
          inStorage: 0,
          dropRate: result.drop_rate,
          isSilver: result.is_silver,
          isCrystal: result.is_crystal,
          attributes: result.attributes,
        };

        return item;
      })
    );

    return result[0];
  }

  async getAll(shop, region) {
    const query = "SELECT * FROM items WHERE shop = ? AND region = ?";
    const results = await this.app.db.query(query, [shop, region]);

    return Promise.all(
      results.map(async (result) => {
        const item = {
          id: result.id,
          name: result.name,
          region: result.region,
          shop: result.shop,
          type: result.type,
          location: result.location,
          guts: result.guts,
          wits: result.wits,
          charm: result.charm,
          attack: result.attack,
          defend: result.defend,
          skill: result.skill,
          cost: result.cost,
          func: result.func,
          equippable: result.equippable,
          qty: 1000,
          lvl: result.lvl,
          equipped: false,
          identified: true,
          abilities: "",
          maxEnchants: result.max_enchants,
          timesEnchanted: 0,
          inStorage: 0,
          dropRate: result.drop_rate,
          isSilver: result.is_silver,
          isCrystal: result.is_crystal,
          attributes: result.attributes,
        };

        return item;
      })
    );
  }
}

module.exports = (app) => {
  return new ItemService(app);
};
