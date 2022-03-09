//format to substitute data with abreviation
var party_abrev = {
    "Bharatiya Janta Party":"BJP", 
    "Bahujan Samaj Party":"BSP", 
    "Samajwadi Party":"SP", 
    "Suheldev Bhartiya Samaj Party":"SBSP", 
    "Apna Dal (Soneylal)":"APS",
    "Independent":"IND", 
    "Indian National Congress":"INC", 
    "Rashtriya Lok Dal": "RLD",
    "Aam Aadmi Party":  "AAP",
    "Shiromani Akali Dal":  "SAD",
    "Nishad Party": "NP",
    "Maharashtrawadi Gomantak Party": "MGP",
    "National People's Party": "NPP",
    "Naga Peoples Front": "NPF"
}

//format to substitute data with color
var partycolors = { 
    "BJP": "#F39200",
    "SP": "#3AAA35",
    "INC": "#3AAA35",
    "BSP": "#36A9E1",
    "NPF": "#28357F",
    "NPP": "#EEA801",
    "AAP": "#0474AB",
    "SAD": "#3B2F85",
    "MGP": "#e6980b"
}

function drawAssemblyMap(selector, datasource, stCode ,settings, dropSelect, constBox, dsrc, dcode, defdist){
    var constwisetrenddata = (function() {
        constwisetrenddata = null;
        jQuery.ajax({
            'async': false,
            'global': false,
            'dataType': 'json',
            'cache': false,
            'url': datasource,
            'success': function(data) {
                // console.log(datasource)
                if (datasource == "https://thefederal.com/api/scraper.php?m=election2022&t=constituency") {
                    constwisetrenddata = data["data"][0][stCode]
                } else {
                    // console.log(data)
                    constwisetrenddata = data[stCode];
                }
            }
        });
        return constwisetrenddata;
    })();
    var economicFactorData = (function() {
        economicFactorData = null;
        jQuery.ajax({
            'async': false,
            'global': false,
            'dataType': 'json',
            'cache': false,
            'url': dsrc,
            'success': function(data) {
                // console.log(data)
                economicFactorData = data[dcode];
            }
        });
        return economicFactorData;
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
                var fdTrendData2017 = constwisetrenddata.filter(function(obj){
                    return obj["constNo"] === d.properties.AC_NO;
                })                
                if(fdTrendData2017[0] !== undefined){
                    // enter the filtered data in abreviation and colors object
                    // return partycolors[party_abrev[fdTrendData2017[0]["leadingParty"]]];
                    if(partycolors[fdTrendData2017[0]["leadingParty"]] != undefined) {
                        return partycolors[fdTrendData2017[0]["leadingParty"]];
                    } else {
                        return "#797979"
                    }
                    
                }else{
                    return "#797979";
                }                
            })
            .attr('stroke-opacity', "1")
            .attr("data-constcode", function(d,i){
                return d.properties.AC_NO;
            })
            .attr("data-id", function (d) { 
                var fdTrendData2017 = constwisetrenddata.filter(function(obj){
                    return obj["constNo"] === d.properties.AC_NO;
                })
                if(fdTrendData2017[0] !== undefined){
                    return fdTrendData2017[0]["District"];
                } else {
                    return "NA";
                }
            })
            .attr('fill', function(d,i){
                var fdTrendData2017 = constwisetrenddata.filter(function(obj){
                    return obj["constNo"] === d.properties.AC_NO;
                })
                // console.log(fdTrendData2017[0])
                if(fdTrendData2017[0] !== undefined){
                    // return partycolors[party_abrev[fdTrendData2017[0]["leadingParty"]]];
                    if(partycolors[fdTrendData2017[0]["leadingParty"]] != undefined) {
                        return partycolors[fdTrendData2017[0]["leadingParty"]];
                    } else {
                        return "#797979"
                    }
                }else{
                    return "#797979";
                }
                // enter the filtered data in abreviation and colors object
                // return partycolors[party_abrev[fdTrendData2017[0]["leadingParty"]]];
            })
            .on('click', function(d,i){
                $(dropSelect).val(d.properties.AC_NO).trigger('change')
                filterNDisplay2017(d.properties.AC_NO);
                var dist = $(this).attr("data-id");
                economicFilter(dist);
                focusFun(d.properties.AC_NO)
            })

            function focusFun(value){
                d3.selectAll('.const').classed("focused", false);
                d3.selectAll(".const").filter(function() { 
                    if(d3.select(this).attr("data-constcode") == value) { //alert("CONST"+constNo);
                        // console.log(0)
                        d3.select(this).classed("focused", true);
                    } else {
                        
                    }
                });
            }
            
            // Select const path by default on load
            // d3.select(".c"+settings.defaultconst).attr("stroke", "black").attr("stroke-width", "1.5")
            focusFun(settings.defaultconst)
            filterNDisplay2017(settings.defaultconst)
            economicFilter(defdist);
            var selectDropdown = d3.select(dropSelect)

            selectDropdown.html(null);

            var options = selectDropdown.selectAll('option')
                .data(stateconst).enter()
                .append('option')
                .attr("value", function (d) {
                    // console.log(d.properties.AC_NO) 
                    return d.properties.AC_NO; 
                })
                .attr("data-id", function (d) { 
                    var fdTrendData2017 = constwisetrenddata.filter(function(obj){
                        return obj["constNo"] === d.properties.AC_NO
                    })
                    if(fdTrendData2017[0] !== undefined){
                        return fdTrendData2017[0]["District"];
                    } else {
                        return "NA";
                    }
                })
                .text(function (d) {
                    return d.properties.AC_NAME;
                });

            $(dropSelect).val(settings.defaultconst).trigger('change')
            $(dropSelect).on('change', function(d,i) {
                var chosenOption = $(dropSelect).val();
                var optValue = $(dropSelect + " option:selected").attr("data-id");
                // d3.selectAll(".const").attr("stroke", "#ccc").attr("stroke-width", "0.2")
                // console.log(optValue)      
                var fdTrendData2017 = constwisetrenddata.filter(function(obj){
                    if(obj["constNo"] === parseInt(chosenOption)) {
                        focusFun(parseInt(chosenOption))
                        filterNDisplay2017(parseInt(chosenOption))
                        economicFilter(optValue)
                    }
                })
            })
    }) // Statelevel Source

    
    function filterNDisplay2017(acno){
        var fdTrendData2017 = constwisetrenddata.filter(function(obj){
            return obj["constNo"] === acno;
        })
        // console.log(constBox + " .trailingCandName:" + fdTrendData2017[0]["trailingCandidate"])
        // var len = jQuery(constBox + " .candName").length;
        // console.log(len);
            d3.select(constBox + " .trailingcandName").html(fdTrendData2017[0]["trailingCandidate"]);
            d3.select(constBox + " .const_name").html(fdTrendData2017[0]["constituency"]);
            d3.select(constBox + " .status").html(fdTrendData2017[0]["status"]);
            d3.select(constBox + " .candName").html(fdTrendData2017[0]["leadingCandidate"] + " <span>("+[fdTrendData2017[0]["leadingParty"]]+")</span>");
            d3.select(constBox + " .winMargin").html(fdTrendData2017[0]["margin"].toLocaleString('en-IN'));
    }

    function economicFilter(district){
        var eFData2017 = economicFactorData.filter(function(obj){
            return obj["District"] === district;
        })
        // console.log(eFData2017)
        if(eFData2017[0] !== undefined){
            d3.select(constBox + " .malePop").html(eFData2017[0]["Total Male"].toLocaleString('en-IN'))
            d3.select(constBox + " .femalePop").html(eFData2017[0]["Total Female"].toLocaleString('en-IN'))
            d3.select(constBox + " .maleEdu").html(eFData2017[0]["Male Literates (Census 2011)"].toLocaleString('en-IN'))
            d3.select(constBox + " .femaleEdu").html(eFData2017[0]["Female Literates (Census 2011)"].toLocaleString('en-IN'))
        } else {
            d3.select(constBox + " .malePop").html("-")
            d3.select(constBox + " .femalePop").html("-")
            d3.select(constBox + " .maleEdu").html("-")
            d3.select(constBox + " .femaleEdu").html("-")
        }
    }


} // end of mapfunction


