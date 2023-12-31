const executeQuery = require('../config/query')

module.exports.adminLogin = async (req, res) => {
    try {
        const query = `SELECT * FROM login`;
        try {
            const results = await executeQuery(query);
            console.log(results);
            res.send(results);
        } catch (e) {
            console.log(e);
            res.status(500).send('Internal Server Error');
        }
    }
    catch (error) {
        res.status(400).json({ response: 'true', message: error.message })
    }
}