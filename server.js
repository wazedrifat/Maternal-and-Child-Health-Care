//+++++++++++++++++++++++REQUIRED PACKAGES & DEPENDENCIES+++++++++++++++++++++

var express = require("express");
var app = express();
var ejs = require("ejs");
var bodyParser = require("body-parser");
var oracledb = require('oracledb');

//++++++++++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++++++++++

/*
! tasfik rahman
? tasfik rahman
todo tasfik rahman
* tasfik rahman
// tasfik rahman
*/

//+++++++++++++++++++++ORACLE DATABASE LOGIN CREDENTIALS++++++++++++++++++++++++++

var username = "project";
var pass = "112358";
var host = "127.0.0.1";
var port = 9000;
var link = "http://127.0.0.1:9000/";
var login_flag=true;
var flag_q=false;

//++++++++++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++GLOBAL VARIABLES+++++++++++++++++++++++++++++++

var user="Guest";
var email_g;
var binds;
var btn=1;  //INDICATES VIEWER OR DEVELOPER OR ADMIN MODE
var log=1;  //INDICATE WHAT LOGIN PAGE WILL DO LOGIN OR REGISTRATION
var tables;
var data=[];
var news;
var search='';
//++++++++++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++++++++++

//++++++++++++++++++++++++SETTING THE DEFAULT PROJECT PATH++++++++++++++++++++++++

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/design')); //this add the folder for css file
app.use('/design', express.static('design'));
app.set("view engine", "ejs");//for this line, file type is not needed in render()

//++++++++++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++++++++++
/*app.get("/", function (req, res) {

	res.render('home', {
		user:user,
		btn:btn,
		link: link
	});
});*/

//+++++++++++++++++++++++++++++++++++++++++++++++++START++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
// RENDERING INITIAL HOME PAGE WITH TABLE NAMES FROM SQL QUERY IN CARD
app.get("/", function (req, res) {

	// console.log(req.params.table);

	oracledb.getConnection({
		user: username,
		password: pass,
		connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
	},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}


			var table_Query = "SELECT table_name FROM all_tables where owner= :tn and table_name not like 'APEX$%' and table_name  not like 'DEMO%' and table_name  not like 'DEPT' and table_name  not like 'EMP'";

			var attribute2 = [];
			// console.log("oracle entered");

			connection.execute(table_Query,[username.toUpperCase()], function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					// console.log("no error in query1");
				}

				// console.log(result.rows);
				// console.log(result.rows[0][0]);
					tables=result.rows;
					var table_Query = "select news from timeline order by id desc";

					var attribute2 = [];
					// console.log("oracle entered");

					connection.execute(table_Query ,function (err, result) {
						if (err) {
							console.log(err);
							return;
						} else {
							news=result.rows;
							// console.log("no error in query1");
							// console.log(result.rows);
							// console.log(result.rows[0][0]);
						}


						//	tables=result.rows;
							res.render('home', {
								news:news,
								tables:tables,
								user:user,
								btn:btn,
								link: link
							});
				});
		});
	});

});

app.get("/developer-home", function (req, res) {

	// console.log(req.params.table);

	oracledb.getConnection({
		user: username,
		password: pass,
		connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
	},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}


			var table_Query = "SELECT view_name from user_view where email= :em";

			var attribute2 = [];
			// console.log("oracle entered");

			connection.execute(table_Query,[email_g], {
				autoCommit: true
			} ,function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					// console.log("no error in query1");
					// console.log(result.rows);
					console.log(result.rows[0][0]);
				}


					tables=result.rows;
				res.render('home', {
					news:news,
					tables:tables,
					user:user,
					btn:btn,
					link: link
				});
		});
	});

});
//++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

//++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
// TESTING PURPOSE
app.get("/r/:test", function (req, res) {

	res.render('home', {
		news:news,
		tables:result.rows,
			user:user,
		btn:btn,
		link: link
	});
});
app.post("/search", function (req, res) {

// console.log(req.body);
	res.send(req.body);
});
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

