const setUpMap = function(){
  //sets view of map to Glasgow City Centre.
  const coords = [55.860773, -4.245175];
  const zoom = 14;
  const mainMap = new MapWrapper(coords, zoom);

  navigator.geolocation.getCurrentPosition(function(position){
    mainMap.addPersonMarker([position.coords.latitude, position.coords.longitude]);
  });
  return mainMap;
};

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

const requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;

  mainMap = setUpMap();

  var carParks = CarPark.getCarParksFromJson(jsonString);

  for(item of carParks){
    mainMap.addCarParkMarker(item.coords, item.name, item.isFull, item.spacesAvailable);
  };

};



const app = function(){

  var url = 'https://gcc.azure-api.net/traffic/carparks?format=json';
  makeRequest(url, requestComplete);
};


window.addEventListener("DOMContentLoaded", app);
