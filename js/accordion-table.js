function displayAllianceList(scode, selectedparty){
  // console.log('test', selectedparty, defaultYear, btn_data);

  var alliancedata = alliance_2021[scode][selectedparty.party];

    d3.select(".alliancemodal").style('display', 'block');
    d3.select(".blackscreen").style('display', 'block');
    d3.select(".alliancelistblock").html('');

    d3.select("#chosenAllianceParty").text(selectedparty)
    // console.log(alliancedata)
    var ul = d3.select(".alliancelistblock").append('ul')

    li = ul.selectAll('.alliancemember')
      .data(alliance_2021[scode][selectedparty])
      .enter()
      .append('li')
      .attr("class", "alliancemember")
      .html(function (d) { 
        return d;
      })

}

function closeAllBox(){
  d3.select(".alliancemodal").style('display', 'none');
  d3.select(".blackscreen").style('display', 'none');
}

function drawAccTable(data, selector, labels, scode){
  // console.log(data)
	d3.select(selector).html('');
    var table = d3.select(selector).append('table')
    var thead = table.append('thead')
    var	tbody = table.append('tbody')

    // append the header row
		thead.append('tr')
        .selectAll('th')
        .data(labels).enter()
        .append('th')
          .text(function (column) { return column; });

    partyRow = tbody.selectAll('.partyRow')
      .data(data)
      .enter()
      .append('tr')
      .attr("class", "partyRow");

      var partyCell = partyRow.selectAll('td')
          .data(function (row) {
			//  console.log("Row:"+JSON.stringify(row));
            return labels.map(function (column) {
              // console.log(row[column])
              return {column: column, value: row[column]};
            });
          })
          .enter()
          .append('td')
          .html(function (d) {
              if(d.column === "party"){
                if(d.value != 'Other') {
                  if($(selector).hasClass("map-table")){
                    // console.log(($(selector).hasClass("map-table")));
                    return d.value;
                  }else{
                    
                    if((d.value).includes("+")) {
                      // console.log(d.value);
                      return "<button class='alliance-list' onclick='displayAllianceList(\""+scode +"\", \""+d.value+"\")' data-party='"+d.value+"' style='margin-left:-18px'> + </button> "+d.value;
                    } else {
                      return d.value;
                    }
                  }
                } else {
                  return "<span style='margin-left:18px'>"+d.value+"</span>";
                }
              }else{
                return d.value;
              }
          });
    return table;        
}

var alliance_2021 = {
  "ga":{
    "INC +": ["Goa Forward Party"],
    "TMC +": ["Maharashtrawadi Gomantak Party"]
  },
  "pb":{
    "SAD +": ["Bahujan Samaj Party"],
    "BJP +": ["Punjab Lok Congress"]
  },
  "up": {
    "BJP +": ["Apna Dal (Sonelal)", "Nishad Party", "Hissedari Morcha", "JD (U)", "AIMIM", "Azad Samaj Party"],
    "SP +": ["RLD", "Apna Dal", "SBSP", "Mahan Dal", "Pragatisheel Samajwadi Party-Lohia", "Janwadi Socialist Party", "TMC", "NCP"]
  }
}

jQuery.ajax({
  'async': false,
  'global': false,
  'dataType': 'json',
  'cache': false,
  'url': 'data/alliancetable.json',
  'success': function(data) {
    drawAccTable(data["up_share2017"], "#up2017partywise-table", ["party", "won", "leading", "total"], "up");
    drawAccTable(data["uk_share2017"], "#uk2017partywise-table", ["party", "won", "leading", "total"], "uk");
    drawAccTable(data["mn_share2017"], "#mn2017partywise-table", ["party", "won", "leading", "total"], "mn");
    drawAccTable(data["pb_share2017"], "#pb2017partywise-table", ["party", "won", "leading", "total"], "pb");
    drawAccTable(data["ga_share2017"], "#ga2017partywise-table", ["party", "won", "leading", "total"], "ga");
  }
});