//++++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//RENDERING LOGIN PAGES FOR VIEWER,DEVELOPER & ADMIN
app.get("/login-viewer", function (req, res) {

	log=3;
	btn=1;
	res.render('login', {
		login_flag:true,
			user:user,
		flag:true,
		log:log,
		btn:btn,
		link: link
	});
});
app.get("/login-developer", function (req, res) {

	log=3;
	btn=2;
	res.render('login', {
		login_flag:true,
			user:user,
		flag:true,
		log:log,
		btn:btn,
		link: link
	});
});
app.get("/login-admin", function (req, res) {

	log=3;
	btn=3;
	res.render('login', {
		login_flag:true,
			user:user,
		flag:true,
		log:log,
		btn:btn,
		link: link
	});
});

app.get("/admin-home", function (req, res) {

	res.render('admin_do', {
		login_flag:true,
			user:user,
		flag:false,
		log:log,
		btn:btn,
		link: link
	});
});
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=



//+++++++++++++++++++++++++++++new features++++++++++++++++++++++++++++++++++++++++++++++

app.get("/admin-do", function (req, res) {

	log=3;
	btn=3;
	res.render('admin_do', {
			user:user,
		flag:true,
		log:log,
		btn:btn,
		link: link
	});
});

app.get("/sql", function (req, res) {

	log=3;
	btn=3;
	res.render('sql', {
		data:data,
			user:user,
		log:log,
		btn:btn,
		link: link
	});
});

app.post("/run", function (req, res) {

	// console.log(req.params.table);

	oracledb.getConnection({
		user: username,
		password: pass,
		connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
	},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}


			var table_Query = req.body.name;

			var attribute2 = [];
			// console.log("oracle entered");

			connection.execute(table_Query, function (err, result) {
				if (err) {
					console.log(err);
					res.render('sql', {
						data:"",
						user:user,
						btn:btn,
						link: link
					});
				} else {
					// console.log("no error in query1");
					// console.log(result.rows);
					// console.log(result.rows[0][0]);
						tables=result.rows;
					res.render('sql', {
						data:tables,
						user:user,
						btn:btn,
						link: link
					});
				}


		});
	});

});

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ TIME LINE start $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



app.get("/news/:number", function (req, res) {
	console.log(req.params.number);
	news_no=req.params.number;

	res.render('news1', {
		flag:false,
		reason:'',
		news_no:news_no,
		data:' ',
			user:user,
		log:log,
		btn:btn,
		link: link
	});
});

app.post("/news-posted/:number", function (req, res) {
	console.log(req.body);

	oracledb.getConnection({
		user: username,
		password: pass,
		connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
	},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}
			var q1 ;
			if(news_no=='query1')
			q1= 'select 100*((select count(case_id) from early_marriage_history where cause=:t1)/(select count(case_id) from early_marriage_history ))as "Vicitm of Early Marriage" from early_marriage_history group by cause having cause=:t2';

			else if(news_no=='query7')
			q1='';
			else if(news_no=='query8')
			q1='';
			else if(news_no=='query9')
			q1='';
			else if(news_no=='query10')
			q1='';


			var attribute2 = [];
			console.log("oracle entered");

			connection.execute(q1,[req.body.reason,req.body.reason], {
				autoCommit: true
			} ,function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					console.log("no error in query1");
				}

				console.log(result.rows);
			//	console.log(result.rows[2][1]);
				flag_q=!flag_q;
			res.render('news1', {
				flag:flag_q,
				news_no:news_no,
				reason:req.body.reason,
				user:user,
				table: req.params.table,
				data: result.rows,
				btn: btn,
				flag: true,
				link: link
			});
		});
	});
});



	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ TIME LINE END  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



