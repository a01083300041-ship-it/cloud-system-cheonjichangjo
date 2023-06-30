const weatherInfoContainer1 = document.getElementById('weatherBox1');
fetch('https://api.openweathermap.org/data/2.5/weather?lat=33.462&lon=126.935&appid=f97c01bdd46de7e1922d0d13ac57efc4&units=metric') //성산
  .then(response => {
    if (!response.ok) {
      throw new Error('Unexpected error occurred.' + response.status);
    }
    return response.json();
  })
  .then(data => {
    const location = data.name;
    const weather = data.weather[0].description;
    const temperature = data.main.temp;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const infoText = `
	<div class="BigBox">
      <div class="weatherBox">
        <div class="weatherInBoxL">
          <img id="WeatherIcon" src="${iconUrl}" alt="Weather Icon">
        </div>
        <div class="weatherInBoxR">
			<div id="TvW">
				<a>위치 : 성산</a>
			</div>
			
			<div id="TvW">
				<a>현재 온도: ${temperature}°</a>
			</div>
          
        </div>
      </div>
	</div>  
    `;
    weatherInfoContainer1.innerHTML = infoText;
  })
  .catch(error => {
    weatherInfoContainer1.innerText = error.message;
  });

const weatherInfoContainer2 = document.getElementById('weatherBox2');

fetch('https://api.openweathermap.org/data/2.5/weather?q=jeju&appid=f97c01bdd46de7e1922d0d13ac57efc4&units=metric')  //제주
  .then(response => {
    if (!response.ok) {
      throw new Error('Unexpected error occurred.' + response.status);
    }
    return response.json();
  })
  .then(data => {
    const location = data.name;
    const weather = data.weather[0].description;
    const temperature = data.main.temp;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const infoText = `
	<div class="BigBox">
      <div class="weatherBox">
        <div class="weatherInBoxL">
          <img id="WeatherIcon" src="${iconUrl}" alt="Weather Icon">
        </div>
        <div class="weatherInBoxR">
			<div id="TvW">
				<a>위치 : 제주</a>
			</div>
			
			<div id="TvW">
				<a>현재 온도: ${temperature}°</a>
			</div>
          
        </div>
      </div>
	</div> 
    `;
    weatherInfoContainer2.innerHTML = infoText;
  })
  .catch(error => {
    weatherInfoContainer2.innerText = error.message;
  });



const weatherInfoContainer3 = document.getElementById('weatherBox3');

fetch('https://api.openweathermap.org/data/2.5/weather?lat=33.253&lon=126.562&appid=f97c01bdd46de7e1922d0d13ac57efc4&units=metric') //서귀포
  .then(response => {
    if (!response.ok) {
      throw new Error('Unexpected error occurred.' + response.status);
    }
    return response.json();
  })
  .then(data => {
    const location = data.name;
    const weather = data.weather[0].description;
    const temperature = data.main.temp;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const infoText = `
      	<div class="BigBox">
      <div class="weatherBox">
        <div class="weatherInBoxL">
          <img id="WeatherIcon" src="${iconUrl}" alt="Weather Icon">
        </div>
        <div class="weatherInBoxR">
			<div id="TvW">
				<a>위치 : 서귀포</a>
			</div>
			
			<div id="TvW">
				<a>현재 온도: ${temperature}°</a>
			</div>
          
        </div>
      </div>
	</div> 
    `;
    weatherInfoContainer3.innerHTML = infoText;
  })
  .catch(error => {
    weatherInfoContainer3.innerText = error.message;
  });




const weatherInfoContainer4 = document.getElementById('weatherBox4');
fetch('https://api.openweathermap.org/data/2.5/weather?lat=33.304&lon=126.182&appid=f97c01bdd46de7e1922d0d13ac57efc4&units=metric') //고산
  .then(response => {
    if (!response.ok) {
      throw new Error('Unexpected error occurred.' + response.status);
    }
    return response.json();
  })
  .then(data => {
    const location = data.name;
    const weather = data.weather[0].description;
    const temperature = data.main.temp;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const infoText = `
	<div class="BigBox">
      <div class="weatherBox">
        <div class="weatherInBoxL">
          <img id="WeatherIcon" src="${iconUrl}" alt="Weather Icon">
        </div>
        <div class="weatherInBoxR">
			<div id="TvW">
				<a>위치 : 고산</a>
			</div>
			
			<div id="TvW">
				<a>현재 온도: ${temperature}°</a>
			</div>
          
        </div>
      </div>
	</div> 
    `;
    weatherInfoContainer4.innerHTML = infoText;
  })
  .catch(error => {
    weatherInfoContainer4.innerText = error.message;
  });



document.addEventListener("DOMContentLoaded", function(event) {
      var boxes = document.getElementsByClassName("weather-box");
      var currentIndex = 0;
      boxes[currentIndex].style.display = "block";

      setInterval(function() {
        boxes[currentIndex].style.display = "none";
        currentIndex = (currentIndex + 1) % boxes.length;
        boxes[currentIndex].style.display = "block";
      }, 4000);
    });

const articles = document.querySelectorAll('article');

// Iterate over each article element
articles.forEach((article) => {
  // Get the associated img element
  const img = article.querySelector('img');

  // Store the original src value
  const originalSrc = img.getAttribute('src');

  // Add event listener for mouseover event
  article.addEventListener('mouseover', () => {
    // Append "_r" to the original src value
    const newSrc = originalSrc.replace('.png', '_r.png');

    // Set the new src value to the img element
    img.setAttribute('src', newSrc);
  });

  // Add event listener for mouseout event
  article.addEventListener('mouseout', () => {
    // Restore the original src value
    img.setAttribute('src', originalSrc);
  });
});