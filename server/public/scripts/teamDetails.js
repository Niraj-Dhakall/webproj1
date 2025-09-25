const renderTeamDetails = async () => {
    const path = window.location.pathname;
    const teamName = path.split('/teams/')[1];
    
    if (!teamName) {
        document.getElementById('main-content').innerHTML = '<h2>Team not found</h2>';
        return;
    }

    try {
        const res = await fetch('http://localhost:3001/teams');
        const teams = await res.json();
        const team = teams.find(t => t.teamName === teamName);
        
        if (!team) {
            document.getElementById('main-content').innerHTML = '<h2>Team not found</h2>';
            return;
        }
        
        const mainContent = document.getElementById('main-content');
        
        const teamInfo = document.createElement('div');
        teamInfo.classList.add('team-info');
        
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('team-image-container');
        
        const image = document.createElement('img');
        image.src = team.image;
        image.alt = team.teamName;
        
        imageContainer.appendChild(image);
        
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('team-details');
        
        const title = document.createElement('h1');
        title.textContent = team.teamName;
        detailsContainer.appendChild(title);
        
        const gameItem = document.createElement('div');
        gameItem.classList.add('detail-item');
        gameItem.innerHTML = `<strong>Game:</strong> ${team.game}`;
        detailsContainer.appendChild(gameItem);
        
        const countryItem = document.createElement('div');
        countryItem.classList.add('detail-item');
        countryItem.innerHTML = `<strong>Country:</strong> ${team.country}`;
        detailsContainer.appendChild(countryItem);
        
        const winsItem = document.createElement('div');
        winsItem.classList.add('detail-item');
        winsItem.innerHTML = `<strong>Major Wins:</strong><ul>${team.majorWins.map(win => `<li>${win}</li>`).join('')}</ul>`;
        detailsContainer.appendChild(winsItem);
        
        teamInfo.appendChild(imageContainer);
        teamInfo.appendChild(detailsContainer);
        mainContent.appendChild(teamInfo);
        
    } catch (error) {
        document.getElementById('main-content').innerHTML = '<h2>Error loading team data</h2>';
        console.error('Error:', error);
    }
};

renderTeamDetails();