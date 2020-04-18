const express = require("express");
const con = require('./connection'); // mysql connection pool
const routes = express.Router();

// route to get todayPlans
routes.get("/plans/today", (request, response) => {
    const date = new Date();
    const weekday = date.toString().split(' ')[0];
    const fixedPlansQuery = 
        `SELECT 
            plans.*, 
            TIME_FORMAT(startHora, "%H:%i") as startHora, 
            TIME_FORMAT(endHora, "%H:%i") as endHora 
        FROM plans 
        WHERE repeatOn LIKE '%${weekday}%' 
        ORDER BY startHora`;
    const dayPlansQuery = "SELECT * FROM todos WHERE data=CURDATE() OR data IS NULL ORDER BY data, startHora";

    // fixed plans query
    con.query(fixedPlansQuery, (err, fixedPlans) => {
        if (err) throw err;

        // day plans query
        con.query(dayPlansQuery, (err, results) => {
            if (err) throw err;
            // evaluate the string 'true' and 'false' on active prop
            fixedPlans = fixedPlans.map(x => ({ ...x, active: eval(x.active) }))
            
            let dayPlans = results.filter(row => {
                // if the todo's category are in the plans list, move the todo to the plan todos and remove from the main todo list
                if (fixedPlans.map(p => p.nome.toUpperCase()).includes(row.categoria.toUpperCase())) {
                    fixedPlans = fixedPlans.map(p =>
                        p.nome.toUpperCase() == row.categoria.toUpperCase()
                            ? { ...p, todos: [...(p.todos || []), row] }
                            : { ...p, todos: [] }
                    );
                    return;
                } else {
                    return row;
                }
            });
            response.json({ plans: fixedPlans, todos: dayPlans });
        });
    });
});

// route to get todayPlans
routes.get("/plans/get", (request, response) => {
    const dateQuery = request.query.date.split('/').map(x => Number(x));
    const date = new Date(dateQuery[2], dateQuery[1] - 1, dateQuery[0]);
    const weekday = date.toString().split(' ')[0];

    const fixedPlansQuery = `SELECT plans.*, TIME_FORMAT(startHora, "%H:%i") as startHora, TIME_FORMAT(endHora, "%H:%i") as endHora FROM plans WHERE repeatOn LIKE '%${weekday}%' ORDER BY startHora`;
    const dayPlansQuery = "SELECT * FROM todos WHERE data=CURDATE() OR data IS NULL ORDER BY data, startHora";

    // fixed plans query
    con.query(fixedPlansQuery, (err, fixedPlans) => {
        if (err) throw err;
        // evaluate the string 'true' and 'false' on active prop
        fixedPlans = fixedPlans.map(x => ({ ...x, active: eval(x.active) }))

        // day plans query
        con.query(dayPlansQuery, (err, results) => {
            if (err) throw err;

            let dayPlans = results.filter(row => {
                // if the todo's category are in the plans list, move the todo to the plan todos and remove from the main todo list
                if (fixedPlans.map(p => p.nome.toUpperCase()).includes(row.categoria.toUpperCase())) {
                    fixedPlans = fixedPlans.map(p =>
                        p.nome.toUpperCase() == row.categoria.toUpperCase()
                            ? { ...p, todos: [...(p.todos || []), row] }
                            : { ...p, todos: [] }
                    );
                    return;
                } else {
                    return row;
                }
            });

            response.json({ plans: fixedPlans, todos: dayPlans });
        });
    });
});

routes.post("/plans/new", (request, response) => {
    const { nome, startHora, endHora, repeatOn } = request.body;
    const insertQuery = `INSERT INTO plans (nome, startHora, endHora, repeatOn) VALUES ('${nome}', '${startHora}', ${(endHora === null) ? 'NULL' : `'${endHora}'`}, '${repeatOn}')`;
    con.query(insertQuery, (err, results) => {
        if (err) throw err;
        response.send()
    });
});

routes.put("/plans/:id", (request, response) => {
    const { id } = request.params;
    const { nome, startHora, endHora, repeatOn, active } = request.body;
    if (id != undefined) {
        // if any isn't undefined
        if (!(nome == undefined && startHora == undefined && endHora == undefined && repeatOn == undefined && active == undefined)) {
            const values = [];
            
            if (nome != undefined) values.push(`nome='${nome}'`);
            if (startHora != undefined) values.push(`startHora='${startHora}'`);
            if (endHora != undefined && endHora !== "null") values.push(`endHora='${endHora}'`);
            if (endHora === "null") values.push(`endHora=NULL`);
            if (repeatOn != undefined) values.push(`repeatOn='${repeatOn}'`);
            if (active != undefined) values.push(`active='${active}'`);
            
            const updateQuery = `UPDATE plans SET ${values.join(',')} WHERE id=${id}`;

            console.log(updateQuery)

            con.query(updateQuery, (err, results) => {
                if (err) throw err;
                response.status(204).send();
            });
        } else {
            response.status(400).send();
        }
    } else {
        response.status(400).send();
    }
})

module.exports = routes;