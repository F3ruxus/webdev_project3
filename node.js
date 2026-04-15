function initMap() {
  const mapOptions = {
    center: { lat: 41.8781, lng: -87.6298 },
    zoom: 12
  };

  const mapContainer = document.getElementById("map");

  const map = new google.maps.Map(mapContainer, mapOptions);
}
