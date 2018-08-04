const ChartCapacity = function(){

};


ChartCapacity.displayCapacityChart = function(carParks){
  let chartedCapacity = [];
  for(item of carParks){
    chartedCapacity.push([item.name, item.capacity]);
  };
  console.log(chartedCapacity);

  const chartData = google.visualization.arrayToDataTable(chartedCapacity);

  const options = {
    title: "Car Park Capacity",
    is3D: true,
  };

  const chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
  chart.draw(chartData, options);
};
