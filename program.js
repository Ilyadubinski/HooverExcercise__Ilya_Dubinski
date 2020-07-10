const fs = require('fs');
const North = [0,1];
const South = [0,-1];
const East = [1,0]; 
const West = [-1,0]; 


function hooverProcess () {

    try {
        var allDataArray = fs.readFileSync('input.txt', 'utf8').split("\n");
    } catch (e) {
        console.log('Error:', e.stack);
    }
    
    
    let drivingInstructions = allDataArray.pop()
    
    
    allDataTwoDimArray = allDataArray.map(ele => {
        position = ele.split(' ');
        position[0] = Number(position[0]);
        position[1] = Number(position[1]);
        return position;
    })
    
    
    let gridDimmensions = allDataTwoDimArray.shift();
    let currentHooverPosition = allDataTwoDimArray.shift();
    let dirtLocations = allDataTwoDimArray;
    let dirtRemovedCounter = 0;
    
    
    
    for (let i = 0; i < drivingInstructions.length; i++) {
        let oldHooverPosition = Array.from(currentHooverPosition);
        dirtLocations.forEach(pos => {
                if (currentHooverPosition[0] === pos[0] && currentHooverPosition[1] === pos[1] ) {
                dirtRemovedCounter += 1;
                pos[0] = pos['-']
                pos[1] = pos['-']
            }
        })
        // move the hoover
        if (drivingInstructions[i] === 'N') {
            currentHooverPosition[0] += North[0];
            currentHooverPosition[1] += North[1];
        } else if (drivingInstructions[i] === 'S') {
            currentHooverPosition[0] += South[0];
            currentHooverPosition[1] += South[1];
        } else if (drivingInstructions[i] === 'E') {
            currentHooverPosition[0] += East[0];
            currentHooverPosition[1] += East[1];
        } else if (drivingInstructions[i] === 'W') {
            currentHooverPosition[0] += West[0];
            currentHooverPosition[1] += West[1];
        }
        // check if we have exited the dimmensions of the grid
        // revert back to oldHooverPosition if we did (mimic moving in place against wall)
        if (currentHooverPosition[0] > gridDimmensions[0]) {
            currentHooverPosition[0] = oldhooverPosition[0]
        } else if (currentHooverPosition[1] > gridDimmensions[1] ) {
            currentHooverPosition[1] = oldhooverPosition[1]
        } else if (currentHooverPosition[0] < 0) {
            currentHooverPosition[0] = oldhooverPosition[0]
        } else if (currentHooverPosition[1] < 0) {
            currentHooverPosition[1] = oldhooverPosition[1]
        }
    }
    
    console.log(currentHooverPosition.toString());
    console.log(dirtRemovedCounter.toString());


}



