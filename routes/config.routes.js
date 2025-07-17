// routes/config.routes.js
module.exports = (app) => {
  const router = require("express").Router();
  const db = require("../models");
  const sequelize = db.sequelize;

  router.get("/:formName", async (req, res) => {
    const { formName } = req.params;
    try {
      const [results] = await sequelize.query(
        `SELECT field_name, label, type, required, default_value, options, \`order\`
         FROM form_config
         WHERE form_name = ?
         ORDER BY \`order\` ASC`,
        { replacements: [formName] }
      );

      const parsed = results.map(field => ({
        ...field,
        required: !!field.required,
        options: field.options ? JSON.parse(field.options) : null
      }));

      res.json(parsed);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.use("/api/config", router);
};
