const { parse } = require("dotenv");
const executeQuery = require("../config/query");

module.exports.getAllInvestors = async (req, res) => {
    try {
        const query = ` select * from investor;`;
        const results = await executeQuery(query);
        console.log(results);
        res.status(200).json({ response: "true", results });
    } catch (e) {
        res.status(400).json({ response: "false", message: e.message });
    }
};
module.exports.getAllInvestorsWithProjectName = async (req, res) => {
    try {
        const query = `SELECT p.projectId,p.projectName,i.investorId,i.fullName,i.emailAddress,i.phoneNumber,i.linkedin,i.webiste,i.investement FROM investor as i JOIN projects AS p ON i.projectId=p.projectId;`;
        const results = await executeQuery(query);
        console.log(results);
        res.status(200).json({ response: "true", results });
    } catch (e) {
        res.status(400).json({ response: "false", message: e.message });
    }
};
module.exports.getInvestorWithProjectNameById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = ` SELECT p.projectId,p.projectName,i.investorId,i.fullName,i.emailAddress,i.phoneNumber,i.linkedin,i.webiste,i.investement FROM investor as i JOIN projects AS p ON i.projectId=p.projectId WHERE investorId=${id};`;
        const results = await executeQuery(query);
        console.log(results);
        res.status(200).json({ response: "true", results });
    } catch (e) {
        res.status(400).json({ response: "false", message: e.message });
    }
};
module.exports.getInvestorById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = ` select * from investor where investorId=${id};`;
        const results = await executeQuery(query);
        console.log(results);
        res.status(200).json({ response: "true", results });
    } catch (e) {
        res.status(400).json({ response: "false", message: e.message });
    }
};
module.exports.addInvestor = async (req, res) => {
     try {
        req.body.projectId = parseInt(req.body.projectId)
        req.body.investement = parseInt(req.body.investement)
        console.log(req.body)
         const query = `INSERT INTO investor ( projectId, fullName, emailAddress, phoneNumber, linkedin, webiste, investement)
         VALUES (${req.body.projectId},'${req.body.fullName}','${req.body.emailAddress}','${req.body.phoneNumber}' ,'${req.body.linkedin}' , '${req.body.webiste}', ${(req.body.investement)});`;
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
 
 module.exports.updateInvestorById = async (req, res) => {
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
 
         const updateColumnsString = updateColumns.join(", ");
         console.log( values);
 
         const query = `UPDATE investor SET ${updateColumnsString} WHERE investorId = ?`;
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
 
 module.exports.deleteInvestorById = async (req, res) => {
     try {
         const id = req.params.id;
         const query = `DELETE FROM investor WHERE investorId = ${id};`;
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
 