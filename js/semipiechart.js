function drawParliamentaryChart(selector, data, stc, btn_data, year, forLeg, forTot){
    var semiPie = (function() {
        semiPie = null;
        jQuery.ajax({
            'async': false,
            'global': false,
            'cache': false,
            'dataType': 'json',
            'url': data,
            'success': function(d) {
                if(data == "https://thefederal.com/api/scraper.php?m=election2022&t=partywise") {
                    // console.log(d["data"][stc]);
                    semiPie = d["data"][stc];
                } else {
                    // console.log(d[stc]);
                    semiPie = d[stc];
                }
            }
        });
        return semiPie;
    })();
    // console.log(semiPie)
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

    d3.select(selector).datum(semiPie).call(parliament);
    d3.select(selector).call(tool_tip);

    parliament.on('mouseover', tool_tip.show);
    parliament.on('mouseout', tool_tip.hide);
    d3.select(selector).attr("class", "parliamentseats "+btn_data+" y"+year);
    // legends(data);

    var barcolors={
        "CPIM": "red",
        "INC": "#166a2f",
        "INC +": "#166a2f",
        "CPI": "red",
        "IUML": "blue",
        "IND": "grey",
        "Others": "#797979",

        "BJP": "#F39200",
        "BJP +": "#F39200",
        "SP": "#3AAA35",
        "SP +": "#3AAA35",
        "INC": "#3AAA35",
        "BSP": "#36A9E1",
        "NPF": "#28357F",
        "NPP": "#EEA801",
        "AAP": "#0474AB",
        "SAD": "#3B2F85",
        "SAD +": "#3B2F85",
        "MGP": "#e6980b"
    }
    var legend = "";
    for(var i in semiPie){ 
        html = '<li class="legend-items">'
        html += '<span style="background-color: '+ barcolors[semiPie[i]["party"]] + '"></span>'
        html += semiPie[i]["party"] 
        html += '</li>'
        legend += html
      }
    $(forLeg+" .legends").html(legend);

    totalSeats = 0;
    for(var i in semiPie){ 
        // console.log(semiPie[i]["total"])
        totalSeats = totalSeats + semiPie[i]["total"]
    }
    
    $(forTot).html(totalSeats)
}

drawParliamentaryChart("#up2017_parliamentseats", "data/partywise_seats2021.json", "up2017_conswise", 'up', '2017', "#up_2017", "#up2017Seat");
drawParliamentaryChart("#uk2017_parliamentseats", "data/partywise_seats2021.json", "uk2017_conswise", 'uk', '2017', "#uk_2017", "#uk2017Seat");
drawParliamentaryChart("#mn2017_parliamentseats", "data/partywise_seats2021.json", "mn2017_conswise", 'mn', '2017', "#mn_2017", "#mn2017Seat");
drawParliamentaryChart("#pb2017_parliamentseats", "data/partywise_seats2021.json", "pb2017_conswise", 'pb', '2017', "#pb_2017", "#pb2017Seat");
drawParliamentaryChart("#ga2017_parliamentseats", "data/partywise_seats2021.json", "ga2017_conswise", 'ga', '2017', "#ga_2017", "#ga2017Seat");



// drawParliamentaryChart("#mn2022_parliamentseats", "https://thefederal.com/api/scraper.php?m=election2022&t=partywise", "pu", 'mn', '2022', "#mn_2022", "#mn2022Seat");
