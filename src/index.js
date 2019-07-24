// CLICK ON DOGS IN THE DOG BAR TO SEE MORE INFO ABOUT THE GOOD PUPPER
// MORE INFO INCLUDES A DOG PIC, A DOG NAME, AND A DOG BUTTON THAT INDICATES WHETHER IT IS A GOOD DOG OR A BAD DOG
// CLICK ON GOOD DOG/BAD DOG BUTTON IN ORDER TO TOGGLE PUP GOODNESS
// CLICK ON "FILTER GOOD DOGS" BUTTON IN ORDER TO JUST SEE GOOD DOGS OR SEE ALL DOGS IN DOG BAR

const dogsBar = document.getElementById("dog-bar")
dogsBar.addEventListener("click", function(e){renderIndivDog(e)});
const dogInfo = document.getElementById("dog-info")
const goodFilter = document.getElementById("good-dog-filter")
console.log("goodFilter is: ", goodFilter);

function fetchDogs(){
    fetch("http://localhost:3000/pups")
    .then(function(resp){
        return resp.json();
    }).then(function(parsedDogs){
        for (const dog of (Array.from(parsedDogs))) {
            createDogButton(dog);
        }
    })
    filterGoodDogs();
}


function createDogButton(dog){
    const dogBtn = document.createElement("button");
    dogBtn.innerText = dog.name;
    dogBtn.id = `dogNo${dog.id}`
    dogBtn.image = dog.image
    dogBtn.dataset.good = dog.isGoodDog ;
    console.log("dog btn:  ", dogBtn)
    dogsBar.appendChild(dogBtn);
}




function renderIndivDog(event){
    while (dogInfo.firstChild) {
        dogInfo.removeChild(dogInfo.firstChild);
    }

    showDog = event.target;
    showDogId = event.target.id.slice(5);
    console.log("event.target is: ", event.target);
    console.log("showDog is: ", showDog);

    nm = document.createElement("h2")
    nm.innerText = showDog.innerText;

    pic = document.createElement("IMG");
    pic.src = showDog.image;

    goodBadBtn = document.createElement("button")
    if (showDog.dataset.good == "false" ){
        goodBadBtn.innerText = "Bad Dog"
    } else {
        goodBadBtn.innerText = "Good Dog"
    }

    goodBadBtn.addEventListener("click", function(){
        if (goodBadBtn.innerText == "Good Dog"){
            goodBadBtn.innerText = "Bad Dog"; 
            goodBadBtn.dataset.good = "false"  // added 9 15
            showDog.dataset.good = "false"
            console.log("showDog.dataset.good  is:", showDog.dataset.good)
            updateDogGoodDB(showDogId, "false");
        } else {
            goodBadBtn.innerText = "Good Dog"; 
            goodBadBtn.dataset.good = "true"  // added 9 15
            showDog.dataset.good = "true"
            console.log("showDog.dataset.good  is:", showDog.dataset.good)
            updateDogGoodDB(showDogId, "true");
        }
    });      
    dogInfo.appendChild(nm);
    dogInfo.appendChild(pic);
    dogInfo.appendChild(goodBadBtn);       
}
    

function updateDogGoodDB(showDogId, gOrB){ 
    console.log("showDogId is ------", showDogId)
                fetch(`http://localhost:3000/pups/${showDogId}`, {
                    headers: {
                        'Content-Type': "application/json; charset=utf-8"
                    },
                    method: "PATCH",
                    body: JSON.stringify({
                        isGoodDog: gOrB
                    })
                }).then(function(resp){
                    console.log(resp.json());
                    //return (resp.json());
                }).then(function(patchresp){
                    console.log("Patch response is: ", patchresp);
                });
}


function filterGoodDogs(){
    goodFilter.addEventListener("click", function(){
        console.log("Click")
        dogs = Array.from(dogsBar.getElementsByTagName("BUTTON"))

        console.log("Dogs [0] is: ", dogs[0])

        if (goodFilter.innerText == "Filter Good Dogs: OFF" ){
            goodFilter.innerText = "Filter Good Dogs: ON" ;
            for (const dog of (dogs)) {
            console.log("Dog Good data --- -", dog.dataset.good )
                if (dog.dataset.good == "false"){
                    let element = document.getElementById(`${dog.id}`);
                    console.log(element)
                    element.style.display = "none";
                    // element.parentNode.removeChild(element);
                }
            } 
        } else {
                goodFilter.innerText = "Filter Good Dogs: OFF" ;
                for (const dog of (dogs)) {
                    console.log("Dog Good data | | | | |", dog.dataset.good )
                    let element = document.getElementById(`${dog.id}`);
                    dog.style.display = "block";
                }          
        }
    })
}


fetchDogs();
