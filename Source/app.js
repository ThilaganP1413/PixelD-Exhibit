var posterFolder = "../Posters/";
var posters = [
  "poster1.webp",
  "poster2.webp",
  "poster3.webp",
  "poster4.webp",
  "poster5.webp",
  "poster6.webp",
  "poster7.webp",
  "poster8.webp",
  "poster9.webp",
  "poster10.webp",
  "poster11.webp",
  "poster12.webp",
  "poster13.webp",
  "poster14.webp",
  "poster15.webp",
  "poster16.webp",
  "poster17.webp",
  "poster18.webp",
  "poster19.webp",
  "poster20.webp",
  "poster21.webp",
  "poster22.webp",
  "poster23.webp",
  "poster24.webp",
  "poster25.webp",
  "poster26.webp",
  "poster27.webp",
  "poster28.webp",
  "poster29.webp",
  "poster30.webp",
  "poster31.webp",
  "poster32.webp",
  "poster33.webp",
  "poster34.webp",
  "poster35.webp",
  "poster36.webp",
  "poster37.webp",
  "poster38.webp",
  "poster39.webp",
  "poster40.webp",
  "poster41.webp",
  "poster42.webp",
  "poster43.webp",
  "poster44.webp",
  "poster45.webp",
  "poster46.webp",
  "poster47.webp",
  "poster48.webp",
  "poster49.webp",
  "poster50.webp",
  "poster51.webp",
  "poster52.webp",
  "poster53.webp",
  "poster54.webp",
  "poster55.webp",
  "poster56.webp",
  "poster57.webp",
  "poster58.webp",
  "poster59.webp",
  "poster60.webp",
  "poster61.webp",
  "poster62.webp",
  "poster63.webp",
  "poster64.webp",
  "poster65.webp",
  "poster66.webp",
  "poster67.webp",
  "poster68.webp",
  "poster69.webp",
  "poster70.webp",
  "poster71.webp",
  "poster72.webp",
  "poster73.webp",
  "poster74.webp",
  "poster75.webp",
  "poster76.webp",
  "poster77.webp",
  "poster78.webp",
  "poster79.webp",
  "poster80.webp",
  "poster81.webp",
  "poster82.webp",
  "poster83.webp",
  "poster84.webp",
  "poster85.webp",
  "poster86.webp",
  "poster87.webp",
  "poster88.webp",
  "poster89.webp",
  "poster90.webp",
  "poster91.webp",
  "poster92.webp",
  "poster93.webp",
  "poster94.webp",
  "poster95.webp",
  "poster96.webp",
  "poster97.webp",
  "poster98.webp",
  "poster99.webp",
  "poster100.webp",
  "poster101.webp",
  "poster102.webp",
  "poster103.webp",
  "poster104.webp",
  "poster105.webp",
  "poster106.webp",
  "poster107.webp",
  "poster108.webp",
  "poster109.webp",
  "poster110.webp",
  "poster111.webp",
  "poster112.webp",
  "poster113.webp",
  "poster114.webp",
  "poster115.webp",
  "poster116.webp",
  "poster117.webp",
  "poster118.webp",
  "poster119.webp",
  "poster120.webp",
  "poster121.webp",
  "poster122.webp",
  "poster123.webp",
  "poster124.webp",
  "poster125.webp",
  "poster126.webp",
  "poster127.webp"
];

var grid = document.getElementById("grid");
var fullView = document.getElementById("full-view");
var fullImage = document.getElementById("full-image");
var closeButton = document.getElementById("close-full-view");

// Create grid items dynamically
posters.forEach(file => {
  var div = document.createElement("div");
  div.classList.add("grid-item");
  div.style.backgroundImage = `url(${posterFolder}${file})`;
  div.addEventListener("click", () => showFullView(file));
  grid.appendChild(div);
});

function showFullView(file) {
  fullImage.src = `${posterFolder}${file}`;
  fullView.classList.remove("hidden");
}

closeButton.addEventListener("click", () => {
  fullView.classList.add("hidden");
  fullImage.src = ""; // Clear the image source when closing
});

var items = document.querySelectorAll(".grid-item");

var h = window.innerHeight;
var w = window.innerWidth;

// Always find the item that has poster0.webp
var c = Array.from(items).find(el =>
  el.style.backgroundImage.includes("poster0.webp")
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