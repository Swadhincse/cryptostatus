document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const sortMarketCapButton = document.getElementById('sortMarketCapButton');
    const sortPercentageChangeButton = document.getElementById('sortPercentageChangeButton');
    const cryptoTableBody = document.querySelector('#cryptoTable tbody');
  
    let cryptoData = [];
  

    async function fetchDataAsyncAwait() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        cryptoData = data;
        renderTable(cryptoData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
   
    function fetchDataThen() {
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
          cryptoData = data;
          renderTable(cryptoData);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  
   
    function renderTable(data) {
      cryptoTableBody.innerHTML = '';
      data.forEach(crypto => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${crypto.name}</td>
          <td>${crypto.id}</td>
          <td>${crypto.symbol}</td>
          <td>${crypto.current_price}</td>
          <td>${crypto.total_volume}</td>
          <td>${crypto.market_cap_change_percentage_24h}</td>
        `;
        cryptoTableBody.appendChild(row);
      });
    }
  
    
    searchButton.addEventListener('click', () => {
      const searchText = searchInput.value.toLowerCase();
      const filteredData = cryptoData.filter(crypto => crypto.name.toLowerCase().includes(searchText) || crypto.symbol.toLowerCase().includes(searchText));
      renderTable(filteredData);
    });
  
    sortMarketCapButton.addEventListener('click', () => {
      const sortedData = cryptoData.slice().sort((a, b) => b.market_cap - a.market_cap);
      renderTable(sortedData);
    });
  
    sortPercentageChangeButton.addEventListener('click', () => {
      const sortedData = cryptoData.slice().sort((a, b) => b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h);
      renderTable(sortedData);
    });
  
    fetchDataAsyncAwait(); 
  });
  