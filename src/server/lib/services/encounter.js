class EncounterService {
  constructor(app) {
    this.app = app;
  }

  async getEncounter(location) {
    const query =
      "SELECT * FROM monsters WHERE region = ? ORDER BY RAND() LIMIT 1";
    const results = await this.app.db.query(query, [location]);

    return {
      id: results[0].id,
      name: results[0].name,
      guts: results[0].guts,
      wits: results[0].wits,
      exp: results[0].exp,
      fame: results[0].fame,
      abilities: results[0].abilities,
      options: results[0].option,
      region: results[0].region,
      items: results[0].items,
      level: results[0].lvl,
    };
  }
}

module.exports = (app) => {
  return new EncounterService(app);
};
