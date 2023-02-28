const searchAllData = () =>{
    const inputSearch = document.getElementById('input-search')
    const inputValue = inputSearch.value;
    // console.log(inputValue)
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputValue}`
    fetch(url)
    .then(res => res.json())
    .then(data => showPlayerData(data.player))
}

const showPlayerData = (players) =>{
   document.getElementById('input-search').value = "";
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = "";
    
    for(player of players){
        const card = document.createElement('div')
        const {strThumb, strPlayer, strNationality, strSport, strWeight, idPlayer} = player /* desctructuring */
        // console.log(player)
        card.innerHTML = `<div class="card w-full bg-base-100 shadow-xl">
        <figure class="mt-5"><img src="${strThumb ? strThumb : "No thumb found"} " alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${strPlayer}</h2>
          <p>Country : ${strNationality}</p>
          <p>Game : ${strSport}</p>
          <p>Weight : ${strWeight}</p>
          <div class="card-actions justify-start">
            <button onclick="getDetails('${idPlayer}')" id="btn-details" class="btn btn-primary">More Details</button>
            <button id="btn-delete" class="btn btn-secondary">Delete</button>
          </div>
        </div>
      </div>`
      cardContainer.appendChild(card)
    }
}

// const deleteCard = () =>{
  
// }

const getDetails = (id) =>{
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.players[0]))
}

const displayDetails = (data) =>{
  document.getElementById('details-container').innerHTML ="";
    // console.log(data)
    const {strThumb, strPlayer, strSport,strWeight, strDescriptionEN, strNationality,strGender } = data

    const maleBanner = document.getElementById('male-banner')
    const femaleBanner = document.getElementById('female-banner')
    if(strGender === "Male"){
      maleBanner.classList.remove('hidden')
      femaleBanner.classList.add('hidden')
    }
    else{
      maleBanner.classList.add('hidden')
      femaleBanner.classList.remove('hidden')
    }
    const detailsContainer = document.getElementById('details-container')
    const div =  document.createElement('div');
    div.innerHTML = `
    <div class="card card-side bg-base-100 shadow-xl">
  <figure class="w-2/3"><img src="${strThumb ? strThumb : "No thumb found"}" alt="Movie"/></figure>
  <div class="card-body">
    <h2 class="card-title">${strPlayer}</h2>
    <p>Country : ${strNationality}</p>
    <p>Sport : ${strSport}</p>
    <p>Weight : ${strWeight}</p>
    </div>
</div>
<p class="py-8 text-lg">${strDescriptionEN.slice(0,500)+" . . ."}</p>
    `
  detailsContainer.appendChild(div)
}

