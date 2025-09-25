const renderTeams = async () =>{
    const res = await fetch('http://localhost:3001/teams');
    const data = await res.json();
    const mainContent = document.getElementById('main-content')
    if(data){
        data.forEach(team => {
            const card = document.createElement('div');
            card.classList.add('card');
            const topContainer = document.createElement('div')
            topContainer.classList.add('top-container')
            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add('bottom-container')
            topContainer.style.backgroundImage = `url(${team.image})`
            const name = document.createElement('h3')
            name.textContent = team.teamName
            bottomContainer.appendChild(name)
            const game = document.createElement('p')
            game.textContent = 'Game: ' + team.game
            bottomContainer.appendChild(game)
            const country = document.createElement('p')
            country.textContent = 'Country: ' + team.country
            bottomContainer.appendChild(country)
            const majorWins = document.createElement('p')
            majorWins.textContent = 'Major Wins: ' + team.majorWins.join(', ')
            const link = document.createElement('a')
            link.textContent = 'See more'
            link.setAttribute('role', 'button')
            link.href = `http://localhost:3001/teams/${team.teamName}`
            bottomContainer.appendChild(majorWins)
            bottomContainer.appendChild(link)
            card.appendChild(topContainer)
            card.appendChild(bottomContainer)
            mainContent.appendChild(card)
        })
        
        }else{
            const noData = document.createElement('h2')
            noData.textContent = 'No Teams Available 😞'
            mainContent.appendChild(noData);
        }

}



renderTeams();