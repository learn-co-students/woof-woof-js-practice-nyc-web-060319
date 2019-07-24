

function populateDogBar() {
  const allDogsData = fetch('http://localhost:3000/pups')
  allDogsData
  .then(res => res.json())
  .then(body => {
    const dogDiv = document.querySelector('#dog-bar')
    body.forEach(function(dog){
      //console.log(dog.name)
      newSpan = document.createElement('span')
      newSpan.innerHTML = dog.name
      newSpan.id = dog.id
      newSpan.class = dog.isGoodDog
      dogDiv.appendChild(newSpan)
    })
  })
}

function listenToDogs() {
  const dogDiv = document.querySelector('#dog-bar')
  dogDiv.addEventListener('click', function(event){
    dogId = event.target.id
    addDogInfo(dogId)
  })
}

function addDogInfo(dogId) {
  const specificDogData = fetch(`http://localhost:3000/pups/${dogId}`)
  specificDogData
  .then(res => res.json())
  .then(body => {
    const dogInfoDiv = document.querySelector('#dog-info')
    dogInfoDiv.innerHTML = ""
    name = body.name
    isGoodDog = body.isGoodDog
    image = body.image
    const nameInfo = document.createElement('h2')
    nameInfo.innerHTML = name
    const isGoodDogInfo = document.createElement('button')
    isGoodDogInfo.id = dogId
    if (isGoodDog)
      {isGoodDogInfo.innerHTML = "Good Dog!"}
    else
      {isGoodDogInfo.innerHTML = "Bad Dog!"}
    const imageInfo = document.createElement('img')
    imageInfo.setAttribute('src', image)
    dogInfoDiv.appendChild(nameInfo)
    dogInfoDiv.appendChild(isGoodDogInfo)
    dogInfoDiv.appendChild(imageInfo)
  })
}

function listenToButtons(){
  dogInfoContainer = document.querySelector('#dog-summary-container')
  dogInfoContainer.addEventListener('click', function(event) {
    //console.log(event.target.tagName === "BUTTON")
    if (event.target.tagName === "BUTTON") {
      dogId = event.target.id
      let change = true
      if (event.target.innerHTML === "Good Dog!")
        {change = false}
      changeDog(dogId, change)
  }
  })
}

function changeDog(dogId, change) {
  const specificDogData = fetch(`http://localhost:3000/pups/${dogId}`,
  { headers:
      { "Content-Type": "application/json" },
    method: "PATCH",
    body:
      JSON.stringify({isGoodDog: change})
  })
  specificDogData
  .then(res => res.json())
  .then(body => {
      addDogInfo(body.id)
  })
}

function listenToFilter(){
  const filter = document.querySelector('#good-dog-filter')
  let turnOn
  filter.addEventListener('click', function(event) {
  if (event.target.innerHTML === "Filter good dogs: OFF")
    {event.target.innerHTML = "Filter good dogs: ON"
      turnOn = true}
  else
    {event.target.innerHTML = "Filter good dogs: OFF"
      turnOn = false}
  filterDogs(turnOn)
  })
}

function filterDogs(turnOn) {
  const dogDiv = document.querySelector('#dog-bar')
  if (turnOn) {
    for (const dog of dogDiv.children) {
      if (dog.class) {
        dog.style.display = 'block'
      }
      else {
        dog.style.display = 'none'
      }}}
  else {
    for (const dog of dogDiv.children) {
        dog.style.display = 'block'
  }}}

populateDogBar()
listenToDogs()
listenToButtons()
listenToFilter()