app.get("/user-requests", function (req, res) {
	// console.log(req.params.table);

	oracledb.getConnection({
		user: username,
		password: pass,
		connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
	},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}


			var colQuery = "SELECT * from user_requests";

			var attribute2 = [];
			// console.log("oracle entered");

			connection.execute(colQuery, function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					// console.log("no error in query1");
				}

				// console.log(result.rows);
				// console.log(result.rows[2][1]);

			res.render('request', {
					user:user,
				table: req.params.table,
				data: result.rows,
				btn: btn,
				flag: true,
				link: link
			});
		});
	});

});


app.post("/requests", function (req, res) {

	// console.log(req.body.access);

	// console.log("worked!!");
	oracledb.getConnection({
		user: username,
		password: pass,
		connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
	},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}


			var table_Query = "select * from user_requests";
			var permit_query;
			console.log(req.body.access);
			if(req.body.access=="grant"){
					//permit_query= "update USER_REQUESTS set REQUEST = 'GRANTED' where EMAIL = '"+req.body.email+"'";
					permit_query= "update USER_REQUESTS set PERMISSION = 'GRANTED' where EMAIL = :tn";
						console.log("query ran!!");
			}
			else
				{
						permit_query= "select * from user_requests" ;
					}
			var attribute2 = [];
			// console.log(req.body);
			// console.log(permit_query);
			connection.execute(permit_query,[req.body.email],{
				autoCommit: true
			} ,function (err, result) {
				if (err) {
					console.log(err);
					res.render('request', {
						data:"",
						user:user,
						btn:btn,
						link: link
					});

				} else {
					// console.log("no error in query2");
					res.render('request', {
						data:"",
						user:user,
						btn:btn,
						link: link
					});
				}
				console.log(attribute2);
			// console.log(result.rows);


			});

	});

});

app.get("/view-assign", function (req, res) {
	// console.log(req.params.table);

	oracledb.getConnection({
		user: username,
		password: pass,
		connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
	},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}


			var query1 = "SELECT * from user_view";

			var attribute2 = [];
			var data1;
			var data2;
			var data3;
			// console.log("oracle entered");

			connection.execute(query1, function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					// console.log("no error in query1");
				}
				data1=result.rows;
				// console.log(data1);
					var query2 = "SELECT view_name  from user_views";
				connection.execute(query2, function (err, result) {
					if (err) {
						console.log(err);
						return;
					} else {
					//  console.log("no error in query2");
					}
				console.log(attribute2);
				data2=result.rows;
				// console.log(data2);
				var query3 = "select email from user_requests"; ////query oracle sql
				// console.log(result.rows);
				connection.execute(query3, function (err, result) {
					if (err) {
						console.log(err);
						return;
					} else {
						// console.log("no error in query3");
					}
					data3=result.rows;
					// console.log(data3);
					console.log(attribute2);
					console.log(result.rows);

					res.render('myviews', {
						user:user,
						table: req.params.table,
						data1: data1,
						data2:data2,
						data3:data3,
						btn: btn,
						flag: true,
						link: link
					});
				});
		});
	});

});
});

