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
        console.log(results);

        res.status(200).json({ response: "true", results });
    } catch (e) {
        res.status(400).json({ response: "false", message: e.message });
    }
};

const dateParser = (date1) => {
    const isoDateString = date1;
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
};

module.exports.updateAttendenceList = async (req, res) => {
    try {
        const finalArray = [];
        for (let i = 0; i < req.body.length; i++) {
            if (typeof req.body[i] !== undefined && req.body[i] !== null) {
                finalArray.push(req.body[i]);
            }
        }

        const updatePromises = finalArray.map(async (item) => {
            const query = `UPDATE Attendence SET attendenceStatus='${
                item.status
            }' WHERE empId = ${item.empId} AND attendenceDate = '${dateParser(
                item.attendenceDate
            )}';`;
            console.log(query);
            const results = await executeQuery(query);
        });

        await Promise.all(updatePromises);

        res.status(200).json({ response: "true" , message : "updated successfully"});
    } catch (e) {
        console.log(e);
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.getSalaryStatus = async (req, res) => {
    try {
        const query = `SELECT e.empId,e.fullName,c.salary,a.attendenceDate,a.attendenceStatus FROM Attendence as a JOIN employeePersonalInfo as e ON e.empId=a.empId JOIN employeeCareerInfo as c on e.empId=c.empId;`;
        const results = await executeQuery(query);
        console.log(results);
        const finalArray = [];
        const uniqueEmpIds = new Set();

        for (let i = 0; i < results.length; i++) {
            if (!uniqueEmpIds.has(results[i].empId)) {
                let counter = 0;
                let totalDays = 0
                for (let j = 0; j < results.length; j++) {
                    if (results[i].empId === results[j].empId) {
                        totalDays++;
                        if (
                            results[j].attendenceStatus.toLowerCase() ===
                            "present"
                        ) {
                            counter++;
                        }
                    }
                }
                finalArray.push({
                    empId: results[i].empId,
                    name : results[i].fullName,
                    salary : results[i].salary,
                    attendence: counter,
                    totalDays: totalDays
                });
                uniqueEmpIds.add(results[i].empId);
            }
        }

        console.log(finalArray);

        res.status(200).json({ response: "true", results : finalArray });
    } catch (e) {
        console.log(e);
        res.status(400).json({ response: "false", message: e.message });
    }
};

module.exports.deleteAllAttendence = async(req,res)=>{
     try {
        const query = `DELETE FROM Attendence;
        `;

        const results = await executeQuery(query);
        console.log(results);

        res.status(200).json({ response: "true", results });
    } catch (e) {
        res.status(400).json({ response: "false", message: e.message });
    }
}
