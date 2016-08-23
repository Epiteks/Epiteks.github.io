function req(url) {

	var base = "https://api.github.com";

	var xhttp = new XMLHttpRequest();

	xhttp.open("GET", base + url, false);
	xhttp.send();

	return JSON.parse(xhttp.response);
}

function getDevs() {

	function addDev(data) {

		var nameURL = "/users/";
		var tmp = req(nameURL + data.login);
		var html =
"		<div class='dev'>"+
"			<a href='{{url}}' target='_blank'>"+
"				<div class='face'>"+
"					<img src='{{avatar}}'>"+
"				</div>"+
"				<p class='nickname'>@{{login}}</p>"+
"				<p class='fullname'>{{name}}</p>"+
"			</a>"+
"		</div>";
		var dict = {
			"{{url}}": data.html_url,
			"{{avatar}}": data.avatar_url,
			"{{login}}": data.login,
			"{{name}}": tmp.name
		};
		var devs = document.getElementsByClassName("devs")[0];

		for (var key in dict) {
			html = html.replace(key, dict[key]);
		}

		devs.innerHTML += html;

	}

	var url = "/orgs/Epiteks/members";
	var res = req(url);

	for (var i = 0; i < res.length; i++) {
		addDev(res[i]);
	}

}

function getRepos() {

	function addRepo(data) {

		var html =
"		<div class='project'>"+
"			<a href='{{url}}' target='_blank'>"+
"				<div class='content'>"+
"					<h4>{{name}}</h4>"+
"					<p class='desc'>{{desc}}</p>"+
"				</div>"+
"			</a>"+
"		</div>";
		var dict = {
			"{{url}}": data.html_url,
			"{{name}}": data.name,
			"{{desc}}": data.description
		};
		var projects = document.getElementsByClassName("projects")[0];

		for (var key in dict) {
			html = html.replace(key, dict[key]);
		}

		projects.innerHTML += html;
	}

	var url = "/orgs/Epiteks/repos";
	var res = req(url);

	console.log("REPOS");
	for (var i = 0; i < res.length; i++) {
		addRepo(res[i]);
	}

}

document.addEventListener("DOMContentLoaded", function(event) { 
	getDevs();
	getRepos();
});
