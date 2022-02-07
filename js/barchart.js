var barcolors={
    "CPIM": "red",
    "INC": "#166a2f",
    "INC+": "#166a2f",
    "CPI": "red",
    "IUML": "blue",
    "IND": "grey",
    "Others": "#797979",
    "BJP": "#F47216",
    "BJP +": "#F47216",
    "NPP": "#364586"
}
function stackedBar(selector, dataSource, stCode, props, tipSel) {
    var voteShare = (function() {
        voteShare = null;
        jQuery.ajax({
            'async': false,
            'global': false,
            'dataType': 'json',
            'cache': false,
            'url': dataSource,
            'success': function(data) {
                voteShare = data[stCode];
            }
        });
        return voteShare;
    })();
    // console.log(voteShare)
    var tooltip = d3.select(tipSel);

    var barchart = d3.select(selector)
        barchart.html(null)
    
    var addWrapper = barchart.append("div")
        .attr("class", "stackedBar")
    addWrapper.selectAll(".block")
    .data(voteShare).enter()
    .append("div").attr("class", "block")
    .style("background-color", function(d,i){
        // console.log(barcolors[d[props["label"]]])
        return barcolors[d[props["label"]]];
    })
    .style("width", function(d,i){
        return Math.round(d[props["valueper"]])+"%";
    })
    .html(function(d,i){
        if(d[props["valueper"]] > 6) {
            return '<span class="value">'+Math.round(d[props["valueper"]])+'% </span> <span class="label">'+d[props["label"]]+'</span>';
        } else {
            return '<span class="value">'+Math.round(d[props["valueper"]])+'% </span>';
        }
    })
    .on("mousemove", function(d){
        var x = $(this).position();
        var wide = $(this).width();
        // console.log(wide)
        tooltip
          .style("left", x.left + (wide/2) + "px")
          .style("top", x.top - 28 + "px")
          .style("display", "inline-block")
          .html(d[props["label"]] + ": " + Math.round(d[props["valueper"]])+ "%" );
    })
        .on("mouseout", function(d){ tooltip.style("display", "none");});
}

