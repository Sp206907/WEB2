const fetchBtn = document.getElementById('fetchBtn');
const contentDiv = document.getElementById('content');
const statusDiv = document.getElementById('statusMessage');
const newsSection = document.getElementById('newsSection'); // Элемент для новостей

fetchBtn.addEventListener('click', getData);

async function getData() {
    // 1. Показываем пользователю, что идет загрузка
    statusDiv.textContent = "Loading data... Please wait.";
    contentDiv.classList.add('hidden'); // Скрываем старые данные
    
    // Очищаем старые новости, чтобы они не дублировались
    if(newsSection) newsSection.innerHTML = ''; 

    try {
        // 2. Делаем запрос на ТВОЙ сервер
        const response = await fetch('/api/get-full-profile');
        
        if (!response.ok) {
            throw new Error('Server error');
        }

        const data = await response.json();

        // 3. Заполняем данные на странице (User)
        document.getElementById('userImg').src = data.user.profilePicture;
        
        // ВАЖНО: Исправлено на firstname и lastname (как на сервере)
        document.getElementById('userName').textContent = `${data.user.firstname} ${data.user.lastname}`;
        
        document.getElementById('userGender').textContent = data.user.gender;
        document.getElementById('userAge').textContent = data.user.age;
        document.getElementById('userDob').textContent = new Date(data.user.dob).toLocaleDateString();
        document.getElementById('userAddress').textContent = data.user.address;
        document.getElementById('userLocation').textContent = `${data.user.city}, ${data.user.country}`;

        // 4. Заполняем данные страны (Country)
        document.getElementById('countryName').textContent = data.country.name;
        document.getElementById('countryCapital').textContent = data.country.capital;
        document.getElementById('countryLang').textContent = data.country.languages;
        document.getElementById('countryFlag').src = data.country.flagUrl;

        // 5. Заполняем данные валюты (Exchange)
        document.getElementById('currencyCode').textContent = data.country.currencyCode;
        document.getElementById('currencySymbol').textContent = data.country.currencySymbol;
        
        // Вставляем код валюты во все места (EUR, AUD и т.д.)
        const baseElements = document.getElementsByClassName('base-currency');
        for (let el of baseElements) {
            el.textContent = data.country.currencyCode;
        }

        document.getElementById('rateUsd').textContent = data.rates.usd;
        document.getElementById('rateKzt').textContent = data.rates.kzt;

        // 6. Заполняем новости (News API) - НОВАЯ ЧАСТЬ
        if (data.news && data.news.length > 0) {
            // Создаем заголовок
            const newsHeader = document.createElement('h2');
            newsHeader.textContent = `Latest News from ${data.country.name}`;
            newsHeader.className = 'news-header';
            newsSection.appendChild(newsHeader);

            // Создаем карточки для каждой новости
            data.news.forEach(article => {
                const newsCard = document.createElement('div');
                newsCard.className = 'card news-card';
                newsCard.innerHTML = `
                    <img src="${article.image}" alt="News" class="news-img" onerror="this.src='https://via.placeholder.com/200'">
                    <div class="card-body">
                        <h3>${article.title}</h3>
                        <p>${article.description ? article.description : 'No description available.'}</p>
                        <a href="${article.url}" target="_blank" class="read-more">Read full article</a>
                    </div>
                `;
                newsSection.appendChild(newsCard);
            });
        } else {
            newsSection.innerHTML = '<p>No specific news found for this country at the moment.</p>';
        }

        // 7. Показываем результат
        statusDiv.textContent = "";
        contentDiv.classList.remove('hidden');

    } catch (error) {
        console.error(error);
        statusDiv.textContent = "Error loading data. Try again! Check console for details.";
    }
}