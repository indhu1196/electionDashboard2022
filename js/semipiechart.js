function drawParliamentaryChart(selector, data, btn_data, year){
    var parliament = d3.parliament().width(375).innerRadiusCoef(0.4);

    var tool_tip = d3.tip()
    .attr("class", "map-tooltip")
    .offset([-15, 0])
    .html(function(d) { 
        var html = "<p> "+d.party.party+" </p> "
        return html; 
    });
    
    parliament.enter.fromCenter(true).smallToBig(true);
    parliament.exit.toCenter(true).bigToSmall(true);

    d3.select(selector).datum(data).call(parliament);
    d3.select(selector).call(tool_tip);

    parliament.on('mouseover', tool_tip.show);
    parliament.on('mouseout', tool_tip.hide);
    d3.select(selector).attr("class", "parliamentseats "+btn_data+" y"+year)
}
jQuery.ajax({
    'async': false,
    'global': false,
    'cache': false,
    'dataType': 'json',
    'url': 'data/partywise_seats2021.json',
    'success': function(data) {
        drawParliamentaryChart("#tn2021_parliamentseats", data['tn2021_conswise'], 'tn', '2021');
        drawParliamentaryChart("#tn2016_parliamentseats", data['tn2016_conswise'], 'tn', '2016');
        drawParliamentaryChart("#kl2021_parliamentseats", data['kl2021_conswise'], 'kl', '2021');
        drawParliamentaryChart("#kl2016_parliamentseats", data['kl2016_conswise'], 'kl', '2016');
        drawParliamentaryChart("#pd2021_parliamentseats", data['pd2021_conswise'], 'pd', '2021');
        drawParliamentaryChart("#pd2016_parliamentseats", data['pd2016_conswise'], 'pd', '2016');
        
    }
});
