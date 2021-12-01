//format to substitute data with abreviation
var party_abrev = {
    "Bharatiya Janta Party":"BJP", 
    "Suheldev Bhartiya Samaj Party":"SBSP", 
    "Bahujan Samaj Party":"BSP", 
    "Samajwadi Party":"SP", 
    "Independent":"IND", 
    "Indian National Congress":"Congress", 
    "Apna Dal (Soneylal)":"APS", 
    "Dravida Munnetra Kazhagam":"DMK",
    "Dravida Munetra Kazhagam": "DMK", 
    "All India Anna Dravida Munnetra Kazhagam":"AIADMK",
    "Indian Union Muslim League": "IUML"
}

//format to substitute data with color
var partycolors = { 
    "DMK":	"green",
    "AIADMK":	"#ff9900",
    "BJP":	"#ff9900",
    "SP":	"red",
    "IND":	"red",
    "Congress":	"red",
    "IUML":	"grey",
    "RLD":	"blue",
    "NISHAD":	"green",
}

function drawAssemblyMap(selector, datasource, stCode ,settings, dropSelect, constBox){
    var constwisetrenddata = (function() {
        constwisetrenddata = null;
        jQuery.ajax({
            'async': false,
            'global': false,
            'dataType': 'json',
            'cache': false,
            'url': datasource,
            'success': function(data) {
                console.log(data)
                constwisetrenddata = data[stCode];
            }
        });
        return constwisetrenddata;
    })();
    // var width = 430, height = 350; 
    var width = 450, height = 600; 
    var state = settings.statecode;
    var source = settings.mapsource;

    // empty selected container (required for redrawing map)
    d3.select(selector).html(null)

    // create and append svg to selected container with responsive setting
    var svg = d3.select(selector)
        .append("svg")
        .attr("class", settings.vhcode+"map")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        .append("g")

    var tool_tip = d3.tip()
        .attr("class", "map-tooltip")
        .offset([-15, 0])
        .html(function(d) { 
            var html = "<p>"+d.properties.AC_NAME+"</p> "
            return html; 
        });
    svg.call(tool_tip);

    var projection = d3.geoMercator()
        .scale(settings.scale)
        .center(settings.center)
        .translate([width / 2, height / 2])

    var geoPath = d3.geoPath()
        .projection(projection)
    
    d3.json(source, function(error, stateShape){
        
        // Converts and extracts topojson to map
        var stateconst = topojson.feature(stateShape, stateShape.objects.collection).features;
        // console.log(stateconst);

        svg.selectAll(".const")
            .data(stateconst).enter().append("path")
            .attr("d", geoPath)
            .attr("class", function(d) {
                return "const c" + d.properties.AC_NO;
            })
            .attr('stroke', "#ccc")
            .attr('stroke-width', "0.2")
            .on('mouseover', tool_tip.show) // to enable d3tip tooltips
            .on('mouseout', tool_tip.hide) // to disable d3tip tooltips
            .attr('data-color', function(d,i){
                // console.log(settings.datasource)
                var fdTrendData2017 = constwisetrenddata.filter(function(obj){
                    return obj["constNo"] === d.properties.AC_NO;
                })
                // console.log(fdTrendData2017);
                // console.log(partycolors[party_abrev[fdTrendData2017[0]["leadingParty"]]])
                if(fdTrendData2017[0] !== undefined){
                    // enter the filtered data in abreviation and colors object
                    return partycolors[party_abrev[fdTrendData2017[0]["leadingParty"]]];
                }else{
                    return "#FFFFFF";
                }
                
            })
            .attr('stroke-opacity', "1")
            .attr("data-constcode", function(d,i){
                return d.properties.AC_NO;
            })
            .attr('fill', function(d,i){
                
                var fdTrendData2017 = constwisetrenddata.filter(function(obj){
                    return obj["constNo"] === d.properties.AC_NO;
                })

                // console.log(fdTrendData2017[0])
                if(fdTrendData2017[0] !== undefined){
                    return partycolors[party_abrev[fdTrendData2017[0]["leadingParty"]]];
                }else{
                    return "#FFFFFF";
                }
                // enter the filtered data in abreviation and colors object
                // return partycolors[party_abrev[fdTrendData2017[0]["leadingParty"]]];
                
            })
            .on('click', function(d,i){
                // console.log(d.properties.AC_NO)
                
                // d3.selectAll(".const").attr("stroke", "#ccc").attr("stroke-width", "0.2")

                // d3.select(".c"+d.properties.AC_NO).attr("stroke", "black").attr("stroke-width", "1.5")

                $(dropSelect).val(d.properties.AC_NO).trigger('change')

                // d3.select(this).attr("fill", "red");
                filterNDisplay2017(d.properties.AC_NO);
                focusFun(d.properties.AC_NO)
                
            })

            function focusFun(value){
                d3.selectAll('.const').classed("focused", false);
                d3.selectAll(".const").filter(function() { 
                    if(d3.select(this).attr("data-constcode") == value) { //alert("CONST"+constNo);
                        // console.log(0)
                        d3.select(this).classed("focused", true);
                    }
                });
            }
            
            // Select const path by default on load
            // d3.select(".c"+settings.defaultconst).attr("stroke", "black").attr("stroke-width", "1.5")
            focusFun(settings.defaultconst)
            filterNDisplay2017(settings.defaultconst)

            var selectDropdown = d3.select(dropSelect)

            selectDropdown.html(null);

            var options = selectDropdown.selectAll('option')
                .data(stateconst).enter()
                .append('option')
                .attr("value", function (d) {
                    // console.log(d.properties.AC_NO) 
                    return d.properties.AC_NO; 
                })
                // .attr("data-id", function (d) { 
                //     return d.properties.AC_NO; 
                // })
                .text(function (d) {
                    // console.log(d.properties.AC_NAME);
                    return d.properties.AC_NAME;
                });

            $(dropSelect).val(settings.defaultconst).trigger('change')
            $(dropSelect).on('change', function(d,i) {
                var chosenOption = $(dropSelect).val();
                // console.log(chosenOption)
                // d3.selectAll(".const").attr("stroke", "#ccc").attr("stroke-width", "0.2")
                        
                var fdTrendData2017 = constwisetrenddata.filter(function(obj){
                    if(obj["constNo"] === parseInt(chosenOption)) {
                        focusFun(parseInt(chosenOption))
                        filterNDisplay2017(parseInt(chosenOption))
                    }
                })
            })
    }) // Statelevel Source

    
    function filterNDisplay2017(acno){
        var fdTrendData2017 = constwisetrenddata.filter(function(obj){
            return obj["constNo"] === acno;
        })
        // console.log(fdTrendData2017)
            d3.select(constBox + " .const_name").html(fdTrendData2017[0]["constituency"])
            d3.select(constBox + " .status").html(fdTrendData2017[0]["status"])
            d3.select(constBox + " .candName").html(fdTrendData2017[0]["leadingCandidate"] + " <span>("+party_abrev[fdTrendData2017[0]["leadingParty"]]+")</span>")
            d3.select(constBox + " .trailingCandName").html(fdTrendData2017[0]["trailingCandidate"] + " <span>("+party_abrev[fdTrendData2017[0]["trailingParty"]]+")</span>")
            d3.select(constBox + " .winMargin").html(fdTrendData2017[0]["margin"].toLocaleString('en-IN'))
    }

} // end of mapfunction

