const MapWrapper = function(coords, zoom){
    const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

    this.map = L.map('main-map').setView(coords, zoom).addLayer(osmLayer);
};

//adds marker to persons location
//map stays centred over Glasgow CC as that's where all car parks are!
MapWrapper.prototype.addPersonMarker = function(coords){
  var myIcon = L.icon({
      iconUrl: 'car.png',
      iconSize: [40, 40]
  });
  L.marker(coords, {icon: myIcon}).bindPopup(`You are here!`).addTo(this.map);
};

//adds marker to each carPark
MapWrapper.prototype.addCarParkMarker = function(coords, name, isFull, spacesAvailable, canShowSpacesAvailable){
  var carParkIsFullMsg = "";
  if(isFull === "enoughSpacesAvailable"){
    carParkIsFullMsg = "Spaces";
  } else {
    carParkIsFullMsg = "No Spaces";
  };
  //some car parks begin with -999 spaces occupied spaces
  //which causes a 'mare!.
  //in this case, don't show number of spaces currently spacesAvailable

  //using .slice string method to remove the Id from the end of the carPark name.
  var popupContent = "";
  if(canShowSpacesAvailable){
    popupContent = `${name.slice(0, -7)}, ${spacesAvailable}, ${carParkIsFullMsg}`;
  } else {
    popupContent = `${name.slice(0, -7)}, ${carParkIsFullMsg}`;
  };

  // adds marker to carPark location
  var myCPIcon = L.icon({
      iconUrl: 'placeholder.png',
      iconSize: [40, 40]
  });
  L.marker(coords, {icon: myCPIcon}).bindPopup(popupContent).addTo(this.map);

};

//maybe add "car park closed" as an alt message when isFull === carParkClosed?
