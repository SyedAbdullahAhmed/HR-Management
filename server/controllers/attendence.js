const executeQuery = require("../config/query");
module.exports.addAttendence = async (req, res) => {
    try {
        const arrayWithDate = req.body;
        for (let i = 0; i < arrayWithDate.length; i++) {
            arrayWithDate[i].date = req.params.date;
        }
        let valuesString = "";
        for (const item of arrayWithDate) {
            valuesString += `(${item.empId}, '${item.date}', '${item.status}'),`;
        }

        valuesString = valuesString.slice(0, -1);

        const query = `INSERT INTO Attendence (empId, attendenceDate,attendenceStatus)
               VALUES ${valuesString};`;
        console.log(query);

        const results = await executeQuery(query);
        console.log(results);

        if (results.affectedRows >= 1)
            return res.status(200).json({
                response: "true",
                message: "Data inserted successfully!",
                data: results,
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

module.exports.getAttendenceList = async (req, res) => {
    try {
        const query = `SELECT e.empId,e.fullName,a.attendenceDate,a.attendenceStatus FROM Attendence as a JOIN employeePersonalInfo as e ON e.empId=a.empId;`;

        const results = await executeQuery(query);
        console.log(results);

        res.status(200).json({ response: "true", results });
    } catch (e) {
        res.status(400).json({ response: "false", message: e.message });
    }
};
module.exports.getAttendenceListByDate = async (req, res) => {
    try {
        const date1 = req.params.date;
        const isoDateString = date1;
        const date = new Date(isoDateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const day = String(date.getDate()).padStart(2, "0");

        const formattedDate = `${year}/${month}/${day}`;

        console.log(formattedDate); 

        const query = `SELECT e.empId,e.fullName,a.attendenceDate,a.attendenceStatus FROM Attendence as a JOIN employeePersonalInfo as e ON e.empId=a.empId WHERE a.attendenceDate = '${formattedDate}';`;

        console.log(query);
        const results = await executeQuery(query);
        console.log(results)

        res.status(200).json({ response: "true", results });
    } catch (e) {
        res.status(400).json({ response: "false", message: e.message });
    }
};
