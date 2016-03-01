angular.module('con4', [])
	.controller('GameController', function($scope){
   $scope.redWins= 0;
   $scope.blackWins = 0;
		$scope.newGame = function(){
			$scope.victory = false;
            $scope.grid = buildGrid();
            $scope.activePlayer = 'Red';
		}
		
		function buildGrid(){
            var grid = {};
            for(var row = 0; row < 6; row++){
                grid[row] = [];
                for (var col = 0; col < 7; col++){
                    grid[row][col] = {row: row, col: col}
                }
            }
            return grid;
        }
			
		
		$scope.dropToken = function(col){
			
			if($scope.grid[0][col].hasToken){
				return;
			}
			
			var row = checkSouth(0, col);
            var cell = $scope.grid[row][col];
            cell.hasToken = true;
            cell.color = $scope.activePlayer;
            endTurn();
            checkVictory(cell);

		}
		
		function checkSouth(row, col){

			if($scope.grid[row][col].hasToken){
                return row - 1;
            }
			if(row >= 5){
                return row;
            }
            row++;
            return checkSouth(row, col);

		}
		
		function checkVictory(cell){

			
			var horizontalMatches = 0;
			
			horizontalMatches += checkNextCell(cell, 0, 'left');
			horizontalMatches += checkNextCell(cell, 0, 'right');
			
			
			var verticalMatches = 0;
			verticalMatches += checkNextCell(cell, 0, 'bottom');
			
			
			var diagLeft = 0;
			diagLeft += checkNextCell(cell, 0, 'diagUpLeft');
			diagLeft += checkNextCell(cell, 0, 'diagBotRight');
			
			
			var diagRight = 0;
			diagRight += checkNextCell(cell, 0, 'diagUpRight');
			diagRight += checkNextCell(cell, 0, 'diagBotLeft');
			
			if(verticalMatches >= 3 || horizontalMatches >= 3 || diagLeft >= 3 || diagRight >= 3){
                
                if($scope.activePlayer === "Red"){
                    $scope.blackWins++;
                } else {$scope.redWins++;}
				alert(cell.color + ' Wins!');
                
                $scope.newGame();
			}
		}
		
		function getNextCell(cell, direction){
            var nextRow = cell.row;
            var nextCol = cell.col;
            if(direction === "bottom"){
                nextRow++;
            } else if (direction === "left"){
                nextCol--;
            } else if (direction === "right"){
                nextCol++
            } else if (direction === "diagUpLeft"){
                nextRow--;
                nextCol--;
            } else if (direction === "diagUpRight"){
                nextRow++;
                nextCol--;
            } else if (direction === "diagBotLeft"){
                nextRow--;
                nextCol++
            } else if (direction === "diagBotRight"){
                nextRow++;
                nextCol++;
            }
            
            
            if (nextRow < 0 || nextRow > 5 || nextCol > 6){
                return;
            }
                return $scope.grid[nextRow][nextCol];
            }
			
		
		function checkNextCell(cell, matches, direction){
            var nextCell = getNextCell(cell, direction);
            if (nextCell && nextCell.hasToken && nextCell.color === cell.color){
                matches++;
                return checkNextCell(nextCell, matches, direction)
            } return matches;
			
		}
		
		function endTurn(){
            if($scope.activePlayer === "Red"){
                $scope.activePlayer = "Black";
            } else {
                $scope.activePlayer = "Red";
            }
			
		}
	});