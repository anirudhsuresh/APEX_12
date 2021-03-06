// div resizing functionalit

(function () {
  var currentScale = 1;

  var cssPrefixesMap = [
    "scale",
    "-webkit-transform",
    "-moz-transform",
    "-ms-transform",
    "-o-transform",
    "transform",
  ];

  function setScale(scale) {
    var scaleCss = {};

    cssPrefixesMap.forEach(function (prefix) {
      scaleCss[prefix] = "scale(" + scale + ")";
    });

    //   $("div").css(scaleCss);
    $(".simple").css(scaleCss);
  }

  $("#decrease").click(function () {
    setScale((currentScale = currentScale - 0.1));
  });

  $("#increase").click(function () {
    setScale((currentScale = currentScale + 0.1));
  });
  $("#original").click(function () {
    setScale((currentScale = 1));
  });

  $("#comp_inc").click(function () {
    setScale((currentScale = currentScale + 0.6));
  });
})();

// refresh page button
$(function () {
  $("a, button").click(function () {
    $(this).toggleClass("active", 100);
  });
});

function refreshPage() {
  window.location.reload();
}

// other resize buttons for commit
(function () {
  var currentScale = 1;

  var cssPrefixesMap = [
    "scale",
    "-webkit-transform",
    "-moz-transform",
    "-ms-transform",
    "-o-transform",
    "transform",
  ];

  function setScale(scale) {
    var scaleCss = {};

    cssPrefixesMap.forEach(function (prefix) {
      scaleCss[prefix] = "scale(" + scale + ")";
    });

    //   $("div").css(scaleCss);
    $(".simple2").css(scaleCss);
  }

  $("#decrease2").click(function () {
    setScale((currentScale = currentScale - 0.1));
  });

  $("#increase2").click(function () {
    setScale((currentScale = currentScale + 0.1));
  });

  $("#comp_inc2").click(function () {
    setScale((currentScale = currentScale + 0.6));
  });

  $("#original2").click(function () {
    setScale((currentScale = 1));
  });
})();

// $(document).scroll(function () {
//   var y = $(this).scrollTop();
//   if (y > 200) {
//     $(".bottomMenu").fadeIn();
//   } else {
//     $(".bottomMenu").fadeOut();
//   }
// });
// $(document).scroll(function () {
//   var y = $(this).scrollTop();
//   if (y > 200) {
//     $(".button").fadeIn();
//   } else {
//     $(".button").fadeOut();
//   }
// });
$(document).scroll(function () {
  var y = $(this).scrollTop();
  if (y > 15) {
    $(".bottomMenu").fadeIn();
  } else {
    $(".bottomMenu").fadeOut();
  }
});

function create_for(feed_size) {
  var sub_array = [];
  console.log(feed_size);
  for (const cur_month of feed_size) {
    var projectInfo = JSON.parse(
      readTextFile(
        `measures/p${forceProperties.selected_data.project}m${cur_month}.json`
      )
    );

    sub_array.push(projectInfo);
  }
  const combined_data = sub_array.reduce((a, obj) => {
    Object.entries(obj).forEach(([key, val]) => {
      if (typeof val == "number") {
        a[key] = (a[key] || 0) + val;
      }
      // a[key] = (a[key] || 0) + val;
    });
    return a;
  });
  Actual_change(combined_data);
  console.log(combined_data);
}

var dataf1;
function get_the_data(common_path) {
  d3.json(`${common_path}`, function (error, dataf) {
    dataf1 = dataf;
  });
}
console.log(dataf1);

function give_the_data() {
  // console.log(dataf1);
  var t = dataf1;
  return t;
}

function create_network_data(feed_size) {
  var new_empty = [];
  var feed_size = feed_size;
  var first_data;
  for (const cur_month of feed_size) {
    var common_path = `final_network/p${forceProperties.selected_data.project}m${cur_month}_email.json`;
    var dataf1;

    d3.json(`${common_path}`, function (error, dataf) {
      dataf1 = dataf;
    });

    console.log(dataf1);
    // new_empty = [...first_data, ...new_empty];

    return new_empty;
  }
}

