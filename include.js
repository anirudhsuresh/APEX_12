function UpdateprojectInfo() {
  projectInfo = JSON.parse(
    readTextFile(
      `measures/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}.json`
    )
  );
  Actual_change(projectInfo);
}

function Actual_change(projectInfo) {
  //document.getElementById("leftp").innerHTML = "<p><label>Project Name </label> </p>\
  //<p><label>Project Name </label> </p>\
  //eval('document.write(projectInfo.project_name)')";

  //$("#leftp").html("<script> document.write(projectInfo.project_name) </script>;");

  //document.getElementById("project_name").innerHTML = projectInfo.project_name;
  console.log(projectInfo);
  document.getElementById("link").innerHTML =
    '<a href="' +
    projectInfo.link +
    '" target="_blank" > ' +
    projectInfo.project_name +
    "</a>";
  document.getElementById("status").innerHTML = projectInfo.status;
  document.getElementById("sponsor").innerHTML = projectInfo.sponsor;

  document.getElementById("intro").innerHTML = projectInfo.intro;
  document.getElementById("start").innerHTML = projectInfo.start_time;
  document.getElementById("end").innerHTML = projectInfo.end_time;

  document.getElementById("num_emails").innerHTML = Math.floor(
    projectInfo.num_emails
  );
  document.getElementById("num_senders").innerHTML = Math.floor(
    projectInfo.num_senders.toFixed(2)
  );
  document.getElementById("email_per_dev").innerHTML = Math.floor(
    projectInfo.email_per_dev
  );
  document.getElementById("reports_month").innerHTML =
    projectInfo.from + "~" + projectInfo.to;
  // document.getElementById("reports_month").innerHTML =
  //   projectInfo.start_time.split(" ")[0] +
  //   " " +
  //   projectInfo.start_time.split(" ")[2] +
  //   "~" +
  //   projectInfo.end_time.split(" ")[0];
  // projectInfo.end_time.split(" ")[0] +
  // " " +
  // projectInfo.end_time.split(" ")[2];
  // console.log(projectInfo.start_time.split(" "));
  // document.getElementById("myButton2").innerHTML = projectInfo.num_commits;
  document.getElementById("num_commits").innerHTML = Math.floor(
    projectInfo.num_commits
  );
  document.getElementById("num_committers").innerHTML = Math.floor(
    projectInfo.num_committers
  );
  document.getElementById("commit_per_dev").innerHTML = Math.floor(
    projectInfo.commit_per_dev
  );
  document.getElementById("from").innerHTML = projectInfo.from;
  document.getElementById("to").innerHTML = projectInfo.to;
  //document.getElementById("incubation_time").innerHTML = '<input id = "incubation_time" type="range" min="1" max=' + projectInfo.incubation_time + ' value="1" step="1" oninput="d3.select("#Month").text(value); forceProperties.selected_data.month=value; updateAll();">;'
  //document.getElementById("incubation_time").innerHTML = '<input type="range" id = "incubation_time" min="1" max=' + projectInfo.incubation_time + ' value="1" step="1">;'

  document.getElementById("pro_title").innerHTML = projectInfo.project_name;
  document.getElementById("pro_title1").innerHTML = projectInfo.project_name;
  document.getElementById("pro_title2").innerHTML = projectInfo.project_name;
  //
  document.getElementById("month_period_start").innerHTML = projectInfo.from;
  document.getElementById("month_period_end").innerHTML = projectInfo.to;

  // update_no_ui_slider();
}
$("#chk").prop("checked", false);
function UpdateMaxIncubation() {
  var slider = document.getElementById("MaxIncubation");

  slider.max = projectInfo.incubation_time;
  slider.min = 1;
  slider.value = slider.min;

  document.getElementById("Month").innerHTML =
    '<output id="Month">' + slider.min + "</output>";

  var max_time = projectInfo.incubation_time;
  console.log("this is the max time ", max_time);
  console.log(typeof projectInfo.incubation_time);
  console.log(typeof max_time);
  updateSliderRange(1, max_time);
  // var d = parseInt(slider.max);
  // console.log(d);
  // html5Slider.noUiSlider.updateOptions({
  //   range: {
  //     min: 1,
  //     max: slider.max,
  //   },
  // });
  // var linka = "Mentors_csv/" + only_name.trim() + ".txt";
  // var m_paths = `${linka}`;

  // var j = 14;
  // html5Slider.noUiSlider.updateOptions({
  //   range: {
  //     min: 1,
  //     max: j,
  //   },
  // });

  // $("MaxIncubation").slider("option", { min: 5, max: 50 });
  // $("#chk").prop("checked", false);
  // $("#make_range_slider;").prop("checked", false);
}

// function update_no_ui_slider() {
//   // var j = parseInt(slider.max);
//   var j = 40;
//   console.log(j);
//   html5Slider.noUiSlider.updateOptions({
//     range: {
//       min: 1,
//       max: j,
//     },
//   });
// }
