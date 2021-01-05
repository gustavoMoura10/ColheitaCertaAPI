const { default: Axios } = require("axios");

exports.locationCoordinates = async (location) => {
  let locationString = `${location.publicPlace}, ${location.number}, ${location.neighborhood}, ${location.state}, ${location.city}, Brasil`;
  let url = `http://dev.virtualearth.net/REST/v1/Locations?query=${locationString}&postalCode=${location.zipCode}&key=${process.env.BING_KEY}`;
  let request = await Axios.get(url);
  let locationPosition =
    request.data.resourceSets[0].resources[0].point.coordinates;
  return locationPosition;
};

exports.locationsDistance = async (arr1, arr2) => {
  let request = await Axios.get(
    `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${Array(
      arr1
    ).join(",")}8&destinations=${Array(arr2).join(
      ","
    )}&travelMode=driving&key=${process.env.BING_KEY}`
  );
  let distance =
    request.data.resourceSets[0].resources[0].results[0].travelDistance;
  return distance;
};
