var posterFolder = "../Posters/";
var posters = [
  "poster0.jpg",
  "poster1.jpg",
  "poster2.jpg",
  "poster3.jpg",
  "poster4.jpg"
];

var grid = document.getElementById("grid");

// Create grid items dynamically
posters.forEach(file => {
  var div = document.createElement("div");
  div.classList.add("grid-item");
  div.style.backgroundImage = `url(${posterFolder}${file})`;
  grid.appendChild(div);
});

var items = document.querySelectorAll(".grid-item");

var h = window.innerHeight;
var w = window.innerWidth;

// Always find the item that has poster0.jpg
var c = Array.from(items).find(el =>
  el.style.backgroundImage.includes("poster0.jpg")
);

if (c) {
  var cr = c.getBoundingClientRect();
  window.scroll(cr.left - (w / 2) + (cr.width / 2),
                cr.top - (h / 2) + (cr.height / 2));

  // Highlight it with a glowing red border instead of replacing the background
  c.style.boxShadow = "0 0 20px 5px red";
}

requestAnimationFrame(onScroll);

function onScroll() {
  var pos = null, s = 0, s2 = 0;

  for (var i = 0; i < items.length; ++i) {
    pos = items[i].getBoundingClientRect();

    s = (pos.top + (pos.height / 2) - (h / 2)) / h;
    s = 1 - Math.abs(s);
    s = (s < 0 ? 0 : (s > 1 ? 1 : s));

    s2 = (pos.left + (pos.width / 2) - (w / 2)) / w;
    s2 = 1 - Math.abs(s2);
    s2 = (s2 < 0 ? 0 : (s2 > 1 ? 1 : s2));

    s = (s + s2) / 2;

    items[i].style.transform = "scale(" + s + ")";
  }

  requestAnimationFrame(onScroll);
}