app.post("/view-assigned", function (req, res) {
	// console.log(req.body);

	oracledb.getConnection({
		user: username,
		password: pass,
		connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
	},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}


			var query4 = "SELECT * from user_view";
			var query2 = "SELECT view_name  from user_views";
			var query3 = "select name from users";
			var query1 = "insert into user_view values (:t1,:t2)";
			var attribute2 = [];
			var data1;
			var data2;
			var data3;
			var data4;
			// console.log("oracle entered");

			connection.execute(query1, [req.body.view,req.body.email], {
				autoCommit: true
			},function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					// console.log("no error in query1");
				}


				connection.execute(query2, function (err, result) {
				 if (err) {
					 console.log(err);
					 return;
				 } else {
					//  console.log("no error in query2");
				 }
				console.log(attribute2);
				data2=result.rows;
				// console.log(data2);
			 ////query oracle sql
				// console.log(result.rows);
				connection.execute(query3, function (err, result) {
					if (err) {
						console.log(err);
						return;
					} else {
						// console.log("no error in query3");
					}
					data3=result.rows;
					// console.log(data3);
					connection.execute(query4,function (err, result) {
 					 if (err) {
 						 console.log(err);
 						 return;
 					 } else {
 						//  console.log("no error in query4");
 					 }
					 data1=result.rows;
					//  console.log(data1);
 					console.log(attribute2);
 					console.log(result.rows);

					 res.render('myviews', {
 					 user:user,
 					 table: req.params.table,
 					 data1: data1,
 					 data2:data2,
 					 data3:data3,
 					 btn: btn,
 					 flag: true,
 					 link: link
 				 });
 				 });
		});
	});

});
});
});
app.get("/home", function (req, res) {

	// console.log(req.params.table);

	oracledb.getConnection({
		user: username,
		password: pass,
		connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
	},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}


			var table_Query = "SELECT table_name FROM all_tables where owner= :tn and table_name not like 'APEX$%' and table_name  not like 'DEMO%' and table_name  not like 'DEPT' and table_name  not like 'EMP'";

			var attribute2 = [];
			// console.log("oracle entered");

			connection.execute(table_Query,[username.toUpperCase()], function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					// console.log("no error in query1");
				}

				// console.log(result.rows);
				// console.log(result.rows[0][0]);
					tables=result.rows;
					btn=1;
					user="Guest";
				res.render('home', {
					news:news,
					tables:tables,
					user:user,
					btn:1,
					link: link
				});
		});
	});

});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



//++++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//RENDERING GET PAGES FOR INPUT FORMS
app.get("/get/:table", function (req, res) {
	// console.log(req.params.table);
	req.params.table = req.params.table.toUpperCase();
	oracledb.getConnection({
		user: username,
		password: pass,
		connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
	},
	function (err, connection) {
		if (err) {
			console.error("error in submitted: " + err.message);
			return;
		}


		var colQuery = "SELECT column_name,data_type FROM all_tab_cols WHERE table_name = :tn order by COLUMN_ID";

		var attribute2 = [];
		// console.log("oracle entered");

		connection.execute(colQuery, [req.params.table], function (err, result) {
			if (err) {
				console.log(err);
				return;
			} else {
				// console.log("no error in query1");
			}

			// console.log(result.rows);
			// console.log(result.rows[2][1]);

			seqQuery = `select sequence_name, column_name, prefix from sequence_record where table_name = '${req.params.table}'`;
			console.log(seqQuery);
			connection.execute(seqQuery, function(err, seq){
				if(err){
					console.log(err);
					return;
				} else {
					console.log("no error in finding sequence");
				}

				console.log("found seq are = " + seq.rows);
				
				var currvalQuery = `select ${seq.rows[0][0]}.nextval from dual`;
				console.log("currvalQuery = " + currvalQuery);

				connection.execute(currvalQuery, function(err, currval){

					if(err){
						console.log(err);
					} else {
						console.log("no error in getting currval");
						
					}
					
					temp = seq.rows[0][2] + currval.rows[0];
					console.log(temp);
					res.render('get', {
						sequenced_column: seq.rows[0][1],
						currval: temp,
						user: user,
						table: req.params.table,
						column: result.rows,
						btn: btn,
						flag: true,
						link: link
					});
				});
			});
		});
	});

});
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

