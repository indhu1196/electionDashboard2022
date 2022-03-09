function stCarousel(selector, datasource, statn, stName, keySel, keySource, stc, imgpath) {
    // keySource = keyCandData
    // console.log(keySource)
    $(selector).owlCarousel({
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [980,3],
        itemsTablet: [768,2],
        itemsTabletSmall: false,
        itemsMobile : [479,1],
        pagination: true,
        navigation : true,
        navigationText : ['<i class="arrow left"></i>','<i class="arrow right"></i>'],
        jsonPath : datasource,
        jsonSuccess : customDataSuccess
    });  
    function customDataSuccess(data){ 
        // console.log(data["data"][0][statn])
        var content = "";
        for(var i in data[statn]){   
            var constituencyname = data[statn][i].constituency;
            var leadingname = data[statn][i]["leadingCandidate"];
            var leadingparty = data[statn][i]["leadingParty"];
            var leadingmargin = data[statn][i]["margin"];
            var trailingname = data[statn][i]["trailingCandidate"];
            var trailingparty = data[statn][i]["trailingParty"];
            var trailingmargin = data[statn][i]["margin"];
            //console.log(filter_const);
            
            html = '<div class="contituency-items">'
            html += '<h3> '+ stName +' | <span>'+constituencyname+'</span> </h3>'
            html += '<div class="consWrap">'
            html += '<span class="leadingindicator">Winning</span>'
            html += '<div class="leadingcand">'
            html += '<h4>'+leadingname+' <span> ('+leadingparty+') </span></h4>'
            html += '<p>'+leadingmargin.toLocaleString('en-IN')+'</p>'
            html += '</div>'
            html += '<span class="trailingindicator">Trailing</span>'        
            html += '<div class="trailingcand">'
            html += '<h4>'+trailingname+' </h4>'
            // html += '<h4>'+trailingname+' <span>'+trailingparty+'</span></h4>'
            //html += '<p>'+trailingmargin.toLocaleString('en-IN')+'</p>'
            html += '</div>'
            html += '</div>'
            html += '</div>'        
            content += html
        }
        $(selector).html(content);
    }
    $(keySel).owlCarousel({
        items: 3,
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [980,3],
        itemsTablet: [768,2],
        itemsTabletSmall: false,
        itemsMobile : [479,1],
        pagination: true,
        navigation : true,
        navigationText : ['<i class="arrow left"></i>','<i class="arrow right"></i>'],
        jsonPath : keySource,
        jsonSuccess : customDataSuccess1
    });
    function customDataSuccess1(data) {
        console.log(data[stc])
        var cand = "";
        var statn = stc; 
        // console.log("Statename:"+statename);
            for(var j in data[statn]){
                
                var phase = data[statn][j].phase;
                var keyconstno = data[statn][j].constno;
                var keyconstname = data[statn][j].constname;
                var keycandidatename = data[statn][j].candidatename;
                var keycandidateparty = data[statn][j].candidateparty
                var keycandidateage = data[statn][j].age
                var keycandidateedu = data[statn][j].education
                var keycandidatenet = data[statn][j].networth
                var keyliabilities = data[statn][j].liabilities
                var keycriminals = data[statn][j].criminalcases

                html = '<div class="poll-candidate-items">'
                html += '<img src="img/'+imgpath+"/"+keycandidatename+'.png" alt="">'
                html += '<div class="cand-info">'
                html += '<h4>'+keycandidatename+'<span class="keycand-age"> ('+keycandidateage+') </span>'+'<span>'+keycandidateparty+'</span></h4>'
                html += '<p class="cand-cont">'+keyconstname+'</p>'
                html += '<hr>'
                html += '<ul class="cand-meta">'
                html += '<li>Education <span>'+keycandidateedu+'</span></li>'
                html += '<li>Networth <span>'+keycandidatenet+'</span></li>'
                // html += '<li>Networth (2016) <span>'+keycandidatenet2016+'</span></li>'
                html += '</ul>'
                html += '<hr>'
                html += '<ul class="cand-meta" >'
                html += '<li>liabilities <span>'+keyliabilities+'</span></li>'
                html += '<li>Criminal cases <span>'+keycriminals+'</span></li>'
                html += '</ul>'
                html += '</div>'
                html += '</div>'

                
                cand += html
        }
        $(keySel).html(cand);
    }
}

$(document).ready(function(){   
    stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#up-keycarous1" ,"data/keycandidate.json", "up_keycandidate_phaseI", "up");
    stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#up-keycarous2" ,"data/keycandidate.json", "up_keycandidate_phaseII", "up");
    stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#up-keycarous3" ,"data/keycandidate.json", "up_keycandidate_phaseIII", "up");
    stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#up-keycarous4" ,"data/keycandidate.json", "up_keycandidate_phaseIV", "up");
    stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#up-keycarous5" ,"data/keycandidate.json", "up_keycandidate_phaseV", "up");
    stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#up-keycarous6" ,"data/keycandidate.json", "up_keycandidate_phaseVI", "up");
    stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#up-keycarous7" ,"data/keycandidate.json", "up_keycandidate_phaseVII", "up");
    stCarousel("#uk-carousel", "data/const2017data.json", "uk_conswise", "Uttarakhand", "#uk-keycarous" ,"data/keycandidate.json", "uk-keycandidate", "uk");
    stCarousel("#pb-carousel", "data/const2017data.json", "pb_conswise", "Punjab", "#pb-keycarous" ,"data/keycandidate.json", "pb-keycandidate", "pb");
    stCarousel("#mn-carousel", "data/const2017data.json", "mn_conswise", "Manipur", "#mn-keycarous1" ,"data/keycandidate.json", "mn-keycandidate_phaseI", "mn");
    stCarousel("#mn-carousel", "data/const2017data.json", "mn_conswise", "Manipur", "#mn-keycarous2" ,"data/keycandidate.json", "mn-keycandidate_phaseII", "mn");
    stCarousel("#ga-carousel", "data/const2017data.json", "ga_conswise", "Goa", "#ga-keycarous" ,"data/keycandidate.json", "ga-keycandidate", "ga");
})