stackedBar("#tn2021-voteShare", 'data/voteshare.json', "tn_share2021", {
    "type": "Voteshare",
    "valueper": "leading%",
    "label": "party",
    // "value": "votes"
}, "#tn2021voteTip")
stackedBar("#tn2016-voteShare", 'data/voteshare.json', "tn_share2016", {
    "type": "Voteshare",
    "valueper": "leading%",
    "label": "party",
    // "value": "votes"
}, "#tn2016voteTip")
stackedBar("#tn2021-seatShare", 'data/seatshare.json', "tn_share2021", {
    "type": "Seatshare",
    "valueper": "seat%",
    "label": "party",
    // "value": "votes"
}, "#tn2021seatTip")
stackedBar("#tn2016-seatShare", 'data/seatshare.json', "tn_share2016", {
    "type": "Seatshare",
    "valueper": "seat%",
    "label": "party",
    // "value": "votes"
}, "#tn2016seatTip")
stackedBar("#kl2021-voteShare", 'data/voteshare.json', "kl_share2021", {
    "type": "Voteshare",
    "valueper": "leading%",
    "label": "party",
    // "value": "votes"
}, "#kl2021voteTip")
stackedBar("#kl2016-voteShare", 'data/voteshare.json', "kl_share2016", {
    "type": "Voteshare",
    "valueper": "leading%",
    "label": "party",
    // "value": "votes"
}, "#kl2016voteTip")
stackedBar("#kl2021-seatShare", 'data/seatshare.json', "kl_share2021", {
    "type": "Seatshare",
    "valueper": "seat%",
    "label": "party",
    // "value": "votes"
}, "#kl2021seatTip")
stackedBar("#kl2016-seatShare", 'data/seatshare.json', "kl_share2016", {
    "type": "Seatshare",
    "valueper": "seat%",
    "label": "party",
    // "value": "votes"
}, "#kl2016seatTip")
stackedBar("#up2017-seatShare", 'data/seatshare.json', "up_share2017", {
    "type": "Seatshare",
    "valueper": "seat%",
    "label": "party",
    // "value": "votes"
}, "#up2017seatTip")
stackedBar("#up2017-voteShare", 'data/voteshare.json', "up_share2017", {
    "type": "Voteshare",
    "valueper": "leading%",
    "label": "party",
    // "value": "votes"
}, "#up2017voteTip")
stackedBar("#pd2016-seatShare", 'data/seatshare.json', "pd_share2016", {
    "type": "Seatshare",
    "valueper": "seat%",
    "label": "party",
    // "value": "votes"
}, "#pd2016seatTip")
stackedBar("#pd2016-voteShare", 'data/voteshare.json', "pd_share2021", {
    "type": "Voteshare",
    "valueper": "leading%",
    "label": "party",
    // "value": "votes"
}, "#pd2016voteTip")
stackedBar("#pd2021-seatShare", 'data/seatshare.json', "pd_share2021", {
    "type": "Seatshare",
    "valueper": "seat%",
    "label": "party",
    // "value": "votes"
}, "#pd2021seatTip")
stackedBar("#pd2021-voteShare", 'data/voteshare.json', "pd_share2021", {
    "type": "Voteshare",
    "valueper": "leading%",
    "label": "party",
    // "value": "votes"
}, "#pd2021voteTip")
stackedBar("#as2016-seatShare", 'data/seatshare.json', "as_share2016", {
    "type": "Seatshare",
    "valueper": "seat%",
    "label": "party",
    // "value": "votes"
}, "#as2016seatTip")
stackedBar("#as2016-voteShare", 'data/voteshare.json', "as_share2021", {
    "type": "Voteshare",
    "valueper": "leading%",
    "label": "party",
    // "value": "votes"
}, "#as2016voteTip")
stackedBar("#as2021-seatShare", 'data/seatshare.json', "as_share2021", {
    "type": "Seatshare",
    "valueper": "seat%",
    "label": "party",
    // "value": "votes"
}, "#as2021seatTip")
stackedBar("#as2021-voteShare", 'data/voteshare.json', "as_share2021", {
    "type": "Voteshare",
    "valueper": "leading%",
    "label": "party",
    // "value": "votes"
}, "#as2021voteTip")


stackedBar("#uk2017-seatShare", 'data/seatshare.json', "uk_share2017", {
    "type": "Seatshare",
    "valueper": "seat%",
    "label": "party",
    // "value": "votes"
}, "#uk2017seatTip")
stackedBar("#uk2017-voteShare", 'data/voteshare.json', "uk_share2017", {
    "type": "Voteshare",
    "valueper": "leading%",
    "label": "party",
    // "value": "votes"
}, "#uk2017voteTip")
stackedBar("#mn2017-seatShare", 'data/seatshare.json', "mn_share2017", {
    "type": "Seatshare",
    "valueper": "seat%",
    "label": "party",
    // "value": "votes"
}, "#mn2017seatTip")
stackedBar("#mn2017-voteShare", 'data/voteshare.json', "mn_share2017", {
    "type": "Voteshare",
    "valueper": "leading%",
    "label": "party",
    // "value": "votes"
}, "#mn2017voteTip")
stackedBar("#pb2017-seatShare", 'data/seatshare.json', "pb_share2017", {
    "type": "Seatshare",
    "valueper": "seat%",
    "label": "party",
    // "value": "votes"
}, "#pb2017seatTip")
stackedBar("#pb2017-voteShare", 'data/voteshare.json', "pb_share2017", {
    "type": "Voteshare",
    "valueper": "leading%",
    "label": "party",
    // "value": "votes"
}, "#pb2017voteTip")
stackedBar("#ga2017-seatShare", 'data/seatshare.json', "ga_share2017", {
    "type": "Seatshare",
    "valueper": "seat%",
    "label": "party",
    // "value": "votes"
}, "#ga2017seatTip")
stackedBar("#ga2017-voteShare", 'data/voteshare.json', "ga_share2017", {
    "type": "Voteshare",
    "valueper": "leading%",
    "label": "party",
    // "value": "votes"
}, "#ga2017voteTip")