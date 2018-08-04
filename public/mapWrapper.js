const MapWrapper = function(coords, zoom){
    const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

    this.map = L.map('main-map').setView(coords, zoom).addLayer(osmLayer);
};

//adds marker to persons location
//map stays centred over Glasgow CC as that's where all car parks are!
MapWrapper.prototype.addPersonMarker = function(coords){
  L.marker(coords).addTo(this.map);
};

//adds marker to each carPark
MapWrapper.prototype.addCarParkMarker = function(coords, name, isFull, spacesAvailable){
  var popupContent = `${name}, ${spacesAvailable}`;
  L.marker(coords).bindPopup(popupContent).addTo(this.map);
};