//++++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//SHOWING TABLE DATA [SELECT * FROM TABLENAME] RENDERING QUERY PAGE
app.get("/query/:table", function (req, res) {
	// console.log(req.params.table);
	req.params.table = req.params.table.toUpperCase();

	oracledb.getConnection({
			user: username,
			password: pass,
			connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
		},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}


			var colQuery = "SELECT column_name,data_type FROM all_tab_cols WHERE table_name = :tn order by COLUMN_ID";

			var attribute2=[];
			// console.log("oracle entered");

				connection.execute(colQuery,[req.params.table.toUpperCase()], function (err, attribute) {
				if (err) {
					console.log(err);
					return;
				} else {
					// console.log("no error in query1");
				}

				// console.log("column names are = " + attribute.rows);


				console.log("checking1..............");
				var sqlQuery = `select * from  ${req.params.table}`; ////query oracle sql
				var sqlQuery1 = `select `;

				for(var i = 0; i < attribute.rows.length; i++){
					if(attribute.rows[i][1] == 'DATE')
						sqlQuery1 += `TO_char(${attribute.rows[i][0]}, 'DD-MONTH-YYYY') `;
					else
						sqlQuery1 += ` ${attribute.rows[i][0]} `;

					if(i < attribute.rows.length - 1)
						sqlQuery1 += `, `;
				}
				sqlQuery1 += ` from ${req.params.table}`;
				 console.log(attribute.rows);
				 console.log("sqlQuery1 = " + sqlQuery1);

				connection.execute(sqlQuery1, function (err, result) {
					 if (err) {
						 console.log(err);
						 return;
					 } else {
						 console.log("no error in query2");
					 }
					console.log(attribute2);
					//  console.log(result.rows);


					 //var attribute = ["name", "ID", "Nationality", "Religion", "Gender", "Email_address", "mobile", "Birth_Date", "city", "Street", "Zip_code", "Height", "Weight"];

					 var MX = result.rows.length;
					 var len = attribute.rows.length;

					 res.render('query', {
						 	user:user,
						 tn:req.params.table,
						 btn:btn,
						 attribute: attribute.rows,
						 value: result.rows,
						 link: link,
						 MX: MX,
						 len: len
					 });
				 });

			});



		}
	);



});
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

