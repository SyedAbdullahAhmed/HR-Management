const executeQuery = require("../config/query");

module.exports.getAllProjects = async (req, res) => {
    try {
        const query = ` select * from project_details;`;
        const results = await executeQuery(query);
        console.log(results);
        res.status(200).json({ response: "true", results });
    } catch (e) {
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.getProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = `SELECT * FROM projects where projectId = ${id}`;
        const results = await executeQuery(query);
        console.log(results);
        res.status(200).json({ response: "true", results });
    } catch (e) {
        console.log(e);
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.addProject = async (req, res) => {
    try {

        //check for non unique values
        req.body.member1 = parseInt(req.body.member1);
        req.body.member2 = parseInt(req.body.member2);
        req.body.member3 = parseInt(req.body.member3);
        req.body.teamLeader = parseInt(req.body.teamLeader);

        const uniqueValues = new Set([
            req.body.member1,
            req.body.member2,
            req.body.member3,
            req.body.teamLeader,
        ]);

        if (uniqueValues.size !== 4) {
            return res.status(400).json({
                response: "false",
                message: "Same persons are not allowed",
            });
        }
        const query = `INSERT INTO projects ( member1,member2,member3,teamLeader, projectName, projectDesc, projectStartDate, projectEndDate,projectStatus)
        VALUES (${req.body.member1},${req.body.member2},${req.body.member3},${req.body.teamLeader} ,'${req.body.projectName}' , '${req.body.projectDesc}', '${req.body.startDate}', '${req.body.endDate}','${req.body.projectStatus}');`;
        console.log(query);
        const results = await executeQuery(query);
        console.log(results);
        if (results.affectedRows >= 1) {
            return res.status(200).json({
                response: "true",
                message: "Data inserted successfully!",
                data: results,
            });
        } else {
            return res.status(400).json({
                response: "false",
                message: "Data insertion failed!",
            });
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.updateProjectById = async (req, res) => {
    try {
        req.body.member1 = parseInt(req.body.member1);
        req.body.member2 = parseInt(req.body.member2);
        req.body.member3 = parseInt(req.body.member3);
        req.body.teamLeader = parseInt(req.body.teamLeader);

        const uniqueValues = new Set([
            req.body.member1,
            req.body.member2,
            req.body.member3,
            req.body.teamLeader,
        ]);

        if (uniqueValues.size !== 4) {
            return res.status(400).json({
                response: "false",
                message: "Same persons are not allowed",
            });
        }

        const id = req.params.id;
        const values = [];
        const updateColumns = [];

        for (const key in req.body) {
            if (req.body.hasOwnProperty(key) && req.body[key] !== "") {
                updateColumns.push(`${key}=?`);
                values.push(req.body[key]);
            }
        }

        const updateColumnsString = updateColumns.join(", ");
        console.log( values);

        const query = `UPDATE projects SET ${updateColumnsString} WHERE projectId = ?`;
        values.push(id);

        console.log(values);
        console.log(query);
        const results = await executeQuery(query, values);
        console.log(results);

        res.status(200).json({
            response: "true",
            message: "Data updated successfully!",
            data: results,
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.deleteProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = `DELETE FROM projects WHERE projectId = ${id};`;
        const results = await executeQuery(query);
        if (results.affectedRows >= 1)
            return res.status(200).json({
                response: "true",
                message: "Data deleted successfully!",
            });
        res.status(400).json({
            response: "true",
            message: "Data deletion failed!",
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({ response: "false", message: e.message });
    }
};
