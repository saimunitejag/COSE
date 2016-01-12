
module.exports = function(db){
	
	var functions ={};

	functions.get_top_ten_users_by_followers = function(req,res){

		var query = "select user_type,login,abs(followers) from cisco_user_list where user_type = 'User' order by ABS(followers) desc limit 10";
		
		db.query(query, function(err, rows, fields) {
		  if (!err)
		  	res.json(rows);
		  else
		   console.log('Error while performing Query.'+err);
		});
	};

	functions.get_top_ten_users_by_repo_owned = function(req,res){

		var user_type = req.params["user_type"];
		
		var query = "(select user_type,login,abs(public_repos) from cisco_user_list where user_type = '"+user_type+"' order by ABS(public_repos) desc limit 10)";
		
		db.query(query, function(err, rows, fields) {
		  if (!err)
		  	res.json(rows);
		  else
		   console.log('Error while performing Query.'+err);
		});
	};

	functions.get_top_ten_repo_by_watchers_and_forks = function(req,res){

		var user_type = req.params["user_type"];
		var chart_by = req.params["by"]+"_count";

		var query = "(select A.name, abs(A."+chart_by+"), B.user_type from repository_info as A";
				  query += " left join cisco_user_list as B on A.login = B.login where B.user_type = '"+user_type+"' order by abs(A."+chart_by+") desc limit 5)";
		
                 
		db.query(query, function(err, rows, fields) {
		  if (!err)
		  	res.json(rows);
		  else
		   console.log('Error while performing Query.'+err);
		});
	};

	functions.get_contributions_by_month = function(req,res){

		var event_type = req.params["event_type"];

		var query = "SELECT event, created, count(event) from (select event,substring(created_at,1,7) as created FROM cisco_user_timeline)";
			  query += " as A where event = '"+event_type+"' group by event,created order by event,created;";
		
		db.query(query, function(err, rows, fields) {
		  if (!err)
		  	res.json(rows);
		  else
		   console.log('Error while performing Query.'+err);
		});
	};

	functions.get_repos_by_forks= function(req,res){

		var query = "SELECT name,full_name,abs(forks_count) FROM repository_info order by abs(forks_count) desc limit 5;";
		
		db.query(query, function(err, rows, fields) {
		  if (!err)
		  	res.json(rows);
		  else
		  	console.log('Error while performing Query.'+err);
		});
	};

	functions.get_contributions_by_share_events= function(req,res){

		var query = "SELECT actor_login, count(actor_login) FROM cisco_user_timeline group by actor_login order by count(actor_login) desc limit 5;";
		
		db.query(query, function(err, rows, fields) {
		  if (!err)
		  	res.json(rows);
		  else
		   console.log('Error while performing Query.'+err);
		});

	};

	functions.get_popular_languages= function(req,res){
		
		var query = "SELECT language, count(language) as language_count FROM repository_info where language<>'Puppet' AND language<>'None' AND language<>'' AND language<>'Chef' AND language<>'CSS' group by language order by count(language) desc;";
		
		db.query(query, function(err, rows, fields) {
		  if (!err)
		  	res.json(rows);
		  else
		   console.log('Error while performing Query.'+err);
		});

	};

	functions.get_word_count= function(req,res){
		
		var query = "SELECT text,uniqueness FROM tiger_analytics_db.cisco_tfidf order by abs(uniqueness) desc;";
		
		db.query(query, function(err, rows, fields) {
		  if (!err)
		  	res.json(rows);
		  else
		   console.log('Error while performing Query.'+err);
		});

	};

	functions.get_reach= function(req,res){
		
		var query = "SELECT text,uniqueness,reach FROM tiger_analytics_db.cisco_tfidf order by abs(reach) desc;";
		
		db.query(query, function(err, rows, fields) {
		  if (!err)
		  	res.json(rows);
		  else
		   console.log('Error while performing Query.'+err);
		});

	};
	
	return functions;

};