function responsive(maxWidth) {
    if (maxWidth.matches) { 
        
        drawAssemblyMap(".mn-map2017", 'data/const2017data.json', "mn_conswise", {
            statecode: 'S02', // Statecode for map
            vhcode: 'mn', // state vehicle code
            defaultconst: 21, // state vehicle code
            mapsource: 'maps/manipur.json', // add map topojson
            scale: 12500, // size adjust until it sits well
            center: [93.9462, 24.7] // enter lat long from google of UP
        }, "#mnconstList2017", "#mn-2017", "data/economicFactors.json", "mnEconomic", "Imphal West");

        drawAssemblyMap(".uk-map2017", 'data/const2017data.json', "uk_conswise", {
            statecode: 'S02', // Statecode for map
            vhcode: 'uk', // state vehicle code
            defaultconst: 21, // state vehicle code
            mapsource: 'maps/uttarakhand.json', // add map topojson
            scale: 4500, // size adjust until it sits well
            center: [78.4, 31] // enter lat long from google of UP
        }, "#ukconstList2017", "#uk-2017", "data/economicFactors.json", "ukEconomic", "Dehradun");

        drawAssemblyMap(".up-map2017", 'data/const2017data.json', "up_conswise", {
            statecode: 'S24', // Statecode for map
            vhcode: 'up', // state vehicle code
            defaultconst: 21, // state vehicle code
            mapsource: 'maps/UP.json', // add map topojson
            scale: 3000, // size adjust until it sits well
            center: [80.9462, 26.7] // enter lat long from google of UP
        }, "#upconstList2017", "#up-2017", "data/economicFactors.json", "upEconomic", "Bijnor");

        drawAssemblyMap(".pb-map2017", 'data/const2017data.json', "pb_conswise", {
            statecode: 'S30', // Statecode for map
            vhcode: 'pb', // state vehicle code
            defaultconst: 21, // state vehicle code
            mapsource: 'maps/Punjab.json', // add map topojson
            scale: 7500, // size adjust until it sits well
            center: [75.4, 30.8] // enter lat long from google of UP
        }, "#pbconstList2017", "#pb-2017", "data/economicFactors.json", "pbEconomic", "Tarn Taran");

        drawAssemblyMap(".ga-map2017", 'data/const2017data.json', "ga_conswise", {
            statecode: 'S30', // Statecode for map
            vhcode: 'ga', // state vehicle code
            defaultconst: 21, // state vehicle code
            mapsource: 'maps/goaMap.json', // add map topojson
            scale: 25500, // size adjust until it sits well
            center: [74.05, 15.3] // enter lat long from google of UP
        }, "#gaconstList2017", "#ga-2017", "data/economicFactors.json", "gaEconomic", "North Goa");
        
        // drawAssemblyMap(".up-map2022", 'https://thefederal.com/api/scraper.php?m=election2022&t=constituency', "up_conswise", {
        //     statecode: 'S24', // Statecode for map
        //     vhcode: 'up', // state vehicle code
        //     defaultconst: 21, // state vehicle code
        //     mapsource: 'maps/UP.json', // add map topojson
        //     scale: 3000, // size adjust until it sits well
        //     center: [80.9462, 26.7] // enter lat long from google of UP
        // }, "#upconstList2022", "#up-2022", "data/economicFactors.json", "upEconomic", "Bijnor");
      
    } else {
        drawAssemblyMap(".up-map2017", 'data/const2017data.json', "up_conswise", {
            statecode: 'S24', // Statecode for map
            vhcode: 'up', // state vehicle code
            defaultconst: 21, // state vehicle code
            mapsource: 'maps/UP.json', // add map topojson
            scale: 2500, // size adjust until it sits well
            center: [80.9462, 27.2] // enter lat long from google of UP
        }, "#upconstList2017", "#up-2017", "data/economicFactors.json", "upEconomic", "Bijnor");
        drawAssemblyMap(".uk-map2017", 'data/const2017data.json', "uk_conswise", {
            statecode: 'S02', // Statecode for map
            vhcode: 'uk', // state vehicle code
            defaultconst: 21, // state vehicle code
            mapsource: 'maps/uttarakhand.json', // add map topojson
            scale: 4500, // size adjust until it sits well
            center: [78.4, 31.2] // enter lat long from google of UP
        }, "#ukconstList2017", "#uk-2017", "data/economicFactors.json", "ukEconomic", "Dehradun");
        drawAssemblyMap(".mn-map2017", 'data/const2017data.json', "mn_conswise", {
            statecode: 'S02', // Statecode for map
            vhcode: 'mn', // state vehicle code
            defaultconst: 21, // state vehicle code
            mapsource: 'maps/manipur.json', // add map topojson
            scale: 12500, // size adjust until it sits well
            center: [93.9462, 25] // enter lat long from google of UP
        }, "#mnconstList2017", "#mn-2017", "data/economicFactors.json", "mnEconomic", "Imphal West");
        drawAssemblyMap(".ga-map2017", 'data/const2017data.json', "ga_conswise", {
            statecode: 'S30', // Statecode for map
            vhcode: 'ga', // state vehicle code
            defaultconst: 21, // state vehicle code
            mapsource: 'maps/goaMap.json', // add map topojson
            scale: 25500, // size adjust until it sits well
            center: [74.08, 15.45] // enter lat long from google of UP
        }, "#gaconstList2017", "#ga-2017", "data/economicFactors.json", "gaEconomic", "North Goa");
        drawAssemblyMap(".pb-map2017", 'data/const2017data.json', "pb_conswise", {
            statecode: 'S30', // Statecode for map
            vhcode: 'pb', // state vehicle code
            defaultconst: 21, // state vehicle code
            mapsource: 'maps/Punjab.json', // add map topojson
            scale: 7500, // size adjust until it sits well
            center: [75.5, 31.5] // enter lat long from google of UP
        }, "#pbconstList2017", "#pb-2017", "data/economicFactors.json", "pbEconomic", "Tarn Taran");
    }
  }
  
   var maxWidth = window.matchMedia("(max-width: 600px)");
   
   responsive(maxWidth);
   maxWidth.addListener(responsive);