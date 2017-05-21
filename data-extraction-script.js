//The JSON file for the data
const matches = require(process.argv[2]);
const delieveries = require(process.argv[3]);

//City wise Calculation
var bangloreMatches = matches.filter((matchItem)=>{
	if(matchItem.city === "Bangalore"){
		return matchItem;
	}
});

console.log( "Number of matches played in Banglore city:", bangloreMatches.length);

var fiveOverSum = 0;
delieveries.forEach((delItem)=>{
	if(delItem.over < 6) {
		//console.log(delItem);
		fiveOverSum = fiveOverSum + Number(delItem.total_runs)
	}
});

console.log("Total runs scored in 5 overs, across 9 seasons of IPL",fiveOverSum);

var teams = {
	// {
	// 	name:"",
	// 	total_runs: "",
	// 	total_five_over_runs: "",
	// 	matches_played: "",
	// 	highest_five_over_score: ""
	// }
};

delieveries.forEach((delItem)=>{

	var currentTeam = teams[delItem.batting_team];

	if(currentTeam) {
			//If team exists
			currentTeam.runs = teams[delItem.batting_team].runs + Number(delItem.total_runs);
			currentTeam.matches_played = currentTeam.last_match_id !== delItem.match_id ? Number(currentTeam.matches_played) +1 : currentTeam.matches_played;
			
			if(delItem.match_id === currentTeam.last_match_id) {
					delItem.over < 7 ? (currentTeam.five_over_score_next += Number(delItem.total_runs)) : null;
			} else {
				currentTeam.five_over_score_last = currentTeam.five_over_score_next;
				delItem.over < 7 ? (currentTeam.five_over_score_next = Number(delItem.total_runs)) : null;
			}

			currentTeam.highest_five_over_score = Math.max(currentTeam.highest_five_over_score,currentTeam.five_over_score_next, currentTeam.five_over_score_last);


			//Change the ID to the current ID
			currentTeam.last_match_id = delItem.match_id;

	} else {
		//If team doesnt exists make tthe first entry
		teams[delItem.batting_team] = {
				runs: Number(delItem.total_runs),
				matches_played: 1,
				last_match_id: delItem.match_id,
				highest_five_over_score: 0,
				five_over_score_last : 0 ,
				five_over_score_next : Number(delItem.total_runs)
			}
	}
	
});



console.log(teams);

