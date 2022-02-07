var owl = $('#up-keycarous');

owl.owlCarousel({
  nav:true,
  margin:10,
  loop:true,
  responsive:{
    0:{
      items:2
    },
    1000:{
      items:3
    }
  }
});

$.ajax({
  url: 'https://script.google.com/macros/s/AKfycbypUWDYB-4aIm5xbKL6lYMmo6D9evhAWVpIt_UOL7lYO5EwF93leS11erECfTuD3gE/exec',
  dataType: 'json',
  success: function(data) {
      console.log(data)
    var content = '';
    for (i in data.owl) {
            content += data.owl[i].item;
        }

    owl.trigger('insertContent.owl',content);
  }
});