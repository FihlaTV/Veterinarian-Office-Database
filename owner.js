module.exports = function(){
    var express = require('express');
    var router = express.Router();

	//helper function to get all owners
    function getOwners(res, mysql, context, complete)
	{
        	mysql.pool.query("SELECT owner_id as id, o_name, phone, balance FROM owner", function(error, results, fields){
            	if(error){
                	res.write(JSON.stringify(error));
                	res.end();
            	}
            	context.owner  = results;
	    	complete();	
        	});
    	}


	//helper function to get one owner for the purpose of updating
    function getOwner(res, mysql, context, id, complete)
	{
		 var sql = "SELECT owner_id as id, o_name, phone, balance FROM owner WHERE owner_id = ?";
        	var inserts = [id];
        	mysql.pool.query(sql, inserts, function(error, results, fields){
            	if(error){
                	res.write(JSON.stringify(error));
                	res.end();
            	}
            	context.owner = results[0];
            	complete();
        	});
	}
	


    /*Display all owners. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res)
	{
		var callbackCount=0;
        	var context = {};
        	context.jsscripts = ["deleteOwner.js"];
        	var mysql = req.app.get('mysql');
        	getOwners(res, mysql, context, complete);
		function complete()
			{
				callbackCount++;
				if (callbackCount>=1)
					{
						res.render('owner', context);
					}
			}
	});


/* Display one owner for the specific purpose of updating owner */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateOwner.js"];
        var mysql = req.app.get('mysql');
        getOwner(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-owner', context);
            }

        }
    });





 /* Adds an owner, redirects to the owner page after adding */

    router.post('/', function(req, res){
        console.log(req.body.owner)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO owner(o_name, phone, balance) VALUES (?,?,?)";
        var inserts = [req.body.o_name, req.body.phone, req.body.balance];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/owner');
            }
        });
    });


/* The URI that update data is sent to in order to update an owner  */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE owner SET o_name=?, phone=?, balance=? WHERE owner_id=?";
        var inserts = [req.body.o_name, req.body.phone, req.body.balance, req.params.id];
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


 /* Route to delete an owner , simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM owner WHERE owner_id = ?";
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

	
