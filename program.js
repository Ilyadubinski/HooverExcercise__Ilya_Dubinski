var fs = require('fs');
try {
    var oneArray = fs.readFileSync('input.txt', 'utf8').split("\n");
} catch (e) {
    console.log('Error:', e.stack);
}
// driving instructions
// Do this outside of try statement for scope reasons 
let dD = oneArray.pop()

twoD = oneArray.map(ele => {
    position = ele.split(' ');
    position[0] = Number(position[0]);
    position[1] = Number(position[1]);
    return position;
})

    // grid dimmension
    let gD = twoD.shift();
    // hoover starting position
    let hP =twoD.shift();
    // dirt locations
    let dL = twoD;
    // North, South, East, West
    let N = [0,1];
    let S = [0,-1];
    let E = [1,0]; 
    let W = [-1,0]; 
    let numPatchCl = 0;

for (let i = 0; i < dD.length; i++) {
    // clone hoover position and save it
    let oldhP = Array.from(hP);
    // check if we landed on a patch of dirt-->remove it if we did
    dL.forEach(pos => {
       if (hP[0] === pos[0] && hP[1] === pos[1] ) {
           numPatchCl += 1;
           pos[0] = pos['-']
           pos[1] = pos['-']
       }
   })
    // move the hoover
    if (dD[i] === 'N') {
        hP[0] += N[0];
        hP[1] += N[1];
    } else if (dD[i] === 'S') {
        hP[0] += S[0];
        hP[1] += S[1];
    } else if (dD[i] === 'E') {
        hP[0] += E[0];
        hP[1] += E[1];
    } else if (dD[i] === 'W') {
        hP[0] += W[0];
        hP[1] += W[1];
    }
    // check if we have exited the dimmensions of the grid
    // revert back to oldhP if we did (mimic moving in place against wall)
    if (hP[0] > gD[0]) {
        hP[0] = oldhP[0]
    } else if (hP[1] > gD[1] ) {
        hP[1] = oldhP[1]
    } else if (hP[0] < 0) {
        hP[0] = oldhP[0]
    } else if (hP[1] < 0) {
        hP[1] = oldhP[1]
    }
}

console.log(hP.toString());
console.log(numPatchCl.toString());

