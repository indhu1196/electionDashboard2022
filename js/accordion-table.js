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

function drawAccTable(dataSrc, stc, selector, labels, scode){
  // console.log(data)
  var tableData = (function() {
      tableData = null;
      jQuery.ajax({
          'async': false,
          'global': false,
          'cache': false,
          'dataType': 'json',
          'url': dataSrc,
          'success': function(data) {
              if(dataSrc == "https://thefederal.com/api/scraper.php?m=election2022&t=partywise") {
                  // console.log(d["data"][stc]);
                  tableData = data["data"][stc];
              } else {
                  // console.log(d[stc]);
                  tableData = data[stc];
              }
          }
      });
      return tableData;
  })();
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
      .data(tableData)
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


drawAccTable("data/alliancetable.json", "up_share2017", "#up2017partywise-table", ["party", "won", "leading", "total"], "up");
drawAccTable("data/alliancetable.json", "uk_share2017", "#uk2017partywise-table", ["party", "won", "leading", "total"], "uk");
drawAccTable("data/alliancetable.json", "mn_share2017", "#mn2017partywise-table", ["party", "won", "leading", "total"], "mn");
drawAccTable("data/alliancetable.json", "pb_share2017", "#pb2017partywise-table", ["party", "won", "leading", "total"], "pb");
drawAccTable("data/alliancetable.json", "ga_share2017", "#ga2017partywise-table", ["party", "won", "leading", "total"], "ga");

// drawAccTable("https://thefederal.com/api/scraper.php?m=election2022&t=partywise", "pu", "#mn2022partywise-table", ["party", "won", "leading", "total"], "mn");
