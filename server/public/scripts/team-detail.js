const renderTeamDetail = async () => {
    const mainContent = document.getElementById('main-content');
    const teamDetailContainer = document.getElementById('team-detail-container');
    const loading = document.getElementById('loading');
    
    // Get team name from URL
    const pathParts = window.location.pathname.split('/');
    const teamName = pathParts[pathParts.length - 1];
    
    try {
        // Fetch all teams data
        const res = await fetch('http://localhost:3001/teams');
        const teams = await res.json();
        
        // Find the specific team
        const team = teams.find(t => t.teamName === teamName);
        
        if (!team) {
            loading.innerHTML = `<h2>Team "${teamName}" not found</h2>`;
            return;
        }
        
        // Remove loading message
        loading.style.display = 'none';
        
        // Create team detail card
        const detailCard = document.createElement('div');
        detailCard.classList.add('detail-card');
        
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('detail-image-container');
        imageContainer.style.backgroundImage = `url(${team.image})`;
        
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('detail-info-container');
        
        const title = document.createElement('h1');
        title.textContent = team.teamName;
        infoContainer.appendChild(title);
        
        const game = document.createElement('p');
        game.innerHTML = `<strong>Game:</strong> ${team.game}`;
        infoContainer.appendChild(game);
        
        const country = document.createElement('p');
        country.innerHTML = `<strong>Country:</strong> ${team.country}`;
        infoContainer.appendChild(country);
        
        const majorWins = document.createElement('div');
        majorWins.innerHTML = `<strong>Major Wins:</strong>`;
        const winsList = document.createElement('ul');
        team.majorWins.forEach(win => {
            const listItem = document.createElement('li');
            listItem.textContent = win;
            winsList.appendChild(listItem);
        });
        majorWins.appendChild(winsList);
        infoContainer.appendChild(majorWins);
        
        const backButton = document.createElement('a');
        backButton.textContent = '← Back to Teams';
        backButton.href = '/';
        backButton.classList.add('back-button');
        infoContainer.appendChild(backButton);
        
        detailCard.appendChild(imageContainer);
        detailCard.appendChild(infoContainer);
        teamDetailContainer.appendChild(detailCard);
        
    } catch (error) {
        console.error('Error fetching team details:', error);
        loading.innerHTML = '<h2>Error loading team details</h2>';
    }
};

renderTeamDetail();