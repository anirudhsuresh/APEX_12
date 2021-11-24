// Append the option elements
// for (var i = -20; i <= 40; i++) {
//   var option = document.createElement("option");
//   option.text = i;
//   option.value = i;

//   select.appendChild(option);
// }
//
// import noUiSlider from "https://cdn.skypack.dev/nouislider";
// var projectInfo = JSON.parse(
//   readTextFile(
//     `measures/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}.json`
//   )
// );
var html5Slider = document.getElementById("html5");
var select = document.getElementById("input-select");

noUiSlider.create(html5Slider, {
  start: [1, 5],
  // tooltips: true,
  behaviour: "drag-tap",
  step: 1,
  connect: true,
  range: {
    min: 1,
    max: 20,
  },
});

var inputNumber = document.getElementById("input-number");

html5Slider.noUiSlider.on("change", function (values, handle) {
  console.log(value);
  var value = values[handle];
  // if (handle) {
  //   // inputNumber.value = value;
  // } else {
  //   // select.value = Math.round(value);
  // }
  var current_date_range = html5Slider.noUiSlider.get();
  // console.log(current_date_range);
  var array_date_range = range(
    parseInt(current_date_range[0]),
    parseInt(current_date_range[1])
  );
  create_for(array_date_range);

  agg_slider();
});

// select.addEventListener("slide", function () {
//   html5Slider.noUiSlider.set([this.value, null]);
// });

// inputNumber.addEventListener("change", function () {
//   html5Slider.noUiSlider.set([null, this.value]);
// });

// helper functions not part of the noUiSlider

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

// function readTextFile(file, callback) {
//   var rawFile = new XMLHttpRequest();
//   rawFile.overrideMimeType("application/json");
//   rawFile.open("GET", file, true);
//   rawFile.onreadystatechange = function () {
//     if (rawFile.readyState === 4 && rawFile.status == "200") {
//       callback(rawFile.responseText);
//     }
//   };
//   rawFile.send(null);
// }

function agg_slider() {
  var current_date_range = html5Slider.noUiSlider.get();
  console.log(current_date_range);
  var array_date_range = range(
    parseInt(current_date_range[0]),
    parseInt(current_date_range[1])
  ); // this gets us the current range needed
  console.log(array_date_range);

  k = create_new_data(array_date_range);

  j = create_new_data1(array_date_range);
  // console.log(k);
  f = merge_all_jsons(k[0], k[1]);
  //
  var g = create_network_data(array_date_range);

  makeButtons(array_date_range);
  var o_p = merge_all_jsons_2(j[0], j[1]);
  console.log(o_p);
  $("#chk").prop("checked", false);
  Update_Email_Range_Slider(f);
  Update_Tech_Range_Slider(o_p);
  make_chart_alt();
  query_buttons();
}

function get_all_data_for_net() {
  var current_date_range = html5Slider.noUiSlider.get();
  console.log(current_date_range);
  var array_date_range = range(
    parseInt(current_date_range[0]),
    parseInt(current_date_range[1])
  );
  create_new_data_force_net(array_date_range);
}

function updateSliderRange(min, max) {
  html5Slider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
  });
}