//++++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//rendering get page with flag false [data inserted successfully page]
app.post("/post/:table", function (req, res) {
	console.log('\n\n\npost method : ');
	console.log(req.params.table);
	req.params.table = req.params.table.toUpperCase();

	 console.log("recieved values are = " + req.body);

	// console.log(req.body.count);
	oracledb.getConnection({
		user: username,
		password: pass,
		connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
	},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}

			var sqlQuery = 'INSERT INTO ' + req.params.table + ' VALUES (';
			//var sqlQuery_string = sqlQuery;
			var cnt = 0;
			var cnt2=0;
			for (var pproperty in req.body) {
				if (req.body.hasOwnProperty(pproperty))
					cnt++;
			}
			cnt2=cnt;
			// console.log("cnt = " + cnt);
			console.log(req.body.length);

			binds = [];
			var obj1={};
			var index=0;
			for (var property in req.body) {
				if (req.body.hasOwnProperty(property)) {
					cnt--;

					  index++;
					 if(property.search('DATE') != -1){
						 	//var date= new Date(req.body[property]);
						obj1[property]= req.body[property];
 	 				//	sqlQuery=sqlQuery+':'+property;
					 	sqlQuery += "TO_DATE(:" + property + ", 'yyyy/mm/dd')";
					 	// console.log("date is : " + property);
					 }
					 else{
						obj1[property]=req.body[property];
	 					sqlQuery=sqlQuery+':'+property;
					 }
					 if(index < cnt2)
						 sqlQuery=sqlQuery+',';
					//  console.log("obj1 = " + obj1);
				}
			}
			binds.push(obj1);
			sqlQuery += ')';
		//	sqlQuery_string += ');';

			console.log("oracle entered");
			// console.log("tasfiks ->> sql = " + sqlQuery);
			// console.log("sql in string = " + sqlQuery_string);
			console.log( binds);
			// console.log( binds[0].NAME);

			connection.execute(sqlQuery,binds[0], {
				autoCommit: true
			}, function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					console.log('Rows inserted: ' + result.rowsAffected);
					return;
				}

				// seqQuery = `select sequence_name, column_name from sequence_record where table_name = '${req.params.table}'`;
				// connection.execute(seqQuery, function (err, seq) {
				// 	if (err) {
				// 		console.log(err);
				// 		return;
				// 	} else {
				// 		console.log("no error in finding sequence");
				// 	}

				// 	console.log("found seq are = " + seq.rows);

				// 	var currvalQuery = `select ${seq.rows[0][0]}.nextval from dual`;
				// 	console.log("currvalQuery = " + currvalQuery);

				// 	connection.execute(currvalQuery, function (err, currval) {

				// 		if (err) {
				// 			console.log(err);
				// 		} else {
				// 			console.log("sequence incremented");

				// 		}
				// 	});
				// });
			});
		}
	);

	res.render('get', {
			user:user,
		table:req.params.table,
		btn: btn,
		flag: false,
		link: link
	});
});


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//filtering rows from query page
app.post("/query/:table", function(req, res){
	req.params.table = req.params.table.toUpperCase();
	console.log(req.params.table);

	console.log("filtering = ");
	console.log(req.body);

	oracledb.getConnection({
		user: username,
		password: pass,
		connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
	},
	function (err, connection) {
		if (err) {
			console.error("error in submitted: " + err.message);
			return;
		}


		var colQuery = "SELECT column_name,data_type FROM all_tab_cols WHERE table_name = :tn order by COLUMN_ID";

		var attribute2 = [];
		console.log("oracle entered");

		connection.execute(colQuery, [req.params.table], function (err, attribute) {
			if (err) {
				console.log("1st error = " + err);
				return;
			} else {
				console.log("no error in query1");
			}

			console.log("column names are = " + attribute.rows);


			console.log("checking1..............");
			var flag = false;
			var sqlQuery2 = `select * from ${req.params.table} where `;
			var defaultSQL2 = `select * from ${req.params.table} `;

			var index = 0;

			var cnt = 0;
			for (var property in req.body) {
				cnt++;
			}


			for (var property in req.body) {
				if (req.body.hasOwnProperty(property)) {

					console.log("property = " + property + " value entered = " + req.body[property]);
					console.log("attribute = " + attribute.rows[index] + " index = " + index);

					if(attribute.rows[index][1] == "VARCHAR2")
					{
						if(req.body[property] != ''){
							console.log("varchar2");
							if(flag == true)
								sqlQuery2 += ` AND `;
							sqlQuery2 += ` ${property} = '${req.body[property]}' `;
							flag = true;

							console.log("temp sqlquery2 = " + sqlQuery2);
						}
						index++;
						continue;
					}

					if(req.body[property][0] != ''){

						// console.log("property1 = " + req.body[property][0].length);
						if(flag == true)
							sqlQuery2 += ` AND `;

						if (attribute.rows[index][1] == "DATE")
							sqlQuery2 += ` ${property} >= TO_DATE('${req.body[property][0]}', 'yyyy/mm/dd') `;
						else
							sqlQuery2 += ` ${property} >= ${req.body[property][0]} `;

						flag = true;
					}

					if(req.body[property][1] != ''){

						// console.log("property1 = " + req.body[property][1].length);
						if(flag == true)
							sqlQuery2 += ` AND `;

						if (attribute.rows[index][1] == "DATE")
							sqlQuery2 += ` ${property} <= TO_DATE('${req.body[property][1]}', 'yyyy/mm/dd') `;
						else
							sqlQuery2 += ` ${property} >= ${req.body[property][1]} `;

						flag = true;
					}

					index ++;
				}
			}

			console.log("sqlQuery = " + sqlQuery2);
			if(flag == false)	sqlQuery2 = defaultSQL2;
			// console.log(attribute.rows);
			connection.execute(sqlQuery2, function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					console.log("no error in query2");
				}

				var MX = result.rows.length;
				var len = attribute.rows.length;

				var currvalQuery = `select ${seq.rows[0][0]}.nextval from dual`;
				console.log("currvalQuery = " + currvalQuery);

				connection.execute(currvalQuery, function (err, currval) {
					if (err) {
						console.log(err);
					} else {
						console.log("no error in getting currval");
					}

					res.render('query', {
						user: user,
						tn: req.params.table,
						btn: btn,
						attribute: attribute.rows,
						value: result.rows,
						link: link,
						MX: MX,
						len: len
					});
				});
			});

		});
	});
});

