function getWeight(weight, t, A, O, E){				
    weight += t * (A - O) * E;
    return weight;
}

function getExpectedOutput(weight){
    if(weight !== 0)	return 1;
    else			    return 0;
}

function learn(number) {
    for(var i  = 0; i < GRID_WIDTH ; i++){
        for(var j  = 0; j < GRID_HEIGHT ; j++){
            var E = 0;
            if(pixels[i][j]){
                E = 1;
            }
            grille[i][j][number] = getWeight(grille[i][j][number], 0.5, getExpectedOutput(grille[i][j][number]), 1, E);					
        }
    }			
}

function process() {
    for(var i = 0; i < OUTPUT_COUNT; i++)
            sorties[i] = 0;
    for(i  = 0; i < GRID_WIDTH ; i++){
        for(var j  = 0; j < GRID_HEIGHT ; j++){
            for(var k = 0; k < OUTPUT_COUNT ; k++){
                if(pixels[i][j] === true && grille[i][j][k] !== 0)
                    sorties[k]++;
            }
        }
    }
    
    var numbers = [];
    var z = 0;
    for(i = 0; i < OUTPUT_COUNT; i++){
        if(sorties[i] > NEURONE_SEUIL){
            numbers[z] = i;
            z++;
        }					
    }
    showWeightOfEachNumber(sorties);
    return numbers;
}

function showWeightOfEachNumber(grid){
    var activationRatesDiv = document.getElementById("activationRates");
    activationRatesDiv.innerHTML = "";

    for(var k = 0; k < OUTPUT_COUNT ; k++){
        activationRatesDiv.innerHTML += '<li><strong>'+k+'</strong> : '+grid[k]+'</li>';
    }
}