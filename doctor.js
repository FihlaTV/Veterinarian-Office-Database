module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getDoctors(res, mysql, context, complete){
        mysql.pool.query("SELECT doctor_id, d_name FROM doctor", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.doctor  = results;
            complete();
        });
    }


function getDoctor(res, mysql, context, id, complete){
        var sql = "SELECT doctor_id AS id, d_name FROM doctor WHERE doctor_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.doctor = results[0];
            complete();
        });
    }



/*Display all doctors*/

 router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteDoctor.js"];
        var mysql = req.app.get('mysql');
        getDoctors(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('doctor', context);
            }

        }
    });


/* Adds a doctor, redirects to the doctor page after adding */

    router.post('/', function(req, res){
        console.log(req.body.doctor)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO doctor (d_name) VALUES (?)";
        var inserts = [req.body.d_name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/doctor');
            }
        });
    });

 /* Display one doctor for the specific purpose of updating doctors */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateDoctor.js"];
        var mysql = req.app.get('mysql');
        getDoctor(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-doctor', context);
            }

        }
    });

 /* The URI that update-doctor is sent to in order to update a doctor */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE doctor SET d_name=? WHERE doctor_id=?";
        var inserts = [req.body.d_name, req.params.id];
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


/* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM doctor WHERE doctor_id = ?";
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

