//Declaring global variables
var MAX_LENGTH = 4,
    start = [],
    grid = [],
    path = [],
    solutions = [],
    pathCount = 0;

//Function to generate a random number between 0 and x
function getRandNum(x) {    
    return Math.floor(Math.random() * x);
}

//function to create the grid data
function setGrid() {
    
    grid[0] = [{x:0,y:0,status:"O"},{x:0,y:1,status:"X"},{x:0,y:2,status:"O"},{x:0,y:3,status:"O"}];
    grid[1] = [{x:1,y:0,status:"X"},{x:1,y:1,status:"O"},{x:1,y:2,status:"O"},{x:1,y:3,status:"O"}];
    grid[2] = [{x:2,y:0,status:"O"},{x:2,y:1,status:"O"},{x:2,y:2,status:"X"},{x:2,y:3,status:"X"}];
    grid[3] = [{x:3,y:0,status:"O"},{x:3,y:1,status:"X"},{x:3,y:2,status:"O"},{x:3,y:3,status:"O"}];
    
    $('#grid').append("<p>"+grid[0][3].status+grid[1][3].status+grid[2][3].status+grid[3][3].status+"</p><p>"+grid[0][2].status+grid[1][2].status+grid[2][2].status+grid[3][2].status+"</p><p>"+grid[0][1].status+grid[1][1].status+grid[2][1].status+grid[3][1].status+"</p><p>"+grid[0][0].status+grid[1][0].status+grid[2][0].status+grid[3][0].status+"</p>")

}

//function to generate a random starting position on the Y axis. 
function getStartingPosition() {
    
    var positionFound = false;
    var startPosition = {};
    var i;
    while(!positionFound) {
        i = getRandNum(4);
        
        if(grid[0][i].status == "X") {
            continue;
        } else {
      
            startPosition = [0,grid[0][i].y,grid[0][i].status];
            positionFound = true;
        }
    }
     return startPosition;   
}


//function to check if our current position is contained within our path already.
function checkPosition(currentPosition, array) {
    var i = 0,
        x = currentPosition[0], 
        y = currentPosition[1];

    for (i = 0; i < array.length; i++) {
        if (x == array[i][0] && y == array[i][1]) {
            return true;
        }
    }
    return false;
}

//findPath is a recursive function that looks at the x, y and status of our current position.  Determines if the possible moves: up, down, or right are valid moves (not off the grid or do not contain a pothole) and store those next positions in an array. It then pushes our current position in an array. In then check our current positon to see if its X axis is at 3 (the other side of the road) and is not a pothole. If that is true that we slice to path to our solution variable and push that into a solutions array. We then increment the number of pathCounts by 1.  If our condition is false we check the validity of our next moves or if the next move from our current position is in our path already. If those conditions are false that we run our function again on the next possible move. If there are no possible moves or we reach the other side we pop off the last element of the path.  
function findPath(currentPosition) {
    var i = 0,
        x = currentPosition[0], 
        y = currentPosition[1],
        s = currentPosition[2];
        if (x < 3) {
            var s1 = grid[x+1][y].status;
        }
        if (y < 3) {
            var s2 = grid[x][y+1].status;
        }
        if (y >= 1) {
            var s3 = grid[x][y-1].status;
        }
        var nextMoves = [[x+1,y,s1],[x,y+1,s2],[x,y-1,s3]];
        
    path.push(currentPosition);

    if (x == 3 && s != "X") {
        var solution = path.slice(0);
        solutions.push(solution);
        pathCount++;
        
        for (i = 0;i < solution.length; i++) {
            if (solution[i][0] == 3) {
                $('#paths').append('<span>('+solution[i][0]+','+solution[i][1]+')</span><br>');    
            } else {
                $('#paths').append('<span>('+solution[i][0]+','+solution[i][1]+')-></span>');
            }
        }
        
    }
    else {
        for (i = 0; i < nextMoves.length; i++) {
            if (nextMoves[i][0] < 0 || nextMoves[i][0] > 3 || nextMoves[i][1] < 0 || nextMoves[i][1] > 3 || nextMoves[i][2] == "X")  {
            }
            else {
                if (checkPosition(nextMoves[i], path)) {
                } else {
                    findPath(nextMoves[i]);
                }
            }
        }
    }
    path.pop();
}

//at the document ready event we generate the grid, find our starting path and run our recursive function to find the possible paths. We then append to our html the answers. 
$(document).ready(function(){    
 
    setGrid();
    
    start = getStartingPosition();
    findPath(start);

    $('#validPaths').append('<p>Valid paths Henny can take if starting at ('+start[0]+','+start[1]+'):</p>');
    $('#answer').append('<p><span class="bold">Answer:</span> Total valid paths from starting point ('+start[0]+','+start[1]+') is '+pathCount+'');
    
    
    
});
    

