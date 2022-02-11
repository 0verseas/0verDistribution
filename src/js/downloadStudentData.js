(()=>{
    const $stage0 = $('#stage-0');
    const $stageN = $('#stage-N');
    const $stageT = $('#stage-T');
    const $stage2 = $('#stage-2');
    const $stage5 = $('#stage-5');
    /**
     * init
     */
    init();

    async function init() {
        // 先確認是否登入
        const isLoginResponse = await User.isLogin();
        const isLoginData = await isLoginResponse.json();
        if(!isLoginResponse.ok){
            console.error(isLoginData);
            alert(`ERROR: \n${isLoginData.messages[0]}`);
            location.href="./login.html";
        } else {
            // 抓取校代碼
            const school_id = isLoginData.school_editor.school_code;
            // 確認開放下載時間
            const openTimeResponse =  await distributionApi.is_function_open_time();
            const openTimeData = await openTimeResponse.json();
            if(!openTimeResponse.ok){
                console.error(openTimeData);
                alert(`ERROR: \n${openTimeData.messages[0]}`);
            } else {
                if(openTimeData.s0_depart == 1 ){
                    // 確認是否有檔案可以下載
                    const LinkRespone = await User.checkDownloadLink(school_id, '0d');
                    if(LinkRespone.ok){
                        $stage0.addClass('link');
                        $stage0.removeClass('no-link');
                        // 如果有檔案可以下載就 set up Link 沒有 set up alert
                        if(LinkRespone.status != 204){
                            $stage0.attr('href', env.baseUrl + '/editors/distribution/download-student-apply-list/' + school_id + '/0d');
                        } else{
                            $stage0.attr('onclick', `alert('無錄取學生！');`);
                        }
                    }
                }
                if(openTimeData.s0_gra == 1 ){
                    // 確認是否有檔案可以下載
                    const LinkRespone = await User.checkDownloadLink(school_id, '0g');
                    if(LinkRespone.ok){
                        $stageN.addClass('link');
                        $stageN.removeClass('no-link');
                        // 如果有檔案可以下載就 set up Link 沒有 set up alert
                        if(LinkRespone.status != 204){
                            $stageN.attr('href', env.baseUrl + '/editors/distribution/download-student-apply-list/' + school_id + '/0g');
                        } else{
                            $stageN.attr('onclick', `alert('無錄取學生！');`);
                        }
                    }
                }    
                if(openTimeData.s0_tech == 1 ){
                    // 確認是否有檔案可以下載
                    const LinkRespone = await User.checkDownloadLink(school_id, '0t');
                    if(LinkRespone.ok){
                        $stageT.addClass('link');
                        $stageT.removeClass('no-link');
                        // 如果有檔案可以下載就 set up Link 沒有 set up alert
                        if(LinkRespone.status != 204){
                            $stageT.attr('href', env.baseUrl + '/editors/distribution/download-student-apply-list/' + school_id + '/0t');
                        } else{
                            $stageT.attr('onclick', `alert('無錄取學生！');`);
                        }
                    }
                }
                if(openTimeData.s2_depart == 1 ){
                    // 確認是否有檔案可以下載
                    const LinkRespone = await User.checkDownloadLink(school_id, 's2');
                    if(LinkRespone.ok){
                        $stage2.addClass('link');
                        $stage2.removeClass('no-link');
                        // 如果有檔案可以下載就 set up Link 沒有 set up alert
                        if(LinkRespone.status != 204){
                            $stage2.attr('href', env.baseUrl + '/editors/distribution/download-student-apply-list/' + school_id + '/s2');
                        } else{
                            $stage2.attr('onclick', `alert('無錄取學生！');`);
                        }
                    }
                }
                if(openTimeData.s5_depart == 1 ){
                    // 確認是否有檔案可以下載
                    const LinkRespone = await User.checkDownloadLink(school_id, 's5');
                    if(LinkRespone.ok){
                        $stage5.addClass('link');
                        $stage5.removeClass('no-link');
                        // 如果有檔案可以下載就 set up Link 沒有 set up alert
                        if(LinkRespone.status != 204){
                            $stage5.attr('href', env.baseUrl + '/editors/distribution/download-student-apply-list/' + school_id + '/s5');
                        } else{
                            $stage5.attr('onclick', `alert('無錄取學生！');`);
                        }
                    }
                }
            }
        }
    }
})();