require('dotenv').config(); // ИСПРАВЛЕНИЕ 1: добавил .config()
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.static('public'));

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.get('/api/get-full-profile', async (req, res) => {
  try {
    // --- 1. RANDOM USER ---
    const UserResponse = await axios.get('https://randomuser.me/api/');
    const userData = UserResponse.data.results[0];
    
    // ИСПРАВЛЕНИЕ 2: Переименовал profile -> userProfile
    const userProfile = {
      firstname: userData.name.first,
      lastname: userData.name.last,
      gender: userData.gender,
      profilePicture: userData.picture.large, 
      age: userData.dob.age,  
      dob: userData.dob.date,  
      city : userData.location.city,
      country : userData.location.country,
      address : `${userData.location.street.number} ${userData.location.street.name}`, // ИСПРАВЛЕНИЕ 3: address с двумя d
    };

    // --- 2. REST COUNTRIES ---
    const countryResponse = await axios.get(`https://restcountries.com/v3.1/name/${userProfile.country}`);
    const countryData = countryResponse.data[0];

    const currencyCode = Object.keys(countryData.currencies)[0];
    const currencyInfo = countryData.currencies[currencyCode];
    
    const countryProfile = {
        name: countryData.name.common,
        capital: countryData.capital ? countryData.capital[0] : 'No Capital',
        languages: Object.values(countryData.languages).join(', '),
        currencyName: currencyInfo.name,
        currencySymbol: currencyInfo.symbol,
        currencyCode: currencyCode,
        flagUrl: countryData.flags.png 
    };

    // --- 3. EXCHANGE RATE ---
    const exchangeResponse = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${currencyCode}`);
    const rates = exchangeResponse.data.conversion_rates;

    const exchangeRate = {
        base: currencyCode,
        usd: rates.USD,
        kzt: rates.KZT
    };

    // --- 4. NEWS API (НОВАЯ ЧАСТЬ) ---
    // Ищем новости, где упоминается название страны, на английском, максимум 5 штук
    let newsArticles = [];
    try {
        const newsResponse = await axios.get(`https://newsapi.org/v2/everything`, {
            params: {
                q: userProfile.country, // Ищем по названию страны
                language: 'en',
                pageSize: 5,
                apiKey: process.env.NEWS_API_KEY
            }
        });

        // Берем только нужные поля из ответа News API
        newsArticles = newsResponse.data.articles.map(article => ({
            title: article.title,
            image: article.urlToImage || 'https://via.placeholder.com/150', // Заглушка, если нет фото
            description: article.description || 'No description available',
            url: article.url
        }));
    } catch (newsError) {
        console.error('News API Error:', newsError.message);
        // Если новости сломались, не ломаем весь сайт, просто вернем пустой массив
        newsArticles = []; 
    }

    // ОТПРАВКА ДАННЫХ
    res.json({
      user: userProfile,
      country: countryProfile,
      rates: exchangeRate, // Тут важно: ключ rates, чтобы фронтенд понял
      news: newsArticles   // Отправляем новости
    });

  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    if (error.response && error.response.status === 404) {
         return res.status(404).json({ error: 'Country details not found' });
    }
    res.status(500).json({ error: 'Failed to process request' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});