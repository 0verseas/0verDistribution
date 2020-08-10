(()=>{
    const $entryPermit= $('#entry-permit');
    const $lastDataTime= $('#last-data-time');
    const $lastDownloadTime= $('#last-download-time');
    /**
     * init
     */
    _setData();

    function _setData() {
        //取得資料更新與上次下載時間
        User.getLastTime().then(function (res) {
            if (res.ok) {
                return res.json();
            } else {
                throw res.status;
            }
        }).then(function (json) {
            //沒有錯誤就渲染資料
            dataTime = (json.last_NIA_create_time != null) ?json.last_NIA_create_time :'目前無貴校學生資料';//沒有學生資料就顯示字串文字
            downloadTime = (json.last_record_time != null) ?json.last_record_time :'尚未下載過學生資料';//沒有下載時間就顯示字串文字
            $lastDataTime.text($lastDataTime.text()+dataTime.replaceAll("/", '-')); //資料更新時間
            $lastDownloadTime.text($lastDownloadTime.text()+downloadTime.replace('T', " ").substr(0,19));//上次下載時間
            $entryPermit.attr('href', env.baseUrl + '/editors/download-taiwan-entry-permit');//下載連結
            //更換文字class來替換css
            $entryPermit.addClass('link');
            $entryPermit.removeClass('no-link');
            
        }).catch(function (err) {
            if (err == 401) {
                //alert("權限不足");
                window.location.href = './login.html';
            }
        });   
    }
})();