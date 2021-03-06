var qpath = 'http://ws.spotify.com/search/1/album.json', albumsInfo = {},
isOpenSpotifyDirect = null;

var spotifyPage = function () {
    var subjectsCon = $('.grid-view'),
    menuLeft = subjectsCon.offset().left + subjectsCon.width();
    $('.item').each(
        function (index) {
            var itemCon = $(this), album = $(this).find('.title>a>em').text(),
            infos = $(this).find('.intro').text().split('/'),
            artist = infos[infos.length - 1].replace(' ', '');;
            $.ajax({url:qpath, 
                    crossDomain:true,
                    data:{q:album.concat(' artist:', artist)},
                    success:function (ret) {
                        if (ret.info.num_results && ret.info.num_results > 0) {
                            var q = ret.info.query;
                            albumsInfo[q] = ret.albums;
                            addSpotifyBtn(itemCon.find('.title'), q, menuLeft);
                        }
                    }
                   });
        });    
};

chrome.extension.sendRequest({method:"getLocalStorage", key:"isOpenSpotifyDirect"},
                             function(response) {
                                 isOpenSpotifyDirect = (response.data == 'false') ? false : true;
                                 spotifyPage();
                             });