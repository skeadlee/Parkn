const CarPark = function(name, lat, lng, isFull, capacity, occupiedSpaces){
  this.name = name;
  this.coords = [lat,lng];
  this.isFull = isFull;
  this.capacity = capacity;
  this.occupiedSpaces = occupiedSpaces;
  this.canShowSpacesAvailable = occupiedSpaces >= 0;
  this.spacesAvailable = capacity - occupiedSpaces;
};

CarPark.getCarParksFromJson = function(jsonString){
  var carParksJson = JSON.parse(jsonString);
  //get the situations(car parks) array from the json object
  var situations = carParksJson.d2lm$d2LogicalModel.d2lm$payloadPublication.d2lm$situation
  //creates new empty array to store carPark objects
  var carParks = [];
  //loop through the situations array to create carPark objects
  for(item of situations){
    var carParkFromSituation = this.getCarParkFromSituation(item);
    carParks.push(carParkFromSituation);


    console.log(carParkFromSituation.name);
    console.log(carParkFromSituation.coords);
    console.log(carParkFromSituation.isFull);
    console.log(carParkFromSituation.capacity);
    console.log(carParkFromSituation.occupiedSpaces);
    console.log(carParkFromSituation.spacesAvailable);


  };
  return carParks;
};

CarPark.getCarParkFromSituation = function(situation){
  //dig down in to JSON to get to carParkName
  var carParkName = situation.d2lm$situationRecord.d2lm$carParkIdentity;
  //dig down for carParkLat coords
  var carParkLat = situation.d2lm$situationRecord.d2lm$groupOfLocations.d2lm$locationContainedInGroup.d2lm$pointByCoordinates.d2lm$pointCoordinates.d2lm$latitude;
  //dig down for carParkLng coords
  var carParkLng = situation.d2lm$situationRecord.d2lm$groupOfLocations.d2lm$locationContainedInGroup.d2lm$pointByCoordinates.d2lm$pointCoordinates.d2lm$longitude;
  //get down to the space availability data
  var carParkIsFull = situation.d2lm$situationRecord.d2lm$carParkStatus;
  //get the total capacity of car park
  var carParkCapacity = situation.d2lm$situationRecord.d2lm$totalCapacity;
  //get number of currently occupied spaces
  var carParkOccupiedSpaces = situation.d2lm$situationRecord.d2lm$occupiedSpaces;
  //calculate current number of spaces available
  var carParkSpacesAvailable = carParkCapacity - carParkOccupiedSpaces;
  //create whole car park
  var carPark =  new CarPark (carParkName, carParkLat, carParkLng, carParkIsFull, carParkCapacity, carParkOccupiedSpaces, carParkSpacesAvailable);
  return carPark;
};
