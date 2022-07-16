const bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

class UserService {
  constructor(core) {
    this.core = core;
  }

  async create(data) {
    let error, json;

    const query = "SELECT id FROM users WHERE email = ?";
    const result = await this.core.db.query(query, [data.email]);
    if (Array.isArray(result) && result.length > 0) {
      error = "You already have an account!";
    }

    if (error != null) {
      json = {
        status: "error",
        message: error,
      };
    } else {
      const hash = await bcrypt.hash(data.password, 12);
      const token = jwt.sign({ data: data.id }, this.core.config.secret, {
        expiresIn: 60 * 60,
      });
      const q =
        "INSERT INTO users SET email = ?, name = ?, pass = ?, token = ?";
      const results = this.core.db.query(q, [
        data.email,
        data.username,
        hash,
        token,
      ]);

      json = {
        status: "ok",
        data: results,
      };
    }

    return json;
  }

  async login(data) {
    let json;

    const query = "SELECT * FROM users WHERE name = ?";
    const results = await this.core.db.query(query, [data.username]);
    if (results.length > 0) {
      const verified = await bcrypt.compare(data.password, results[0].pass);
      if (!verified) {
        json = {
          status: "error",
          message: "Incorrect username or password.",
        };
      } else {
        const token = jwt.sign(
          { data: results[0].id },
          this.core.config.secret,
          { expiresIn: 60 * 60 }
        );

        const u = {
          id: results[0].id,
          name: results[0].name,
          email: results[0].email,
          hasChar: results[0].has_char,
          firstRun: results[0].first_run,
          chat: results[0].chat,
          token: token,
        };

        await this.update(u);

        json = {
          status: "ok",
          data: u,
        };
      }
    } else {
      json = {
        status: "error",
        message: "Incorrect username or password.",
      };
    }

    return json;
  }

  async getUser(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    const results = await this.core.db.query(query, [id]);
    return {
      id: results[0].id,
      name: results[0].name,
      email: results[0].email,
      token: results[0].token,
      hasChar: results[0].has_char,
      firstRun: results[0].first_run,
      chat: results[0].chat,
    };
  }

  async update(obj) {
    if (typeof obj !== "object") {
      console.log("User update error!");
      return false;
    }

    let query = "UPDATE users SET ";
    let i = 1;

    for (const [key, value] of Object.entries(obj)) {
      query += key + " = ";
      if (key === "zip") {
        if (value === "") {
          value = 0;
        }
      }
      if (!this.core.utils.isNumeric(value)) {
        query += '"' + value + '"';
      } else {
        query += parseInt(value);
      }

      if (i < Object.keys(obj).length) {
        query += ", ";
      }

      i++;
    }

    query += " WHERE id = " + obj.id;

    try {
      const results = await this.cored.db.query(query);

      return true;
    } catch {
      return false;
    }
  }
}

module.exports = (app) => {
  return new UserService(app);
};
