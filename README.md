# Global User Profile & News Integrator

## Objective
This application is a full-stack Node.js project that integrates four different APIs to generate a complete user identity, including their personal details, country information, current currency exchange rates, and local news.

## Features
- **Random User Generation**: Fetches personal data (name, age, address, photo) from the Random User API.
- **Country Data Integration**: Uses the country name from the user profile to fetch details like capital, languages, and national flag via REST Countries API.
- **Real-time Exchange Rates**: Calculates the value of the user's local currency against USD and KZT using the ExchangeRate-API.
- **Local News Feed**: Retrieves the top 5 news headlines related to the user's country using the News API.
- **Server-Side Logic**: All API calls and data cleaning are handled on the Node.js backend to ensure security and performance.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3 (Responsive Design), JavaScript (Vanilla)
- **Libraries**: 
  - `axios`: For making server-side API requests.
  - `dotenv`: For secure management of API keys.
  - `cors`: To enable cross-origin requests.

## Project Structure                                                                                                                                                                                                                                                  
```text
/
├── public/
│   ├── index.html    # Frontend structure
│   ├── style.css     # Custom UI styling
│   └── script.js    # Frontend logic (DOM manipulation only)
├── .env              # Environment variables (API Keys)
├── WEB2.js         # Core logic & API routes (Backend)
├── package.json      # Project dependencies
└── README.md         # Project documentation


API Usage Details
Random User API: https://randomuser.me/api/ (No key required)
REST Countries API: https://restcountries.com/v3.1/ (No key required)
ExchangeRate-API: https://v6.exchangerate-api.com/ (Requires API Key)
News API: https://newsapi.org/ (Requires API Key)

Setup & Installation
1.Install dependencies:npm install
2.Environment Variables: Create a .env file in the root directory and add your API keys:
PORT=3001
EXCHANGE_API_KEY=your_exchange_rate_key_here
NEWS_API_KEY=your_news_api_key_here
3.Run the server:node server.js
4.Access the app: Open your browser and navigate to http://localhost:3001

🧠 Key Design Decisions
1. Security (Server-Side Logic)
In compliance with best practices, all API requests are performed on the server side.
Protection: API keys are stored securely in .env and are never exposed to the client-side browser.
Logic: Your core logic remains in the backend, keeping the frontend script clean and focused only on data presentation.

2. Data Transformation (Clean Data)
The server acts as a filter for the raw responses from external providers:
It parses massive JSON responses.
It extracts only required fields (e.g., specific currency codes or flag URLs).
It sends "cleaned" data to the frontend to reduce bandwidth and complexity.

3. Graceful Error Handling
The application implements try-catch blocks to ensure a robust user experience:
If one API fails (e.g., News API quota exceeded), the server handles the error gracefully.
The application continues to display the remaining available data rather than crashing the interface.
