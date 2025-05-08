document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const countryName = document.getElementById('country-input').value.trim();
    if (!countryName) return;
  
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Country not found');
        }
        return response.json();
      })
      .then(data => displayResults(data))
      .catch(error => {
        document.getElementById('results').innerHTML = `<p style="color:red;">${error.message}</p>`;
      });
  });
  
  function displayResults(countries) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
  
    countries.forEach(country => {
      const {
        name,
        capital,
        flags,
        currencies,
        population,
        region,
        languages
      } = country;
  
      const currencyName = Object.values(currencies)[0].name;
      const languageList = Object.values(languages).join(', ');
  
      const countryDiv = document.createElement('div');
      countryDiv.classList.add('country');
      countryDiv.innerHTML = `
        <h2>${name.common}</h2>
        <img src="${flags.png}" alt="Flag of ${name.common}">
        <p><strong>Capital:</strong> ${capital ? capital[0] : 'N/A'}</p>
        <p><strong>Currency:</strong> ${currencyName}</p>
        <p><strong>Population:</strong> ${population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Languages:</strong> ${languageList}</p>
      `;
      resultsDiv.appendChild(countryDiv);
    });
  }
  