class PlayerService {
  constructor(app) {
    this.app = app;
  }

  async create(data) {
    data.rank = 0;
    data.skillFighter = 0;
    data.skillMagic = 0;
    data.skillTrade = 0;

    switch (data.charClass) {
      default:
      case "peasant":
        break;

      case "noble":
        data.rank = 1;
        break;

      case "warrior":
        data.skillFighter = 1;
        break;

      case "wizard":
        data.skillMagic = 1;
        break;

      case "trader":
        data.skillTrade = 1;
        break;
    }

    const query =
      "INSERT INTO players (owner,region,class,background,alliance,effects,guts,max_guts,wits,max_wits,charm,max_charm,attack,defend,skill,skill_fighter,skill_fighter_max,skill_magic,skill_magic_max,skill_trade,skill_trade_max,level,experience,quests,max_quests,cash,rank,storage,max_storage,fame,favor,skilled,place,location) VALUES (?,'town',?,?,0,'',?,?,?,?,?,?,1,1,4,?,?,?,?,?,?,1,0,5,5,?,?,0,20,0,0,0,'','')";
    const results = await this.app.db.query(query, [
      data.owner,
      data.class,
      data.bg,
      data.guts,
      data.guts,
      data.wits,
      data.wits,
      data.charm,
      data.charm,
      data.skillFighter,
      data.skillFighter,
      data.skillMagic,
      data.skillMagic,
      data.skillTrade,
      data.skillTrade,
      data.cash,
      data.rank,
    ]);
    if (results.affectedRows) {
      const q = "UPDATE users SET has_char = 1 WHERE id = ?";
      await this.app.db.query(q, [data.owner]);
      return true;
    } else {
      return false;
    }
  }

  getRankString(rank) {
    let title = "";

    switch (rank) {
      default:
      case 0:
        title = "Peasant";
        break;
      case 1:
        title = "Squire";
        break;
      case 2:
        title = "Knight";
        break;
      case 3:
        title = "Captain";
        break;
      case 4:
        title = "Baron";
        break;
      case 5:
        title = "Count";
        break;
      case 6:
        title = "Viscount";
        break;
      case 7:
        title = "Marquis";
        break;
      case 8:
        title = "Earl";
        break;
      case 9:
        title = "Duke";
        break;
      case 10:
        title = "Prince";
        break;
      case 11:
        title = "Viceroy";
        break;
      case 12:
        title = "Regent";
        break;
      case 13:
        title = "Seneschal";
        break;
    }

    return title;
  }

  async getPlayer(id) {
    let json = {};
    const query = "SELECT * FROM players WHERE owner = ?";
    const results = await this.app.db.query(query, [id]);
    if (results.length > 0) {
      const result = results[0];

      const obj = {
        id: result.id,
        owner: result.owner,
        region: result.region,
        class: result.class,
        background: result.background,
        alliance: result.alliance,
        effects: result.effects,
        stats: {
          guts: result.guts,
          gutsMax: result.max_guts,
          wits: result.wits,
          witsMax: result.max_wits,
          charm: result.charm,
          charmMax: result.max_charm,
          attack: result.attack,
          defend: result.defend,
          skill: result.skill,
        },
        skills: {
          fighter: {
            skill: result.skill_fighter,
            max: result.skill_fighter_max,
          },
          magic: {
            skill: result.skill_magic,
            max: result.skill_magic_max,
          },
          trade: {
            skill: result.skill_trade,
            max: result.skill_trade_max,
          },
        },
        level: result.level,
        experience: result.experience,
        quests: result.quests,
        questsMax: result.max_quests,
        cash: result.cash,
        rank: result.rank,
        backpack: result.backpack,
        backpackMax: result.max_backpack,
        fame: result.fame,
        favor: result.favor,
        place: result.place,
        location: result.location,
      };

      let skilled = 0;
      let totalSkills = 0;
      if (result.skill_fighter || result.skill_magic || result.skill_trade) {
        skilled = 1;
        totalSkills =
          result.skill_fighter + result.skill_magic + result.skill_trade;
      }
      obj.skilled = skilled;
      obj.totalGuildSkills = totalSkills;
      obj.rankString = this.getRankString(result.rank);
      obj.inventory = await this.app.services.inventory.getInventory(id);
      obj.alliance = await this.app.services.alliance.getAlliance(
        result.alliance
      );

      let guts = 0,
        wits = 0,
        charm = 0,
        attack = 0,
        defend = 0;

      const equipment = await this.app.services.inventory.getEquipment(id);
      for (const [k, v] of Object.entries(equipment)) {
        guts += v.guts !== null ? v.guts : 0;
        wits += v.wits !== null ? v.wits : 0;
        charm += v.charm !== null ? v.charm : 0;
        attack += v.attack !== null ? v.attack : 0;
        defend += v.defend !== null ? v.defend : 0;
      }

      obj.equipment = equipment;

      obj.totalGuts = guts;
      obj.totalWits = wits;
      obj.totalCharm = charm;
      obj.totalAttack = attack;
      obj.totalDefend = defend;

      json = {
        status: "ok",
        data: obj,
      };
    } else {
      json = {
        status: "error",
        message: "Could not get player data.",
      };
    }

    return json;
  }

  async update(data) {
    const query =
      "UPDATE players SET region = ?, class = ?, background = ?, alliance = ?, effects = ?, guts = ?, wits = ?, charm = ?, max_guts = ?, max_wits = ?, max_charm = ?, attack = ?, defend = ?, skill = ?, skill_fighter = ?, skill_fighter_max = ?, skill_magic = ?, skill_magic_max = ?, skill_trade = ?, skill_trade_max = ?, level = ?, experience = ?, quests = ?, max_quests = ?, cash = ?, rank = ?, backpack = ?, max_backpack = ?, fame = ?, favor = ?, skilled = ?, place = ?, location = ?, favor = ? WHERE id = ?";
    const result = await this.app.db.query(query, [
      data.region,
      data.class,
      data.background,
      data.alliance.id,
      data.effects,
      data.stats.guts,
      data.stats.wits,
      data.stats.charm,
      data.stats.gutsMax,
      data.stats.witsMax,
      data.stats.charmMax,
      data.stats.attack,
      data.stats.defend,
      data.stats.skill,
      data.skills.fighter.skill,
      data.skills.fighter.max,
      data.skills.magic.skill,
      data.skills.magic.max,
      data.skills.trade.skill,
      data.skills.trade.max,
      data.level,
      data.experience,
      data.quests,
      data.questsMax,
      data.cash,
      data.rank,
      data.backpack,
      data.backpackMax,
      data.fame,
      data.favor,
      data.skilled,
      data.place,
      data.location,
      data.favor,
      data.id,
    ]);

    let status = "error";
    if (result.affectedRows > 0) {
      status = "ok";
    }

    const player = await this.getPlayer(data.id);
    console.log(player);
    return {
      status: status,
      data: player,
    };
  }
}

module.exports = (app) => {
  return new PlayerService(app);
};
