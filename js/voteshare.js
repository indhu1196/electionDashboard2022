$(document).ready(function(){
    function voteCalc(stc) {
        var totalVotes = null;
        var votepercent = (function(){
            votepercent = null;
            jQuery.ajax({
                'async': false,
                'global': false,
                'dataType': 'json',
                'url': 'https://thefederal.com/api/scraper.php?m=election2022&t=votescount',
                'success': function(data) {
                    // console.log(data["up_conswise"])
                    votepercent = data["data"][stc+"_conswise"];
                    totalVotes = data["data"][stc+"_conswise"]["votes"]
                }
            });
            return votepercent;
        })();
        console.log(votepercent);
    }
    voteCalc("up");
    
});


 
