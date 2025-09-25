const renderTeamDetail = async () => {
    const mainContent = document.getElementById('main-content');
    const teamDetailContainer = document.getElementById('team-detail-container');
    const loading = document.getElementById('loading');
    const pathParts = window.location.pathname.split('/');
    const teamName = pathParts[pathParts.length - 1];
    try {
        const res = await fetch('http://localhost:3001/teams');
        const teams = await res.json();
        const team = teams.find(t => t.teamName === teamName);
        if (!team) {
            loading.innerHTML = `<h2>Team "${teamName}" not found</h2>`;
            return;
        }
        const teamInfo = document.createElement('div');
        teamInfo.classList.add('team-info');
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('team-image-container');
        const teamImage = document.createElement('img');
        teamImage.src = team.image;
        teamImage.alt = `${team.teamName} logo`;
        imageContainer.appendChild(teamImage);
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('team-details');
        const title = document.createElement('h1');
        title.textContent = team.teamName;
        detailsContainer.appendChild(title);
        const gameDetail = document.createElement('div');
        gameDetail.classList.add('detail-item');
        gameDetail.innerHTML = `<strong>Game:</strong> ${team.game}`;
        detailsContainer.appendChild(gameDetail);
        const countryDetail = document.createElement('div');
        countryDetail.classList.add('detail-item');
        countryDetail.innerHTML = `<strong>Country:</strong> ${team.country}`;
        detailsContainer.appendChild(countryDetail);
        const majorWinsDetail = document.createElement('div');
        majorWinsDetail.classList.add('detail-item');
        const winsTitle = document.createElement('strong');
        winsTitle.textContent = 'Major Wins:';
        majorWinsDetail.appendChild(winsTitle);
        const winsList = document.createElement('ul');
        team.majorWins.forEach(win => {
            const listItem = document.createElement('li');
            listItem.textContent = win;
            winsList.appendChild(listItem);
        });
        majorWinsDetail.appendChild(winsList);
        detailsContainer.appendChild(majorWinsDetail);
        const backButton = document.createElement('a');
        backButton.textContent = '<- Back to Teams';
        backButton.href = 'http://localhost:5173';
        backButton.classList.add('back-button');
        detailsContainer.appendChild(backButton);
        teamInfo.appendChild(imageContainer);
        teamInfo.appendChild(detailsContainer);
        teamDetailContainer.appendChild(teamInfo);
    } catch (error) {
        console.error('Error fetching team details:', error);
        loading.innerHTML = '<h2>Error loading team details</h2>';
    }
};

renderTeamDetail();