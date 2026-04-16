document.addEventListener("DOMContentLoaded", function () {

  alert("JS Loaded Successfully");

  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlide(index) {
    if (slides.length === 0) return;

    slides.forEach(slide => slide.style.display = "none");
    slides[index].style.display = "block";
  }

  function nextSlide() {
    if (slides.length === 0) return;

    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }

  showSlide(slideIndex);
  setInterval(nextSlide, 3000);
});


var map, infoWindow, marker;
function initMap() {
  const myLatlng = { lat: -34.397, lng: 150.644 };

  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatlng,
    zoom: 8,
    mapTypeControl: false
  });

  infoWindow = new google.maps.InfoWindow();
  marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: "Click to see details!",
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  });
  marker.addListener("click", () => {
    infoWindow.setContent("<strong>Default Location</strong><br>This is the starting point.");
    infoWindow.open(map, marker);
  });

  const input = document.getElementById("pac-input");
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) return;

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setPosition(place.geometry.location);
    infoWindow.setContent(`<strong>${place.name}</strong><br>${place.formatted_address}`);
    infoWindow.open(map, marker);
  });
  const locationButton = document.getElementById("locate-btn");
    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent("You are here.");
            infoWindow.open(map);
            map.setCenter(pos);
            map.setZoom(15);
          },
          () => handleLocationError(true, infoWindow, map.getCenter())
        );
      } else {
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
