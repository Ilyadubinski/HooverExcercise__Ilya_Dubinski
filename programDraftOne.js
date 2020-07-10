var fs = require('fs');

// I. Phase 1 - Compile data into a two dimmensional array 
try {
    // Step 1: compile the data in the input.txt file into an object 
    var data = fs .readFileSync('input.txt', 'utf8');
       
    // Step 2: convert the object into a 1 dimmensial 
        // We are spliting on every new line so that the array is organized by line 
    let oneArray = data.split("\n")
        // While we have all of our data in one place within the array, 
        // each of these strings is riddled with spaces
        // These spaces will prove to be pesky when we start accessing using 
        // the data to move our hoover around
    
     // Step 3: convert the object into a 2 dimmensial while also removing sll the spaces within the strings
        // Now our data is organized and can be readily accessed 
    twoArray = oneArray.map(el => {
        return el.split(' ')
    })
    
} catch (e) {
    console.log('Error:', e.stack);
}


// Phase 2 - Organize data 
    // We know that the first line is always the grid dimmensions 
let gridDimmensions = twoArray.shift();
    gridDimmensions = gridDimmensions .map(s => {
        return Number(s);
    })
    // We know the second line is always the hoover's starting position. 
        // We will name it hooverPos because it will not only be the hoover's position
        // We will mutate it as we move the hoover around the roomo 
let hooverPos = twoArray.shift();
    hooverPos = hooverPos.map(s => {
        return Number(s);
    })
    // We know that the last line is always driving directions 
    // We will now extract it from the array so that we can iterate through it later
let drivingDirections = twoArray.pop().pop();
   

    // What we are left with now is a two d array. 
    // The only values in it (if there are any left) are the locations of the patches of dirt. 
    // Let's rename the array just so that it is more intuitive 

let dirtLocations = twoArray;
// console.log(dirtLocations);
    dirtLocations = dirtLocations.map(a => {
        a[0] = Number(a[0]);
        a[1] = Number(a[1]);
        return a; 
})
// Phase 2.A - Translate our cardinal directions 

    // Within the context of our grid our cardinal directions correlate to X Y values 

    // To move North is to move one space up 
    let N = [0,1];
    // To move South is to move one space down 
    let S = [0,-1];
    // To move East is to move one space right 
    let E = [1,0]; 
    let W = [-1,0]; 
    // To move West is to move one space left 

//      console.log(data.toString())
// console.log(gridDimmensions);
// console.log(hooverPos);
// console.log(drivingDirections);
// console.log(dirtLocations);
// console.log('------------------')





// Phase 2.B Create counter to keep track of the number of patches of dirt the robot cleaned up 
    let numberofPatchesCleaned = 0;

// Phase 3 - Moving the Hoover 

for (let i = 0; i < drivingDirections.length; i++) {

    

   dirtLocations.forEach(pos => {

       if (hooverPos[0] === pos[0] && hooverPos[1] === pos[1] ) {
           numberofPatchesCleaned += 1;
           pos[0] = pos['-']
           pos[1] = pos['-']
       }
       
   })

        if (drivingDirections[i] === 'N' && hooverPos[0] <= gridDimmensions[0] && hooverPos[1] <= gridDimmensions[1]) {
        hooverPos[0] += N[0];
        hooverPos[1] += N[1];
    } else if (drivingDirections[i] === 'S' && hooverPos[0] <= gridDimmensions[0] && hooverPos[1] <= gridDimmensions[1]) {
        hooverPos[0] += S[0];
        hooverPos[1] += S[1];
    } else if (drivingDirections[i] === 'E' && hooverPos[0] <= gridDimmensions[0] && hooverPos[1] <= gridDimmensions[1]) {
        hooverPos[0] += E[0];
        hooverPos[1] += E[1];
    } else if (drivingDirections[i] === 'W' && hooverPos[0] <= gridDimmensions[0] && hooverPos[1] <= gridDimmensions[1]) {
        hooverPos[0] += W[0];
        hooverPos[1] += W[1];
    }
        

    
   
}


console.log(hooverPos.toString());
console.log(numberofPatchesCleaned.toString());





// if (drivingDirections[i] === 'N' && hooverPos[0] <= gridDimmensions[0] && hooverPos[1] <= gridDimmensions[1]) {
//     hooverPos[0] += N[0];
//     hooverPos[1] += N[1];
// } else if (drivingDirections[i] === 'S' && hooverPos[0] <= gridDimmensions[0] && hooverPos[1] <= gridDimmensions[1]) {
//     hooverPos[0] += S[0];
//     hooverPos[1] += S[1];
// } else if (drivingDirections[i] === 'E' && hooverPos[0] <= gridDimmensions[0] && hooverPos[1] <= gridDimmensions[1]) {
//     hooverPos[0] += E[0];
//     hooverPos[1] += E[1];
// } else if (drivingDirections[i] === 'W' && hooverPos[0] <= gridDimmensions[0] && hooverPos[1] <= gridDimmensions[1]) {
//     hooverPos[0] += W[0];
//     hooverPos[1] += W[1];
// }