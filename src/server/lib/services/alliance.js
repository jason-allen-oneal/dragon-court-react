class AllianceService {
  constructor(app) {
    this.app = app;
  }

  async getAlliance(id) {
    if (id === 0) {
      return {
        id: 0,
        name: "",
        creator: null,
        time: 0,
        abilities: "",
        members: 0,
        membership: 0,
        power: 0,
      };
    }

    const query = "SELECT * FROM alliances WHERE id = ?";
    const result = await this.app.db.query(query, [id]);

    return {
      id: result[0].id,
      name: result[0].name,
      creator: result[0].creator,
      time: result[0].time,
      abilities: result[0].abilities,
      members: result[0].members,
      membership: result[0].membership,
      power: result[0].power,
    };
  }
}

module.exports = (app) => {
  return new AllianceService(app);
};