app.get("/register", function (req, res) {
		log=1;

	res.render('login', {
		login_flag:true,
			user:user,
		btn:btn,
		log:log,
		flag:true,
		link: link
	});
});
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

//++++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//rendering login page for registration
app.post("/submitted", function (req, res) {
	// console.log(req.body);

	oracledb.getConnection({
			user: username,
			password: pass,
			connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
		},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}

			binds = [{
				t1: req.body.name,
				t2: req.body.password,
				t3: req.body.email,
				t4: req.body.role,
				t5: "DENIED"
			}];
			var sqlQuery = 'INSERT INTO user_requests VALUES (:t1,:t2,:t3,:t4,:t5)';

			connection.execute(sqlQuery, binds[0], {
				autoCommit: true
			}, function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else{
					console.log('Rows inserted: ' + result.rowsAffected);
					// console.log(binds);
					return;
				}
			});
		}
	);

	res.render('login', {
		login_flag:true,
			user:user,
		btn:btn,
		log:log,
		flag: false,
		link: link
	});
});
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

//++++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//rendering login page for login
app.post("/logged", function (req, res) {
	// console.log(req.body);

	oracledb.getConnection({
			user: username,
			password: pass,
			connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
		},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}

			binds = [{
				t1: req.body.name,
				t2: req.body.email,
				t3: req.body.password,
				t4: req.body.role
			}];
			var sqlQuery = "select * from users where  name = :n and email= :e and password=:p and role=:r";

			connection.execute(sqlQuery,[binds[0].t1,binds[0].t2,binds[0].t3,binds[0].t4], function (err, result) {
			if (err || result.rows.length==0 ||(btn==1 && binds[0].t4!='VIEWER')||(btn==2 && binds[0].t4!='DEVELOPER')||(btn==3 && binds[0].t4!='ADMIN')) {
				// console.log("login failed!!");
				// console.log(btn);
				//btn=1;
				log=3;

				res.render('login', {
					login_flag:false,
					tables:tables,
					user:user,
					btn:btn,
					log:log,
					flag: true,
					link: link
				});
				return;
			} else {
				// console.log("login successful!!");
					login_flag=true;
				log=3;
				user=req.body.name;
				email_g=req.body.email;
				var table_Query = "SELECT view_name from user_view where email= :em";

				var attribute2 = [];
				// console.log("oracle entered");

				connection.execute(table_Query,[email_g], {
					autoCommit: true
				} ,function (err, result) {
					if (err) {
						console.log(err);
						return;
					} else {
						// console.log("no error in query1");
						// console.log(result.rows);
					//	console.log(result.rows[0][0]);
					}


						tables=result.rows;
						var page;
						if(btn==1 || btn==2) page='home';
						else page='admin_do';
						res.render(page, {
						news:news,
						tables:tables,
						user:user,
						btn:btn,
						link: link
					});
			});
			}

		});
		}
	);



});
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 	NEW UPDATES START $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
app.get("/new", function (req, res) {

	res.render('maternalDashboard', {
		data:data,
			user:user,
		log:log,
		btn:btn,
		link: link
	});
});







//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 	NEW UPDATES END  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
app.get("/*", function (req, res) {
	//gets everything if above get function are not used
	res.send("<h1><center>"+"Error 404 : PAGE NOT FOUND!!"+"</center></h1>");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++=
//server is running with command node server.js
app.listen(port, host, function (err) {

	if (err){
		console.log("error happend");
	}
	console.log("server has started on link : " + link);
});