drawAssemblyMap(".tn-map2016", 'data/const2016data.json', "tn_conswise", {
    statecode: 'S22', // Statecode for map
    vhcode: 'tn', // state vehicle code
    defaultconst: 221, // state vehicle code
    mapsource: 'maps/tamilnadu.json', // add map topojson
    scale: 5100, // size adjust until it sits well
    center: [78.3, 10.8] // enter lat long from google of UP
}, "#constList2016", "#tn-2016");
drawAssemblyMap(".tn-map2021", 'data/const2021data.json', "tn_conswise",  {
    statecode: 'S22', // Statecode for map
    vhcode: 'tn', // state vehicle code
    defaultconst: 221, // state vehicle code
    mapsource: 'maps/tamilnadu.json', // add map topojson
    scale: 5100, // size adjust until it sits well
    center: [78.3, 10.8] // enter lat long from google of UP
}, "#constList2021", "#tn-2021");
drawAssemblyMap(".kl-map2016", 'data/const2016data.json', "kl_conswise", {
    statecode: 'S11', // Statecode for map
    vhcode: 'kl', // state vehicle code
    defaultconst: 21, // state vehicle code
    mapsource: 'maps/kerala.json', // add map topojson
    scale: 5100, // size adjust until it sits well
    center: [76.3, 10.8] // enter lat long from google of UP
}, "#klconstList2016", "#kl-2016");
drawAssemblyMap(".kl-map2021", 'data/const2021data.json', "kl_conswise",  {
    statecode: 'S11', // Statecode for map
    vhcode: 'kl', // state vehicle code
    defaultconst: 21, // state vehicle code
    mapsource: 'maps/kerala.json', // add map topojson
    scale: 5100, // size adjust until it sits well
    center: [76.3, 10.8] // enter lat long from google of UP
}, "#klconstList2021", "#kl-2021");
drawAssemblyMap(".pd-map2016", 'data/const2016data.json', "pd_conswise",  {
    statecode: 'U07', // Statecode for map
    vhcode: 'pd', // state vehicle code
    defaultconst: 21, // state vehicle code
    mapsource: 'maps/puducherry.json', // add map topojson
    scale: 21500, // size adjust until it sits well
    center: [79.8, 11.5] // enter lat long from google of UP
}, "#pdconstList2016", "#pd-2016");
drawAssemblyMap(".pd-map2021", 'data/const2021data.json', "pd_conswise",  {
    statecode: 'U07', // Statecode for map
    vhcode: 'pd', // state vehicle code
    defaultconst: 21, // state vehicle code
    mapsource: 'maps/puducherry.json', // add map topojson
    scale: 21500, // size adjust until it sits well
    center: [79.8, 11.5] // enter lat long from google of UP
}, "#pdconstList2021", "#pd-2021");
drawAssemblyMap(".up-map2017", 'data/const2016data.json', "up_conswise", {
    statecode: 'S24', // Statecode for map
    vhcode: 'up', // state vehicle code
    defaultconst: 21, // state vehicle code
    mapsource: 'maps/UP.json', // add map topojson
    scale: 2500, // size adjust until it sits well
    center: [80.9462, 27.2] // enter lat long from google of UP
}, "#upconstList2017", "#up-2017");
drawAssemblyMap(".up-map2021", 'data/const2016data.json', "up_conswise",  {
    statecode: 'S24', // Statecode for map
    vhcode: 'kl', // state vehicle code
    defaultconst: 21, // state vehicle code
    mapsource: 'maps/UP.json', // add map topojson
    scale: 2500, // size adjust until it sits well
    center: [80.9462, 27.2] // enter lat long from google of UP
}, "#upconstList2021", "#up-2021");

