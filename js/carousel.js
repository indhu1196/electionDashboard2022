$(document).ready(function(){
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
            // console.log(keySource)
            var keyCandData = (function() {
                var keyCandData = null;
                jQuery.ajax({
                    'async': false,
                    'global': false,
                    'dataType': 'json',
                    'url': 'https://script.google.com/macros/s/AKfycbyKf7Rw8r7e6eyaIYwUIotrd6F0Mz96eBzEWwFj--FiKOZs5sBYsA52BP4JAz6M_zTI/exec',
                    'success': function(data) {
                        keyCandData = data;
                        // console.log(JSON.stringify(data, null, 4));
                    }
                });
                return keyCandData;
            })();
            console.log(keyCandData)
                var cand = "";
                // var statn1 = stc+"_keycandidate"; 
                var statn1 = stc; 
				console.log("Statename"+statn1);
				var tempobj = keyCandData.content;
				console.log("Sheet object:"+statn1);
				 console.log("Sheet state data:"+tempobj[statn1]);
				 console.log("Sheet Length:"+tempobj[statn1]);
                var len = tempobj[statn1].length;
                for(var j=0; j<len; j++){
                // for(var j in data1[statn1]){  
                   
                    // // var img = data[statn][j].["img/profile.png"];
                    var keycandidatename = keyCandData["content"][statn1][j]["candidatename"];
                    var keycandidateplace = keyCandData["content"][statn1][j]['constname'];
                    var keycandidateparty = keyCandData["content"][statn1][j]['candidateparty'];
                    var keycandidatestatus = keyCandData["content"][statn1][j]['status'];
                    
                    html = '<div class="candidate-items">'
                    html += '<img src="img/'+imgpath+'/'+keycandidatename+'.png" alt="">'
                    html += '<div class="cand-info">'
                    html += '<h4> <p>'+ keycandidatename +'</p><span>'+ keycandidateparty +'</span></h4>'
                    html += '<p class="cand-cont">'+ keycandidateplace +'</p>'
                    // if($("keycandidatestatus:contains('Won')")) {
                    //     $(".candidate-items .cand-votes::before").css("background-color", "#008000")
                    // } else {
                    //     $(".candidate-items .cand-votes::before").css("background-color", "red")
                    // }
                    html += '<p class="cand-votes ' + keycandidatestatus + '"><span class="bullet ' + keycandidatestatus + '"></span>'+keycandidatestatus +'</p>'
                    html += '</div>'
                    html += '</div>'
                    cand += html
                }
                $(keySel).html(cand);
            }
    }
    
    stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#up-keycarous1" ,"data/keycandidate.json", "up_keycandidate_phaseI", "up");
    stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#up-keycarous2" ,"data/keycandidate.json", "up_keycandidate_phaseII", "up");
    stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#up-keycarous3" ,"data/keycandidate.json", "up_keycandidate_phaseIII", "up");
    stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#up-keycarous4" ,"data/keycandidate.json", "up_keycandidate_phaseIV", "up");
    stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#up-keycarous5" ,"data/keycandidate.json", "up_keycandidate_phaseV", "up");
    stCarousel("#up-carousel", "data/const2017data.json", "up_conswise", "Uttar Pradesh", "#up-keycarous6" ,"data/keycandidate.json", "up_keycandidate_phaseVI", "up");
    stCarousel("#uk-carousel", "data/const2017data.json", "uk_conswise", "Uttarakhand", "#uk-keycarous" ,"data/keycandidate.json", "uk_keycandidate", "uk");
    stCarousel("#pb-carousel", "data/const2017data.json", "pb_conswise", "Punjab", "#pb-keycarous" ,"data/keycandidate.json", "pb_keycandidate", "pb");
    stCarousel("#mn-carousel", "data/const2017data.json", "mn_conswise", "Manipur", "#mn-keycarous" ,"data/keycandidate.json", "mn_keycandidate", "mn");
    stCarousel("#ga-carousel", "data/const2017data.json", "ga_conswise", "Goa", "#ga-keycarous" ,"data/keycandidate.json", "ga_keycandidate", "ga");
    
})

