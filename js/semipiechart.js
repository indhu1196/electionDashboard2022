function drawParliamentaryChart(selector, data, btn_data, year){
    var parliament = d3.parliament().width(375).innerRadiusCoef(0.4);

    var tool_tip = d3.tip()
    .attr("class", "map-tooltip")
    .offset([-15, 0])
    .html(function(d) { 
        // console.log(d);
        var html = "<p> "+d.party.party+" </p> "
        return html; 
    });

    parliament.enter.fromCenter(true).smallToBig(true);
    parliament.exit.toCenter(true).bigToSmall(true);

    d3.select(selector).datum(data).call(parliament);
    d3.select(selector).call(tool_tip);

    parliament.on('mouseover', tool_tip.show);
    parliament.on('mouseout', tool_tip.hide);
    d3.select(selector).attr("class", "parliamentseats "+btn_data+" y"+year);
    // legends(data);

}

var dataSrc="", totalSeats;
jQuery.ajax({
    'async': false,
    'global': false,
    'cache': false,
    'dataType': 'json',
    'url': 'data/partywise_seats2021.json',
    'success': function(data) {
        dataSrc = data
    }
});
drawParliamentaryChart("#up2017_parliamentseats", dataSrc['up2017_conswise'], 'up', '2017');
drawParliamentaryChart("#uk2017_parliamentseats", dataSrc['uk2017_conswise'], 'uk', '2017');
drawParliamentaryChart("#mn2017_parliamentseats", dataSrc['mn2017_conswise'], 'mn', '2017');
drawParliamentaryChart("#pb2017_parliamentseats", dataSrc['pb2017_conswise'], 'pb', '2017');
drawParliamentaryChart("#ga2017_parliamentseats", dataSrc['ga2017_conswise'], 'ga', '2017');

legends(dataSrc['mn2017_conswise']);
totSeat(dataSrc['mn2017_conswise'], "#mn2017Seat");


$(".dashfilters").click(function(){
    var value = $(this).attr("data");
    if($(".conts-2017").hasClass("active")){
        // console.log(0)
        legends(dataSrc[value+'2017_conswise'], '#'+ value+'2017Seat')
        totSeat(dataSrc[value+'2017_conswise'], '#'+ value+'2017Seat')    
    } else {
        // console.log(1)
        legends(dataSrc[value+'2022_conswise'], '#'+ value+'2017Seat')
        totSeat(dataSrc[value+'2022_conswise'], '#'+ value+'2017Seat')    
    }
})
function totSeat(data, selector) {
    totalSeats = 0;
    for(var i in data){ 
        // console.log(data[i]["total"])
        totalSeats = totalSeats + data[i]["total"]
    }
    
    $(selector).html(totalSeats)
}
function legends(dt) {
    // console.log(dt)
    var barcolors={
        "CPIM": "red",
        "INC": "#166a2f",
        "INC +": "#166a2f",
        "CPI": "red",
        "IUML": "blue",
        "IND": "grey",
        "Others": "#797979",
        "BJP": "#F47216",
        "BJP +": "#F47216",
        "NPP": "#364586"
    }
    var legend = "";
    for(var i in dt){ 
        html = '<li class="legend-items">'
        html += '<span style="background-color: '+ barcolors[dt[i]["party"]] + '"></span>'
        html += dt[i]["party"] 
        html += '</li>'
        legend += html
      }
    $(".legends").html(legend);

}
