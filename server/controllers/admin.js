const executeQuery = require("../config/query");

module.exports.adminLogin = async (req, res) => {
    try {
        const query = `SELECT * FROM login`;
        const results = await executeQuery(query);
        console.log(results);
        res.status(200).json({ response: "true", results });
    } catch (error) {
        res.status(400).json({ response: "false", message: error.message });
    }
};
