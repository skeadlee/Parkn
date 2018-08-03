// const makeRequest = function(url, callback){
//   const request = new XMLHttpRequest();
//   request.open("GET", url);
//   request.addEventListener("load", callback);
//   request.send();
// };

const app = function(){

  const coords = [55.860773, -4.245175];
  const zoom = 3;
  const mainMap = new MapWrapper(coords, zoom);
};


window.addEventListener("DOMContentLoaded", app);
