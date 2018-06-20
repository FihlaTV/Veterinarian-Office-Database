module.exports = function(){
    var express = require('express');
    var router = express.Router();


 function getMedications(res, mysql, context, complete){
        mysql.pool.query("SELECT medication_id as id, m_name, cost FROM medication", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.medication = results;
            complete();
        });
    }

 function getMedication(res, mysql, context, id, complete){
        var sql = "SELECT medication_id as id, m_name, cost FROM medication WHERE medication_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.medication = results[0];
            complete();
        });
    }


/*Display all medications. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteMedication.js"];
        var mysql = req.app.get('mysql');
        getMedications(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('medication', context);
            }

        }
    });


  /* Display one medication for the specific purpose of updating medication */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateMedication.js"];
        var mysql = req.app.get('mysql');
        getMedication(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-medication', context);
            }

        }
    });

/* Adds a medication, redirects to the medication page after adding */
router.post('/', function(req, res){
        console.log(req.body.medication)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO medication (m_name, cost) VALUES (?,?)";
        var inserts = [req.body.m_name, req.body.cost];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/medication');
            }
        });
    });


/* The URI that update medication is sent to in order to update a medication */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE medication SET m_name=?, cost=? WHERE medication_id=?";
        var inserts = [req.body.m_name, req.body.cost, req.params.id];
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

 /* Route to delete a medication, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM medication WHERE medication_id = ?";
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
