function stCarousel(selector, datasource, statn, stName, keySel, keySource, stc) {
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
        // console.log(data)
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
            content += html
			
        }
		
        $(selector).html(content);
    }

    $(keySel).owlCarousel({
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

    function customDataSuccess1(data1) {
            var cand = "";
            var statn1 = stc+"-keycandidate"; 
            for(var j in data1[statn1]){
                // console.log(data1)
                // var img = data[statn][j].["img/profile.png"];
                var keycandidatename = data1[statn1][j].candidatename;
                var keycandidateplace = data1[statn1][j].constname;
                var keycandidateparty = data1[statn1][j].candidateparty;
                var keycandidateleading = data1[statn1][j].age;
                var keycandidatevotes = data1[statn1][j].education
                
                html = '<div class="candidate-items">'
                html += '<img src="img/Key candidates/'+stc+'/'+keycandidatename+'.png" alt="">'
                html += '<div class="cand-info">'
                html += '<h4>'+ keycandidatename +'<span>'+ keycandidateparty +'</span></h4>'
                html += '<p class="cand-cont">'+ keycandidateplace +'</p>'
                html += '<p class="cand-votes"><span>'+keycandidateleading +'</span> '+keycandidatevotes +'</p>'
                html += '</div>'
                html += '</div>'
                cand += html
            }
            $(keySel).html(cand);
        }
    
}

// stCarousel("#tn-carousel", "data/const2021data.json", "tn_conswise", "Tamil Nadu", "#tn-keycarous" ,"data/keycandidate.json", "tn");
// stCarousel("#as-carousel", "data/const2021data.json", "as_conswise", "Assam", "#as-keycarous" ,"data/keycandidate.json", "as");
// stCarousel("#up-carousel", "data/const2016data.json", "up_conswise", "Uttar Pradesh", "#wb-keycarous" ,"data/keycandidate.json", "wb");
// stCarousel("#kl-carousel", "data/const2021data.json", "kl_conswise", "Kerala", "#kl-keycarous" ,"data/keycandidate.json", "kl");
// stCarousel("#pd-carousel", "data/const2021data.json", "pd_conswise", "Puducherry", "#pd-keycarous" ,"data/keycandidate.json", "pd");

stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#wb-keycarous" ,"data/keycandidate.json", "wb");
stCarousel("#uk-carousel", "data/const2017data.json", "uk_conswise", "Uttar Pradesh", "#wb-keycarous" ,"data/keycandidate.json", "wb");
stCarousel("#pb-carousel", "data/const2017data.json", "pb_conswise", "Punjab", "#wb-keycarous" ,"data/keycandidate.json", "wb");
stCarousel("#mn-carousel", "data/const2017data.json", "mn_conswise", "Manipur", "#wb-keycarous" ,"data/keycandidate.json", "wb");
stCarousel("#ga-carousel", "data/const2017data.json", "ga_conswise", "Uttar Pradesh", "#wb-keycarous" ,"data/keycandidate.json", "wb");
