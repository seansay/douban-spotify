var qpath = 'http://ws.spotify.com/search/1/album.json', albumsInfo = {},
isOpenSpotifyDirect = null;

var spotifyPage = function () {
    var subjectsCon = $('.article'),
    menuLeft = subjectsCon.offset().left + subjectsCon.width();
    $('.doulist_item').each(
        function (index) {
            var itemCon = $(this), album = $(this).find('.pl2>a').text(),
            info = $(this).find('p.pl').text().match('^表演者 : (.+)出版者 :.+$'),
            artist = (info && info.length > 1) ? info[1] : '';
            $.ajax({url:qpath, 
                    crossDomain:true,
                    data:{q:album.concat(' artist:', artist)},
                    success:function (ret) {
                        if (ret.info.num_results && ret.info.num_results > 0) {
                            var q = ret.info.query;
                            albumsInfo[q] = ret.albums;
                            addSpotifyBtn(itemCon.find('.pl2'), q, menuLeft);
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