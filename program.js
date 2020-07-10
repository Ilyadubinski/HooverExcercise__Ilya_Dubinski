const fs = require('fs');
const North = [0,1];
const South = [0,-1];
const East = [1,0]; 
const West = [-1,0]; 

// Main Function

function hooverProcess (){
    let dirtRemovedCounter = 0;
    
    let preppedData  = fetchData()
    let gridDimmensions = preppedData['gridDimmensions']
    let currentHooverPosition = preppedData['currentHooverPosition']
    let dirtLocations = preppedData['dirtLocations']
    let drivingInstructions = preppedData['drivingInstructions']

    for (let i = 0; i < drivingInstructions.length; i++) {
        
        let oldHooverPosition = Array.from(currentHooverPosition);
        dirtRemovedCounter += cleanPatchofDirt(dirtLocations, currentHooverPosition)
        movehoover(drivingInstructions[i], currentHooverPosition)
        checkHooverPosition(gridDimmensions, currentHooverPosition, oldHooverPosition)
        
    }
    
    // Input were strings. Output should match
    console.log(currentHooverPosition.toString());
    console.log(dirtRemovedCounter.toString());
    
    
}


// Helper Functions

function fetchData() {
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

    return {
        'drivingInstructions': drivingInstructions,
        'gridDimmensions': gridDimmensions, 
        'currentHooverPosition': currentHooverPosition,
        'dirtLocations': dirtLocations
    }
}


function checkHooverPosition(gridDimmensions, currentHooverPosition, oldHooverPosition) {
    if (currentHooverPosition[0] > gridDimmensions[0]) {
        currentHooverPosition[0] = oldHooverPosition[0]
    } else if (currentHooverPosition[1] > gridDimmensions[1] ) {
        currentHooverPosition[1] = oldHooverPosition[1]
    } else if (currentHooverPosition[0] < 0) {
        currentHooverPosition[0] = oldHooverPosition[0]
    } else if (currentHooverPosition[1] < 0) {
        currentHooverPosition[1] = oldHooverPosition[1]
    }
    
    
}

function cleanPatchofDirt(dirtLocations, currentHooverPosition) {
    let counter = 0; 

    dirtLocations.forEach(pos => {
        if (currentHooverPosition[0] === pos[0] && currentHooverPosition[1] === pos[1]) {
            counter += 1;
            pos[0] = pos['-']
            pos[1] = pos['-']
        }
    })

    return counter
} 


function movehoover(drivingInstruction, currentHooverPosition) {

    if (drivingInstruction === 'N') {
        currentHooverPosition[0] += North[0];
        currentHooverPosition[1] += North[1];
    } else if (drivingInstruction === 'S') {
        currentHooverPosition[0] += South[0];
        currentHooverPosition[1] += South[1];
    } else if (drivingInstruction === 'E') {
        currentHooverPosition[0] += East[0];
        currentHooverPosition[1] += East[1];
    } else if (drivingInstruction === 'W') {
        currentHooverPosition[0] += West[0];
        currentHooverPosition[1] += West[1];
    }

}


// Method Call

hooverProcess()