//  to toggle the range slider

$("#hideableDiv").hide();

// Listen for the checkbox to be checked
$("#make_range_slider").click(function () {
  if (this.checked) {
    console.log("fffffhello");
    $("#hideableDiv").show();
    $("#hideableDiv2").hide();
    var svg = d3
      .select("#middlesvg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 700 400")
      //class to make it responsive
      .classed("svg-content-responsive", true);

    svg.selectAll("*").remove();
    updateAll_for_range_slider();
  } else {
    // if ($("#chk").prop("checked") == true) {
    //   //do something
    // } else {
    $("#hideableDiv").hide();
    $("#hideableDiv2").show();
    updateAll();
    make_chart();
    $(".holder").empty();
    // }
  }
});

// code for toggling the checkbox in the email net
$("#chk").click(function () {
  if (this.checked) {
    if ($("#make_range_slider").is(":checked")) {
      console.log("both are yay checked");
      // alert("yes");
      get_all_data_for_net();
    } else {
      d3.json(
        `final_network/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}_email.json`,
        function (error, classes) {
          if (error) {
            svg = d3.select("#middlesvg");
            svg.selectAll("*").remove();
            throw error;
          }
          R_UpdateEmailNet(classes);
        }
      );
    }
    // R_UpdateEmailNet();
    // console.log("33");
  } else {
    // alert("no");
    updateAll();
    // console.log("4");
  }
});

$("#chk2").click(function () {
  if (this.checked) {
    alert("yes");

    // R_UpdateEmailNet();
    // console.log("33");
  } else {
    alert("no");

    // console.log("4");
  }
});

// if ($('input[name="chk"]').is(":checked")) {
//   console.log("checkddshd");
// }