function create_new_data_force_net(feed_size) {
  var new_empty = [];
  var feed_size = feed_size;
  var first_data;

  for (const cur_month of feed_size) {
    var common_path = `final_network/p${forceProperties.selected_data.project}m${cur_month}_email.json`;
    // console.log(common_path);

    first_data = eval(readTextFile(`${common_path}`));

    new_empty = [...first_data, ...new_empty];
  }
  console.log(new_empty);
  merge_force_json(new_empty);
  // return new_empty;
}

function merge_force_json(originalArray) {
  const arrayHashmap = originalArray.reduce((obj, item) => {
    obj[item.name]
      ? obj[item.name].imports.push(...item.imports)
      : (obj[item.name] = { ...item });
    return obj;
  }, {});

  const mergedArray = Object.values(arrayHashmap);

  console.log(mergedArray);
  R_UpdateEmailNet(mergedArray);
}

// R_UpdateEmailNet(mergedArray);
// useful for the merging of the files data
function create_new_data(feed_size) {
  var new_empty = [];
  var feed_size = feed_size;
  var first_data = [];

  for (const cur_month of feed_size) {
    var common_path = `new/September_New_Network/p${forceProperties.selected_data.project}m${cur_month}_email.json`;
    // console.log(common_path);

    if (cur_month == feed_size[0]) {
      first_data = eval(readTextFile(`${common_path}`));
    } else {
      var data1 = eval(readTextFile(`${common_path}`));

      new_empty = [...data1, ...new_empty];
    }
  }

  return [first_data, new_empty];
}

function merge_all_jsons(array2, res) {
  var result = res
    .concat(array2)
    .reduce(
      function (ob, ar) {
        if (!(ar[0] + ar[1] in ob.nums)) {
          // console.log(ob);
          ob.nums[ar[0] + ar[1]] = ar;
          ob.result.push(ar);
        } else ob.nums[ar[0] + ar[1]][2] += ar[2];

        return ob;
      },
      { nums: {}, result: [] }
    )
    .result.sort(function (a, b) {
      return a[0] - b[0];
    });
  return result;
}

function create_new_data1(feed_size) {
  var new_empty = [];
  var feed_size = feed_size;
  var first_data1 = [];

  for (const cur_month of feed_size) {
    var common_path = `new/September_New_Network/p${forceProperties.selected_data.project}m${cur_month}_commit.json`;
    // console.log(common_path);

    if (cur_month == feed_size[0]) {
      first_data = eval(readTextFile(`${common_path}`));
    } else {
      var data1 = eval(readTextFile(`${common_path}`));

      new_empty1 = [...data1, ...new_empty];
    }
  }

  return [first_data1, new_empty1];
}

function makeButtons(c) {
  $(".holder").html("");
  for (var i = 0; i < c.length; i++) {
    $(".holder").append("<button value=" + c[i] + ">" + c[i] + "</button>");
  }
}

function merge_all_jsons_2(array22, res2) {
  var result1 = res2
    .concat(array22)
    .reduce(
      function (ob, ar) {
        if (!(ar[0] + ar[1] in ob.nums)) {
          // console.log(ob);
          ob.nums[ar[0] + ar[1]] = ar;
          ob.result.push(ar);
        } else ob.nums[ar[0] + ar[1]][2] += ar[2];

        return ob;
      },
      { nums: {}, result: [] }
    )
    .result.sort(function (a, b) {
      return a[0] - b[0];
    });
  return result1;
}

function query_buttons() {
  let btns1 = document.querySelectorAll("div.holder button");
  console.log(btns1);
  btns1.forEach(function (i) {
    i.addEventListener("click", function () {
      var current_month_for_report = i.innerHTML;
      console.log(current_month_for_report);
      yes1(current_month_for_report);
      // document.querySelector(".msg1").innerHTML = i.innerHTML;
      // var objTo = document.getElementById("content");
      // let divtest = document.createElement("div");

      // divtest.innerHTML = i.innerHTML;

      // objTo.replaceWith(divtest);
    });
  });
}
