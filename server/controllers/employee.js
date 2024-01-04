const executeQuery = require("../config/query");

module.exports.getAllEmployeePerInfo = async (req, res) => {
    try {
        const query = `SELECT * FROM employeePersonalInfo;`;
        const results = await executeQuery(query);
        console.log(results);
        res.status(200).json({ response: "true", results });
    } catch (e) {
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.getEmployeeByIdPerInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const query = `SELECT * FROM employeePersonalInfo where empId = ${id}`;
        const results = await executeQuery(query);
        console.log(results);
        res.status(200).json({ response: "true", results });
    } catch (e) {
        console.log(e);
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.addEmployeePerInfo = async (req, res) => {
    try {
        const query = `INSERT INTO employeePersonalInfo (fullName, gender, dob, emailAddress, contactNumber, address)
        VALUES ('${req.body.fullName}','${req.body.gender}' , '${req.body.dob}', '${req.body.emailAddress}', '${req.body.contactNumber}','${req.body.address}' );`;
        console.log(query);
        const results = await executeQuery(query);
        console.log(results);
        if (results.affectedRows >= 1)
            return res
                .status(200)
                .json({
                    response: "true",
                    message: "Data inserted successfully!",
                    data : results.insertId,
                });
        res.status(400).json({
            response: "true",
            message: "Data insertion failed!",
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.updateEmployeePerInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const values = [];
        const updateColumns = [];
        
        
        for (const key in req.body) {
            if (req.body.hasOwnProperty(key) && req.body[key] !== "") {
                updateColumns.push(`${key}=?`);
                values.push(req.body[key]);
            }
        }
        
        const updateColumnsString = updateColumns.join(', ');
        console.log(values);
        
        // Now, updateColumnsString will only contain non-empty values
        
     
     const query = `UPDATE employeePersonalInfo SET ${updateColumnsString} WHERE empId = ?`;
     values.push(id);
     
     console.log(values);
     const results = await executeQuery(query, values);
     console.log(results);
     
     res.status(200).json({
         response: "true",
         message: "Data updated successfully!",
         data : results
     });
     
    } catch (e) {
        console.log(e);
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.deleteEmployeePerInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const query = `DELETE FROM employeePersonalInfo WHERE empId = ${id};`;
        const results = await executeQuery(query);
        if (results.affectedRows >= 1)
            return res
                .status(200)
                .json({
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

module.exports.getAllEmployeeCarInfo = async (req, res) => {
    try {
        const query = `SELECT * FROM employeeCareerInfo;`;
        const results = await executeQuery(query);
        console.log(results);
        res.status(200).json({ response: "true", results });
    } catch (e) {
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.getEmployeeByIdCarInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const query = `SELECT * FROM employeeCareerInfo where empId = ${id}`;
        const results = await executeQuery(query);
        console.log(results);
        res.status(200).json({ response: "true", results });
    } catch (e) {
        console.log(e);
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.addEmployeeCarInfo = async (req, res) => {
    try {
        const query = `INSERT INTO employeeCareerInfo (empId,position, salary, hiringDate, experience, domain)
        VALUES (${req.body.empId},'${req.body.position}','${req.body.salary}' , '${req.body.hiringDate}', '${req.body.experience}', '${req.body.domain}' );`;
        console.log(query);
        const results = await executeQuery(query);
        console.log(results);
        if (results.affectedRows >= 1)
            return res
                .status(200)
                .json({
                    response: "true",
                    message: "Data inserted successfully!",
                    data : results.insertId,
                });
        res.status(400).json({
            response: "true",
            message: "Data insertion failed!",
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.updateEmployeeCarInfo = async (req, res) => {
    try {
     const id = req.params.id;
     const values = [];
     const updateColumns = [];
     console.log(req.body)
     
     for (const key in req.body) {
        if (req.body.hasOwnProperty(key) && req.body[key] !== "") {
            updateColumns.push(`${key}=?`);
            values.push(req.body[key]);
        }
    }
     
     const updateColumnsString = updateColumns.join(', ');
     
     const query = `UPDATE employeeCareerInfo SET ${updateColumnsString} WHERE empId = ?`;
     values.push(id);
     
     console.log(values);
     const results = await executeQuery(query, values);
     console.log(results);
     
     res.status(200).json({
         response: "true",
         message: "Data updated successfully!",
         data : results
     });
    } catch (e) {
        console.log(e);
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.deleteEmployeeCarInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const query = `DELETE FROM employeeCareerInfo WHERE empId = ${id};`;
        const results = await executeQuery(query);
        if (results.affectedRows >= 1)
            return res
                .status(200)
                .json({
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

module.exports.getAllEmployeeNameAndPosition = async(req,res) => {
    try {
        const query = `SELECT personal.empId,personal.fullName , career.position FROM employeePersonalInfo AS personal JOIN employeeCareerInfo AS career ON personal.empId=career.empId;`;
        const results = await executeQuery(query);
        console.log(results);
        res.status(200).json({ response: "true", results });
    } catch (e) {
        console.log(e);
        res.status(400).json({ response: "false", message: e.message });
    }
}