
When on the game_grid page : http://127.0.0.1:8887/views/game_grid.html you can click 'Load Game State' and that will send the GET request and retrieve the JSON object located in sudoku_project/sample_game_state.json.

Below are the results from changing the following:

Grid: You can change the numbers that will display in the grid cells, just know that the grid, answerGrid, and userGrid are all related, so if they do not correlate correctly, the functionality will break.

answerGrid: Changing the answer grid will change whether the input of a cell is correct or not. If the userInput matches the number in the answerGrid then the cell is marked as valid.

userGrid: This will be filled in upon Loading the Game State. Input after the initially load will also be added to the userGrid array.

hintsRemaining: Can select 0-3. This will update the total tally of hintsRemaining. I still have to build the logic around this, but in the meantime the display will update.

mistakesMade: This will update the total tally of mistakesMade. If you send a number > 3 the game will immediately end upon load. Otherwise the display will update and the game will end once 3 mistakes have been made.

gameOver: If this value is false, the game will end immediately upon load.

totalSeconds: You can update this value (in seconds) to update the timer.
