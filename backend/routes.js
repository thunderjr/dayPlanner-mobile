const express = require("express");
const mysql = require("mysql");

const con = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "!@#flavio",
    database: "dayplanner"
});

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
    let { nome, startHora, endHora, repeatOn } = request.body;

    if (repeatOn == 'weekdays') { repeatOn = 'Mon,Tue,Wed,Thu,Fri' }
    if (repeatOn == 'weekend') { repeatOn = 'Sat,Sun' }

    const insertQuery = `INSERT INTO plans (nome, startHora, endHora, repeatOn) VALUES ('${nome}','${startHora}','${endHora}','${repeatOn}')`;
    con.query(insertQuery, (err, results) => {
        if (err) throw err;
        response.send()
    });
});

module.exports = routes;