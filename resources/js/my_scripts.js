
const homeTeamName = 'University of Colorado';

/*
	players is an array to hold each player's information.
	Fields:
		name - Football player's name
		img  - The relative/absolute path to the image file.
		alt  - The alternative text that describes the image.
		year - The student's year in college (Freshman, Sophomore, Junior, Senior).
		major- The student's current college major.
		games_played    - The number of football games the student has played for the Buffs.
		pass_yards      - The totalnumber of passing yards in the student's football career for the Buffs.
		rushing_yards   - The tota number of rushing yards in the student's football career for the Buffs.
		receiving_yards - The total number of receiving yards in the student's football career for the Buffs.
*/
var players = [{name:"John Doe", img: "../resources/img/player1.jpg", 
				alt:"Image of Player 1", year:"Sophomore", major:"Art", 
				games_played: 23, pass_yards: 435, rushing_yards: 200, 
				receiving_yards: 88},
				{name:"James Smith", img: "../resources/img/player2.jpg", 
				 alt:"Image of Player 2", year:"Junior", major:"Science", 
				 games_played: 17, pass_yards: 192, rushing_yards: 102, 
				 receiving_yards: 344},
				{name:"Samuel Phillips", img: "../resources/img/player3.jpg", 
				 alt:"Image of Player 3", year:"Freshman", major:"Math", 
				 games_played: 8, pass_yards: 35, rushing_yards: 70, 
				 receiving_yards: 98},
				{name:"Robert Myers", img: "../resources/img/player4.jpg", 
				 alt:"Image of Player 4", year:"Senior", major:"Computer Science", 
				 games_played: 31, pass_yards: 802, rushing_yards: 375, 
				 receiving_yards: 128}];


function viewStudentStats(id, toggle) {
	/* parameters:
	   id - The css id of the html tag being updated.
	   toggle - 
	   	0 - hide the html tag
	   	1 - make the html tag visible */
	var element = document.getElementById(id);
	if(toggle === 0) {
		element.style.height = "0";
		element.style.visibility = 'hidden';
	} else {
		element.style.height = "auto";
		element.style.visibility = 'visible';
	}
}

function changeColor(color) {
	// parameter: 
	// 			color- A css color
	document.body.style.backgroundColor = color;
}

function loadStatsPage() {

	let games = document.getElementById('stats_table').rows;
	let winsDisplay = document.getElementById('wins');
	let lossesDisplay = document.getElementById('losses');
	let wins = 0;
	let losses = 0;
	let rowIndex;
	// Read through each row of the table & 
	// determine which team won the game.
	for (rowIndex=2; rowIndex<games.length; rowIndex++) {
		let gameStatsRow = games[rowIndex];
		let winningTeamName = determineGameWinner(gameStatsRow);
		// Update the winner column to the name of the winning team
		let winnerColumn = gameStatsRow.cells[4];
		winnerColumn.innerHTML = winningTeamName;
		// Keep track of the number of wins/losses for the Buffs.
		if (winningTeamName === homeTeamName) {
			wins++;
		} else { 
			losses++;
		}
	}
	// Update a second table to show the total 
	// number of wins/losses for the Buffs.
	winsDisplay.innerHTML = wins;
	lossesDisplay.innerHTML = losses;
}

function determineGameWinner(gameStatsRow) {
	/* Given a row of the stats table,
	   determine which team won the game. */
	let oppTeamName = gameStatsRow.cells[1].innerHTML;
	let homeScore = parseInt(gameStatsRow.cells[2].innerHTML);
	let oppScore = parseInt(gameStatsRow.cells[3].innerHTML);
	if (homeScore < oppScore) {
		return oppTeamName;
	} else {
		return homeTeamName;
	}
}

function loadPlayersPage() {
	/* Populate the dropdown menu to allow the user to 
	   select which player's information to view. */
	let playerContainerSelector = 'player_selector';
	let playerContainer = document.getElementById(playerContainerSelector);
	let playerIndex;
	for(playerIndex=0; playerIndex<players.length; playerIndex++) {
		let player = players[playerIndex]; 
		// 1. Create an anchor tag
		// 2. Set the href to "#", this will make sure the 
		// 	anchor tag doesn't change pages
		// 3. Set the onclick to call switchPlayers method 
		// 	(this will need to pass in the index inside the players array)
		// 4. Set the anchor tag's text to the player's name.
		playerContainer.innerHTML += `<a class="dropdown-item" href="#" 
										 onclick="switchPlayers(${playerIndex})">
											${player.name}</a>`;
	}
}					


		/* switchPlayers(playerNum) method:
			parameters: 
				playerNum - The index of the football player in the players array.
			
			purpose:
				This method will update the the spans on the player's information pageX
				and calculate the average passing, rushing, and receiving yards.
				
				Span ids:
					p_year     - the player's year in college
					p_major    - the player's major in college
					g_played   - the number of games played for Buffs
					player_img - the player's photo (must set src and alt)
					p_yards    - the number of passing yards
					r_yards    - the number of rushing yards
					rec_yards  - the number of receiving yards
					
					Calculated values:
					  avg_p_yards   - the average number of passing yards for the player's Buff career
					  avg_r_yards   - the average number of rushing yards for the player's Buff career
					  avg_rec_yards - the average number of receiving yards for the player's Buff career
*/

function switchPlayers(playerNum) {
	/* Update the the spans on the player's information page and 
	   calculate the average passing, rushing, and receiving yards. */
	let player = players[playerNum];
	updateElementById('p_year', player['year']);
	updateElementById('p_major', player['major']);
	updateElementById('g_played', player['games_played']);
	updateElementById('p_yards', player['pass_yards']);
	updateElementById('avg_p_yards', Math.ceil(player['pass_yards'] / player['games_played']));

	updateElementById('r_yards', player['rushing_yards']);
	updateElementById('avg_r_yards', Math.ceil(player['rushing_yards'] / player['games_played']));

	updateElementById('rec_yards', player['receiving_yards']);
	updateElementById('avg_rec_yards', Math.ceil(player['receiving_yards'] / player['games_played']));	
	updatePlayerImage(player);
}

function updatePlayerImage(player) {
	let img = document.getElementById('player_img')
	img.src = player['img'];
	img.alt = player['alt'];
}

function updateElementById(eleId, htmlValue) {
	document.getElementById(eleId).innerHTML = htmlValue;
}
s
				

