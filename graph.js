/*const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'digitransit-subscription-key': 'f78f313b1ec446049608163ec9868494' // replace with your actual key
        },
        body: JSON.stringify({
          query:`
          {
            bikeRentalStations {
              name
              stationId
            }
          }
            `
        }),
      });*/

export async function fetchBikeRentalStations() {
const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'digitransit-subscription-key': 'f78f313b1ec446049608163ec9868494' // replace with your actual key
    },
    body: JSON.stringify({
    query:`
    {
        bikeRentalStations {
        name
        stationId
        }
    }
        `
    }),
});

if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}

return await response.json();
}

export async function getBikeStation(id) {
    const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'digitransit-subscription-key': 'f78f313b1ec446049608163ec9868494' // replace with your actual key
    },
    body: JSON.stringify({
    query:`
    {
        bikeRentalStation(id:"${id}") {
          stationId
          name
          bikesAvailable
          spacesAvailable
          lat
          lon
          allowDropoff
        }
      }
        `
    }),
});

if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}

return await response.json();
}