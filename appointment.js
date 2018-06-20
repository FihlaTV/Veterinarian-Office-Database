module.exports = function(){
    var express = require('express');
    var router = express.Router();


function getPets(res, mysql, context, complete){
        mysql.pool.query("SELECT pet_id as id, p_name, age, species, breed, d_ID, o_ID FROM pet", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.pet  = results;
            complete();
        });
    }

function getAppointments(res, mysql, context, complete){
	mysql.pool.query("SELECT appointment.appointment_id as id, date, time, pet.p_name AS pet FROM appointment INNER JOIN pet ON appointment.p_ID = pet.pet_id", function(error, results, fields){ 
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.appointment = results;
            complete();
        });
    }


 function getAppointment(res, mysql, context, id, complete){
        var sql = "SELECT appointment_id as id, date, time, p_ID FROM appointment WHERE appointment_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.appointment = results[0];
            complete();
        });
    }


/*Display all appointments. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteAppointment.js"];
        var mysql = req.app.get('mysql');
        getAppointments(res, mysql, context, complete);
        getPets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('appointment', context);
            }

        }
    });


/* Display one appointment for the specific purpose of updating appointment */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedPet.js", "updateAppointment.js"];
        var mysql = req.app.get('mysql');
        getAppointment(res, mysql, context, req.params.id, complete);
        getPets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-appointment', context);
            }

        }
    });





 /* Adds an appointment, redirects to the appointment page after adding */

    router.post('/', function(req, res){
        //console.log(req.body.appointment)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO appointment (time, date, p_ID) VALUES (?,?,?)";
        var inserts = [req.body.time, req.body.date, req.body.pet_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/appointment');
            }
        });
    });


/* The URI that update appointment is sent to in order to update appointment */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE appointment SET date=?, time=?, p_ID=? WHERE appointment_id=?";
        var inserts = [req.body.date, req.body.time, req.body.pet, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });





/* Route to delete an appointment, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM appointment WHERE appointment_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })


   return router;
}();
