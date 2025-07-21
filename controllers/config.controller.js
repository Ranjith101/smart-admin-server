// controller/config.controller.js
exports.getTableConfig = async (req, res) => {
  const tableName = req.params.name;
  const config = await db.sequelize.query(
    `SELECT column_key, label FROM table_config WHERE table_name = ? AND visible = 1 ORDER BY \`order\` ASC`,
    { replacements: [tableName], type: db.Sequelize.QueryTypes.SELECT }
  );
  res.json(config);
};
