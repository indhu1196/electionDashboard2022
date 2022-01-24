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
                    
                    if((d.value).includes("+") || (d.value).includes("Others")) {
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
  "tn":{
    "AIADMK +": ["AIADMK","PMK","BJP","TMCM","PTMK","TMMK","MMK","AIMMK","PBK","PDK"],
    "DMK +": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"]
  },
  "kl":{
    "CPIM +": ["CPI", "CPIM", "KCM", "JDS", "NCP", "LJD", "INL", "CS", "KSB", "JK"],
    "INC +": ["INC", "IUML", "KCJ", "RSP", "NCK", "KCJ", "CMP", "RMPS", "Independent"]
  },
  "wb":{
    "TMC +": ["AIADMK","PMK","BJP","TMCM","PTMK","TMMK","MMK","AIMMK","PBK","PDK"],
    "BJP +": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"],
    "Others": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"]
  },
  "as":{
    "BJP +": ["AIADMK","PMK","BJP","TMCM","PTMK","TMMK","MMK","AIMMK","PBK","PDK"],
    "INC +": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"],
    "Others": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"]
  },
  "pd":{
    "INC +": ["AIADMK","PMK","BJP","TMCM","PTMK","TMMK","MMK","AIMMK","PBK","PDK"],
    "AINRC +": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"],
    "Others": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"]
  },
  "ga":{
    "INC +": ["Goa Forward Party"],
    "TMC +": ["Maharashtrawadi Gomantak Party"],
    "Others": ["Communist Party of India", "Nationalist Congress Party", "Shivsena", "Ambedkarite Party of India", "Bahujan Mukti Party", "Goa Praja Party", "Goa Suraksha Manch", "Goa Su-Raj Party", "Goa Vikas Party", "Niz Goenkar Revolution Front", "Samajwadi Janata Party (ChandraShekhar)", "United Goans Party", "Independent", "NOTA"]
  }
}

jQuery.ajax({
  'async': false,
  'global': false,
  'dataType': 'json',
  'cache': false,
  'url': 'data/alliancetable.json',
  'success': function(data) {
    // drawAccTable(data["tn_share2021"], "#tn2021partywise-table", ["party", "won", "leading", "total"], "tn");
    // drawAccTable(data["kl_share2021"], "#kl2021partywise-table", ["party", "won", "leading", "total"], "kl");
    // drawAccTable(data["pd_share2021"], "#pd2021partywise-table", ["party", "won", "leading", "total"], "pd");
    // drawAccTable(data["as_share2021"], "#as2021partywise-table", ["party", "won", "leading", "total"], "as");
    drawAccTable(data["mn_share2017"], "#mn2017partywise-table", ["party", "won", "leading", "total"], "mn");
    drawAccTable(data["ga_share2017"], "#ga2017partywise-table", ["party", "won", "leading", "total"], "ga");
  }
});

jQuery.ajax({
  'async': false,
  'global': false,
  'dataType': 'json',
  'cache': false,
  'url': 'data/tabledata.json',
  'success': function(data) {
    // drawAccTable(data["tn_share2021"], "#tn2021map-table", ["party", "won", "leading", "total"], "tn");
    // drawAccTable(data["tn_share2021"], "#tn2016partywise-table", ["party", "won","leading","total"]);
    // drawAccTable(data["tn_share2021"], "#tn2016map-table", ["party", "won","leading","total"]);
    // drawAccTable(data["kl_share2021"], "#kl2021map-table", ["party", "won", "leading", "total"], "kl");
    // drawAccTable(data["kl_share2021"], "#kl2016partywise-table", ["party", "won","leading","total"]);
    // drawAccTable(data["kl_share2021"], "#kl2016map-table", ["party", "won","leading","total"]);
    // drawAccTable(data["pd_share2021"], "#pd2021map-table", ["party", "won", "leading", "total"], "pd");
    // drawAccTable(data["pd_share2021"], "#pd2016partywise-table", ["party", "won","leading","total"]);
    // drawAccTable(data["pd_share2021"], "#pd2016map-table", ["party", "won","leading","total"]);
    // drawAccTable(data["as_share2021"], "#as2021map-table", ["party", "won", "leading", "total"], "as");
    // drawAccTable(data["as_share2021"], "#as2016partywise-table", ["party", "won","leading","total"]);
    // drawAccTable(data["as_share2021"], "#as2016map-table", ["party", "won","leading","total"]);
  }
});