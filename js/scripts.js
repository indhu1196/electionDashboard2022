function carouselWidget(datasource, selector, statename, stName) { 
    statename = (typeof statename !== 'undefined' || statename !='') ? statename : btn_data;
	statename_fixed = statename;  
    // var filter_const = filter;
    // var filter_const2 = letterFilter;
    $("#owl-demo").owlCarousel({
        itemsDesktop : [1199,4],
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
        var content = "";
        var matchingletter;
        var statn = statename+"_conswise"; 
        console.log("Statename:"+statn);       
        for(var i in data[statn]){   
            var constituencyname = data[statn][i].constituency;
            var leadingname = data[statn][i]["leadingCandidate"];
            var leadingparty = data[statn][i]["leadingParty"];
            var leadingmargin = data[statn][i]["margin"];
            var trailingname = data[statn][i]["trailingCandidate"];
            var trailingparty = data[statn][i]["trailingParty"];
            var trailingmargin = data[statn][i]["margin"];
            //console.log(filter_const);
            // if(filter_const !=  'wb-polling-day' && filter_const != '') { //console.log('here', data[statn]);
			// 	var matchingletter = constituencyname.charAt(0).toUpperCase();
			// 	if(matchingletter != filter_const) {
			// 		continue;
			// 	}
			// }
            // if(filter_const2 !=  'wb-polling-day' && filter_const2 != '') { //console.log('here', data[statn]);
			// 	var matchingletter = constituencyname;
			// 	if(matchingletter != filter_const2) {
			// 		continue;
			// 	}
			// }
            html = '<div class="contituency-items">'
            html += '<h3> '+ stName +' | <span>'+constituencyname+'</span> </h3>'
            html += '<span class="leadingindicator">Leading</span>'
            html += '<div class="leadingcand">'
            html += '<h4>'+leadingname+'<span>'+leadingparty+'</span></h4>'
            html += '<p>'+leadingmargin.toLocaleString('en-IN')+'</p>'
            html += '</div>'
            html += '<span class="trailingindicator">Leading</span>'        
            html += '<div class="trailingcand">'
            html += '<h4>'+trailingname+' <span>'+trailingparty+'</span></h4>'
            html += '<p>'+trailingmargin.toLocaleString('en-IN')+'</p>'
            html += '</div>'
            html += '</div>'        
            content += html
			
        }
		
        $(selector).html(content);
    }


    $("#owl-demo2").owlCarousel({
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [980,3],
        itemsTablet: [768,2],
        itemsTabletSmall: false,
        itemsMobile : [479,1],
        pagination: true,
        navigation : true,
        navigationText : ['<i class="arrow left"></i>','<i class="arrow right"></i>'],
        jsonPath : datasource,
        jsonSuccess : customDataSuccess1
    });

    function customDataSuccess1(data) {
            var cand = "";
            var statn1 = statename+"-keycandidate"; 
            //var statn = "tn-keycandidate"; 
            for(var j in data[statn1]){
                console.log(statename)
                // var img = data[statn][j].["img/profile.png"];
                var keycandidatename = data[statn1][j].candidatename;
                var keycandidateplace = data[statn1][j].constname;
                var keycandidateparty = data[statn1][j].candidateparty;
                var keycandidateleading = data[statn1][j].age;
                var keycandidatevotes = data[statn1][j].education
                
                html = '<div class="candidate-items">'
                html += '<img src="img/profile.png" alt="">'
                html += '<div class="cand-info">'
                html += '<h4>'+ keycandidatename +'<span>'+ keycandidateparty +'</span></h4>'
                html += '<p class="cand-cont">'+ keycandidateplace +'</p>'
                html += '<p class="cand-votes"><span>'+keycandidateleading +'</span> '+keycandidatevotes +'</p>'
                html += '</div>'
                html += '</div>'
                cand += html
            }
            $("#owl-demo2").html(cand);
        }
}
