var fs = require('fs');

//The JSON file for the data
const matchesData = require(process.argv[2]);
const delieveries = require(process.argv[3]);

//City wise Calculation
var bangloreMatches = matchesData.filter((matchItem)=>{
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

var macthes = {};

delieveries.forEach((delItem)=>{

	// var currentTeam = teams[delItem.batting_team];

	// if(currentTeam) {
	// 		//If team exists
	// 		currentTeam.runs = teams[delItem.batting_team].runs + Number(delItem.total_runs);
	// 		currentTeam.matches_played = currentTeam.last_match_id !== delItem.match_id ? Number(currentTeam.matches_played) +1 : currentTeam.matches_played;
			
	// 		if(delItem.match_id === currentTeam.last_match_id) {
	// 				delItem.over < 7 ? (currentTeam.five_over_score_next += Number(delItem.total_runs)) : null;
	// 		} else {
	// 			currentTeam.five_over_score_last = currentTeam.five_over_score_next;
	// 			delItem.over < 7 ? (currentTeam.five_over_score_next = Number(delItem.total_runs)) : null;
	// 		}

	// 		currentTeam.highest_five_over_score = Math.max(currentTeam.highest_five_over_score,currentTeam.five_over_score_next, currentTeam.five_over_score_last);


	// 		//Change the ID to the current ID
	// 		currentTeam.last_match_id = delItem.match_id;

	// } else {
	// 	//If team doesnt exists make tthe first entry
	// 	teams[delItem.batting_team] = {
	// 			runs: Number(delItem.total_runs),
	// 			matches_played: 1,
	// 			last_match_id: delItem.match_id,
	// 			highest_five_over_score: 0,
	// 			five_over_score_last : 0 ,
	// 			five_over_score_next : Number(delItem.total_runs)
	// 		}
	// }

	//Match wise data
	
	var currentId = delItem.match_id;
	var currentMatch = macthes[currentId];
	var currentInnings = Number(delItem.inning);
	var currentRun = Number(delItem.total_runs);
	var currentOver = delItem.over;
	var currentBatsmanRun = Number(delItem.batsman_runs);

	var currentBoundaryRuns = currentBatsmanRun > 3 ? (currentBatsmanRun === 5 ? 4 : currentBatsmanRun) : 0;
	var sixCurrent = currentBoundaryRuns === 6 ? 1 : 0;
	var fourCurrent = (currentBoundaryRuns === 4 || currentBoundaryRuns === 5) ? 1 : 0;

	if(currentMatch) {
		currentMatch.total_runs = currentMatch.total_runs + currentRun;
		if(currentInnings === 1) {
			//Total Runs in first innings
			currentMatch.firstInnings.runs += currentRun;
			//Runs in first powerplay
			if(currentOver < 7) {
				currentMatch.firstInnings.powerPlay += currentRun;
			}
			//Total boundary runs and stats
			currentMatch.firstInnings.boundaries.total_runs += currentBoundaryRuns;
			currentMatch.firstInnings.boundaries.no_of_six += sixCurrent;
			currentMatch.firstInnings.boundaries.no_of_four += fourCurrent; 

		} else if(currentInnings === 2) {
			//Total runs in first innings
			currentMatch.secondInnings.runs += currentRun;
			//Runs in first powerplay
			if(currentOver < 7) {
				currentMatch.secondInnings.powerPlay += currentRun;
			}
			//Total boundary runs and stats
			currentMatch.secondInnings.boundaries.total_runs += currentBoundaryRuns;
			currentMatch.secondInnings.boundaries.no_of_six += sixCurrent;
			currentMatch.secondInnings.boundaries.no_of_four += fourCurrent; 
		}
		
	} else {
		macthes[currentId] = {
			total_runs: currentRun,
			firstInnings:{
				runs: currentRun,
				team: delItem.batting_team,
				powerPlay: currentRun,
				boundaries: {
					total_runs: currentBoundaryRuns,
					no_of_six: sixCurrent,
					no_of_four: fourCurrent
					}
				},
			secondInnings: {
				team: delItem.bowling_team,
				runs: 0,
				powerPlay: 0,
				boundaries: {
					total_runs: 0,
					no_of_six: sixCurrent,
					no_of_four: fourCurrent
				}
			}
		}
	}	
});

var seasons = {};

matchesData.forEach((matchItem)=> {
	let currentId = matchItem.id;
	let currentMatch =  macthes[currentId];
	let currentSeason = seasons[matchItem.season];

	if(currentSeason) {

		//if the record already exist
		currentSeason.total_runs += currentMatch.total_runs; 
		
		currentSeason.firstInnings.runs += currentMatch.firstInnings.runs;
		currentSeason.secondInnings.runs += currentMatch.secondInnings.runs;
		//First innings	
		currentSeason.firstInnings.boundaries.runs += currentMatch.firstInnings.boundaries.total_runs;
		currentSeason.firstInnings.boundaries.no_of_six += currentMatch.firstInnings.boundaries.no_of_six;
		currentSeason.firstInnings.boundaries.no_of_four += currentMatch.firstInnings.boundaries.no_of_four;
		//second Innings
		currentSeason.secondInnings.boundaries.runs += currentMatch.secondInnings.boundaries.total_runs;
		currentSeason.secondInnings.boundaries.no_of_six += currentMatch.secondInnings.boundaries.no_of_six;
		currentSeason.secondInnings.boundaries.no_of_four += currentMatch.secondInnings.boundaries.no_of_four;

		// //teams
		let currentTeam;
		//If the current match has
		if(currentSeason.teams[currentMatch.firstInnings.team]) {
				currentTeam = currentSeason.teams[currentMatch.firstInnings.team];

				currentTeam.firstInnings.runs += currentMatch.firstInnings.runs;
				currentTeam.firstInnings.boundaries.total_runs += currentMatch.firstInnings.boundaries.total_runs;
				currentTeam.firstInnings.boundaries.no_of_six += currentMatch.firstInnings.boundaries.no_of_six;
				currentTeam.firstInnings.boundaries.no_of_four += currentMatch.firstInnings.boundaries.no_of_four;

			}
		else {
			currentSeason.teams[currentMatch.firstInnings.team] = {
				firstInnings: {
					runs: currentMatch.firstInnings.runs,
					boundaries: currentMatch.firstInnings.boundaries
				},
				secondInnings: {
					runs: 0,
					boundaries: {
						total_runs: 0,
						no_of_four: 0,
						no_of_six: 0
					}
				}
			};
		}

		if(currentSeason.teams[currentMatch.secondInnings.team]) {
			currentTeam = currentSeason.teams[currentMatch.secondInnings.team];
			
			currentTeam.secondInnings.runs += currentMatch.secondInnings.runs;
			currentTeam.secondInnings.boundaries.total_runs += currentMatch.secondInnings.boundaries.total_runs;
			currentTeam.secondInnings.boundaries.no_of_six += currentMatch.secondInnings.boundaries.no_of_six;
			currentTeam.secondInnings.boundaries.no_of_four += currentMatch.secondInnings.boundaries.no_of_four;			
		} else {
			currentSeason.teams[currentMatch.secondInnings.team] = {
				firstInnings: {
					runs: 0,
					boundaries: {
						total_runs: 0,
						no_of_four: 0,
						no_of_six: 0
					}
				},
				secondInnings: { 
					runs: currentMatch.secondInnings.runs,
					boundaries: currentMatch.secondInnings.boundaries
				}
			};
		}

	} else {
		//First time add record
		seasons[matchItem.season] = {
			total_runs: currentMatch.total_runs,
			firstInnings: {
				runs: currentMatch.firstInnings.runs,
				boundaries: {
					runs: currentMatch.firstInnings.boundaries.total_runs,
					no_of_six: currentMatch.firstInnings.boundaries.no_of_six,
					no_of_four: currentMatch.firstInnings.boundaries.no_of_four
				},
			},
			secondInnings: {
				runs: currentMatch.secondInnings.runs,
				boundaries: {
					runs: currentMatch.secondInnings.boundaries.total_runs,
					no_of_six: currentMatch.secondInnings.boundaries.no_of_six,
					no_of_four: currentMatch.secondInnings.boundaries.no_of_four
				}
			},
			teams: {
					[currentMatch.firstInnings.team]:{ 
						firstInnings: {
							runs: currentMatch.firstInnings.runs,
							boundaries: currentMatch.firstInnings.boundaries
						},
						secondInnings: {
							runs: 0,
							boundaries: {
								total_runs: 0,
								no_of_four: 0,
								no_of_six: 0
							}
						}
					},
					[currentMatch.secondInnings.team]:{
						firstInnings: {
							runs: 0,
							boundaries: {
								total_runs: 0,
								no_of_four: 0,
								no_of_six: 0
							}
						},
						secondInnings: {
							runs: currentMatch.secondInnings.runs,
							boundaries: currentMatch.secondInnings.boundaries
						}
					}
				}
		}
	}
});

let stadiums = {};

matchesData.forEach((item)=> {
	let currentStadium = stadiums[item.venue]

	if(currentStadium) {
		currentStadium.win_by_wickets += item.win_by_wickets
		currentStadium.win_by_runs += item.win_by_runs
		currentStadium.total_match++
	} else {
		stadiums[item.venue] = { 
			city : item.city, 
			win_by_wickets: item.win_by_wickets, 
			win_by_runs: item.win_by_runs,
			total_match: 1 
		}
	}

})
// //Write file to local
// fs.writeFile('./data/seasons.json', JSON.stringify(seasons), 'utf-8', function(err) {
// 	if (err) throw err
// 	console.log('Done!')
// })

console.log(stadiums);

