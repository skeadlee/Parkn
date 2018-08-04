const app = function(){

  var url = 'https://gcc.azure-api.net/traffic/carparks?format=json';
  makeRequest(url, requestComplete);

  //sets view of map to Glasgow City Centre.
  const coords = [55.860773, -4.245175];
  const zoom = 14;
  const mainMap = new MapWrapper(coords, zoom);

  navigator.geolocation.getCurrentPosition(function(position){
    mainMap.addPersonMarker([position.coords.latitude, position.coords.longitude]);
  });



};

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var carParks = JSON.parse(jsonString);
  console.log(carParks);
  //dig down in to JSON to get to carParkName
  var carParkName = carParks.d2lm$d2LogicalModel.d2lm$payloadPublication.d2lm$situation[0].d2lm$situationRecord.d2lm$carParkIdentity
  //dig down for carParkLat coords
  var carParkLat = carParks.d2lm$d2LogicalModel.d2lm$payloadPublication.d2lm$situation[0].d2lm$situationRecord.d2lm$groupOfLocations.d2lm$locationContainedInGroup.d2lm$pointByCoordinates.d2lm$pointCoordinates.d2lm$latitude;
  //dig down for carParkLng coords
  var carParkLng = carParks.d2lm$d2LogicalModel.d2lm$payloadPublication.d2lm$situation[0].d2lm$situationRecord.d2lm$groupOfLocations.d2lm$locationContainedInGroup.d2lm$pointByCoordinates.d2lm$pointCoordinates.d2lm$longitude;
  console.log(carParkName);
  console.log(carParkLat);
  console.log(carParkLng);

}




window.addEventListener("DOMContentLoaded", app);
