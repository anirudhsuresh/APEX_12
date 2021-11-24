//var svg_t = d3.select("#right").append("svg").attr("width", 600).attr("height", 400);

// var color = d3.scaleOrdinal(d3.schemeCategory20);

//UpdateTechnicalNet()

function UpdateTechnicalNet() {
  var margin = { top: 1.25, right: 1.25, bottom: 1.25, left: 1.25 };
  var width = 1.25 - margin.left - margin.right;
  var height = 1.25 - margin.top - margin.bottom;
  var svg = d3
    .select("#rightsvg")
    .attr("width", "100%")
    .attr("height", "90%")
    .attr("viewBox", "0 0 700 400")
    //class to make it responsive
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  svg.selectAll("*").remove();

  var data = eval(
    readTextFile(
      ` new/September_New_Network/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}_commit.json`
      // new/September_New_Network
      // updated_final_network
      // new_final_network
      //
      // Sep_Network_Data
      // updated_final_network
      // September_New_Network
      // 16_Sep_network_data
    )
  );
  // 31_st_aug_network_data
  // `new_final_network/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}_commit.json`

  //var svg = d3.select("#rightsvg")

  //svg.append("text").attr("x",250).attr("y",70)
  //  .attr("class","header").text("Technical Contribution Network");

  var g = svg.append("g").attr("transform", "translate(185,45)");

  var bp = viz
    .bP()
    .data(data)
    .min(20)
    .pad(1)
    .height(250)
    .width(350)
    .barSize(20)
    .fill((d) => color(d.primary));

  // g.append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", "-11.5em")
  //     .attr("x", "-10em")
  //     .style("text-anchor", "middle")
  //     .attr("fill", "black")
  //     .style("font-size", "14px")
  //     .text("Technical Committer");

  // g.append("text")
  //     .attr("transform", "rotate(90)")
  //     .attr("y", "-35em")
  //     .attr("x", "8em")
  //     .style("text-anchor", "right")
  //     .attr("fill", "black")
  //     .style("font-size", "14px")
  //     .text("Files");

  g.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", "-10")
    .attr("x", "-65")
    // .style("text-anchor", "middle")
    .attr("fill", "black")
    .style("font-size", "15px")
    .text("Committer");

  g.append("text")
    // .attr("transform", "rotate(90)")
    .attr("y", "-10")
    .attr("x", "320")
    .style("text-anchor", "right")
    .attr("fill", "black")
    .style("font-size", "15px")
    .text("File Type");

  // g.append("line").attr("x1",-100).attr("x2",50);

  g.append("line").attr("x1", -74).attr("x2", 28).attr("y1", -3).attr("y2", -3);
  g.append("line")
    .attr("x1", 320)
    .attr("x2", 420)
    .attr("y1", -3)
    .attr("y2", -3);

  g.call(bp);
  // console.log(g)
  //g.append("text").attr("x",-50).attr("y",-8).style("text-anchor","middle").text("Developer");
  //g.append("text").attr("x", 250).attr("y",-8).style("text-anchor","middle").text("File Extension");

  //g.append("line").attr("x1",-100).attr("x2",0);
  //g.append("line").attr("x1",200).attr("x2",300);

  //g.append("line").attr("y1",610).attr("y2",610).attr("x1",-100).attr("x2",0);
  //g.append("line").attr("y1",610).attr("y2",610).attr("x1",200).attr("x2",300);

  g.selectAll(".mainBars")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .on("click", clixked);

  g.selectAll(".mainBars")
    .append("text")
    .attr("class", "label")
    .attr("x", (d) => (d.part == "primary" ? -32 : 32))
    .attr("y", (d) => +6)
    .text((d) => (d.part == "primary" ? d.key : "." + d.key))
    .attr("fill", "black")
    .attr("text-anchor", (d) => (d.part == "primary" ? "end" : "start"))
    .style("font-size", "14px");

  g.selectAll(".mainBars")
    .append("text")
    .attr("class", "perc")
    .attr("x", (d) => (d.part == "primary" ? 23 : -20))
    .attr("y", (d) => +6)
    .text(function (d) {
      return d3.format("0.0%")(d.percent);
    })
    .attr("text-anchor", (d) => (d.part == "primary" ? "end" : "start"))
    .attr("fill", "black")
    .style("font-size", "14px");

  /*
g.selectAll(".mainBars").append("text").attr("class","perc")
  .attr("x",d=>(d.part=="primary"? -130: 130))
  .attr("y",d=>+6)
  .text(function(d){ return d.value})
  .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
*/
  // console.log(data[0][0])
  function clixked(d) {
    var nodeTextS;
    nodeTextS = d;
    const namesS = [];
    var f = d3.select(this);
    // nodeTextS.each(d => namesS.push("  ".repeat(d.depth) + `${d.depth}: ${d.data.name}`));
    // console.log(namesS)
    // console.log("shshshyworked");
    // console.log(f);
    // console.log(f["_groups"]["0"]);
    var commiter_name = f.text();
    // console.log(f.text().split("*")[0]);
    var final_committer = f.text().split("*")[0];
    // console.log(d.key);
    var cur_month = document.getElementById("Month").value;
    // document.getElementById("current_node1").innerHTML = final_committer;
    document.getElementById("current_node1").innerHTML = d.key;
    var cur_person = d.key;
    // console.log(this_project, cur_month, cur_person);
    // work on the committer name
    var actual_name = cur_person
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, " ")
      .trim();

    var actual_title =
      "Commits made by" +
      " " +
      actual_name +
      " " +
      "during month" +
      " " +
      cur_month;

    document.getElementById("inside_title1").innerHTML = actual_title;

    // console.log(actual_name);
    var t = actual_name.split(" ");
    // console.log(t.length);
    if (t.length > 2) {
      var matches = actual_name.match(/\b(\w)/g);

      // console.log();
      act_name =
        matches.join("").substring(0, matches.length - 1) + t[t.length - 1];
      $("#popover-content1").popover("hide");
      call_table_commits(act_name);
      // var txt = "";
      // for (let i = 0; i < t.length - 1; i++) {
      //   txt += t[0].charAt(0);
      // }
      // var b = txt + t[-1].charAt(0);
    } else {
      var b = actual_name;
      // console.log(b);
      $("#popover-content1").popover("hide");
      call_table_commits(b);
    }

    // document.getElementById("commit_node").innerHTML =  commiter_name;
  }

  function mouseover(d) {
    d3.select(this).attr("font-weight", "bold");
    // d3.select(this).style("fill", "red");
    bp.mouseover(d);
    g.selectAll(".mainBars")
      .select(".perc")
      .text(function (d) {
        return d3.format("0.0%")(d.percent);
      });
  }

  function mouseout(d) {
    d3.select(this).attr("font-weight", null);
    bp.mouseout(d);
    g.selectAll(".mainBars")
      .select(".perc")
      .text(function (d) {
        return d3.format("0.0%")(d.percent);
      });
  }

  //d3.select(self.frameElement).style("height", "800px");
}

//d3.select(self.frameElement).style("height", "800px");

// End tehnical net //////

function updateAll() {
  var this_project = document.getElementById("txt_ide").value;
  forceProperties.selected_data.project = name_to_id[this_project];
  // agg_slider();
  $("#chk").prop("checked", false);
  UpdateTechnicalNet();
  UpdateEmailNet();
  // make_chart();
  UpdateprojectInfo();
}

function updateAll_for_range_slider() {
  var this_project = document.getElementById("txt_ide").value;
  forceProperties.selected_data.project = name_to_id[this_project];
  console.log(projectInfo.incubation_time);
  console.log(typeof projectInfo.incubation_time);
  var j = 14;
  console.log(typeof j);

  agg_slider();
  // UpdateTechnicalNet();
  // UpdateEmailNet();
  UpdateprojectInfo();
}
