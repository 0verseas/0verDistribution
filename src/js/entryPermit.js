(()=>{
    const $entryPermit= $('#entry-permit');
    /**
     * init
     */
    _setData();

    function _setData() {
        var userData;
        User.isLogin().then(function (res) {
            if (res.ok) {
                return res.json();
            } else {
                throw res.status;
            }
        }).then(function (json) {
            if(!json.has_banned){
                $entryPermit.attr('href', env.baseUrl + '/editors/taiwan-entry-permit');
                $entryPermit.addClass('link');
                $entryPermit.removeClass('no-link');
            }
        }).catch(function (err) {
            if (err == 401) {
                //alert("權限不足");
                window.location.href = './login.html';
            }
        });   
    }
})();