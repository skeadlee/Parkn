const MapWrapper = function(coords, zoom){

  const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  const map = L.map('main-map').setView(coords, zoom).addLayer(osmLayer);

};
