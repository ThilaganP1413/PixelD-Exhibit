var posterFolder = "../Posters/";
var posters = [
  "poster1.jpg",
  "poster2.png",
  "poster3.jpg",
  "poster4.png",
  "poster5.jpg",
  "poster6.jpg",
  "poster7.jpg",
  "poster8.jpg",
  "poster9.jpg",
  "poster10.jpg",
  "poster11.jpg",
  "poster12.png",
  "poster13.jpg",
  "poster14.png",
  "poster15.jpg",
  "poster16.png",
  "poster17.jpg",
  "poster18.png",
  "poster19.jpg",
  "poster20.png",
  "poster21.jpg",
  "poster22.png",
  "poster23.jpg",
  "poster24.png",
  "poster25.jpg",
  "poster26.png",
  "poster27.jpg",
  "poster28.png",
  "poster29.jpg",
  "poster30.png",
  "poster31.jpg",
  "poster32.png",
  "poster33.jpg",
  "poster34.png",
  "poster35.jpg",
  "poster36.png",
  "poster37.jpg",
  "poster38.jpg",
  "poster39.jpg",
  "poster40.jpg",
  "poster41.jpg",
  "poster42.jpg",
  "poster43.jpg",
  "poster44.jpg",
  "poster45.png",
  "poster46.jpg",
  "poster47.jpg",
  "poster48.jpg",
  "poster49.jpg",
  "poster50.jpg",
  "poster51.jpg",
  "poster52.jpg",
  "poster53.jpg",
  "poster54.jpg",
  "poster55.jpg",
  "poster56.jpg",
  "poster57.png",
  "poster58.jpg",
  "poster59.jpg",
  "poster60.jpg",
  "poster61.jpg",
  "poster62.jpg",
  "poster63.jpg",
  "poster64.jpg",
  "poster65.jpg",
  "poster66.jpg",
  "poster67.jpg",
  "poster68.jpg",
  "poster69.png",
  "poster70.jpg",
  "poster71.jpg",
  "poster72.jpg",
  "poster73.jpg",
  "poster74.jpg",
  "poster75.jpg",
  "poster76.jpg",
  "poster77.jpg",
  "poster78.jpg",
  "poster79.jpg",
  "poster80.jpg",
  "poster81.png",
  "poster82.jpg",
  "poster83.jpg",
  "poster84.jpg",
  "poster85.jpg",
  "poster86.jpg",
  "poster87.jpg",
  "poster88.jpg",
  "poster89.jpg",
  "poster90.jpg",
  "poster91.jpg",
  "poster92.jpg",
  "poster93.png",
  "poster94.jpg",
  "poster95.jpg",
  "poster96.jpg",
  "poster97.jpg",
  "poster98.jpg",
  "poster99.jpg",
  "poster100.jpg",
  "poster101.jpg",
  "poster102.jpg",
  "poster103.jpg",
  "poster104.jpg",
  "poster105.png",
  "poster106.jpg",
  "poster107.jpg",
  "poster108.jpg",
  "poster109.jpg",
  "poster110.jpg",
  "poster111.jpg",
  "poster112.jpg",
  "poster113.jpg",
  "poster114.jpg",
  "poster115.jpg",
  "poster116.jpg",
  "poster117.png",
  "poster118.jpg",
  "poster119.jpg",
  "poster120.jpg",
  "poster121.jpg",
  "poster122.jpg",
  "poster123.jpg",
  "poster124.jpg",
  "poster125.jpg",
  "poster126.jpg",
  "poster127.jpg"
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
