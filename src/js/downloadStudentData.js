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
        const isLoginResponse = await User.isLogin();
        const isLoginData = await isLoginResponse.json();
        if(!isLoginResponse.ok){
            console.error(isLoginData);
            alert(`ERROR: \n${isLoginData.messages[0]}`);
            location.href="./login.html";
        } else {
            console.log(isLoginData);
            const school_id = isLoginData.school_editor.school_code;
            console.log(school_id);
            const openTimeResponse =  await distributionApi.is_function_open_time();
            const openTimeData = await openTimeResponse.json();
            if(!openTimeResponse.ok){
                console.error(openTimeData);
                alert(`ERROR: \n${openTimeData.messages[0]}`);
            } else {
                if(openTimeData.s0_depart == 1 ){
                    const LinkRespone = await User.checkDownloadLink(school_id, '0d');
                    if(LinkRespone.ok && LinkRespone.status != 204){
                        $stage0.attr('href', env.baseUrl + '/editors/distribution/download-student-apply-list/' + school_id + '/0d');
                        $stage0.addClass('link');
                        $stage0.removeClass('no-link');
                    }
                }
                if(openTimeData.s0_gra == 1 ){
                    const LinkRespone = await User.checkDownloadLink(school_id, '0g');
                    if(LinkRespone.ok && LinkRespone.status != 204){
                        $stageN.attr('href', env.baseUrl + '/editors/distribution/download-student-apply-list/' + school_id + '/0g');
                        $stageN.addClass('link');
                        $stageN.removeClass('no-link');
                    }
                }    
                if(openTimeData.s0_tech == 1 ){
                    const LinkRespone = await User.checkDownloadLink(school_id, '0t');
                    if(LinkRespone.ok && LinkRespone.status != 204){
                        $stageT.attr('href', env.baseUrl + '/editors/distribution/download-student-apply-list/' + school_id + '/0t');
                        $stageT.addClass('link');
                        $stageT.removeClass('no-link');
                    }
                }
                if(openTimeData.s2_depart == 1 ){
                    const LinkRespone = await User.checkDownloadLink(school_id, 's2');
                    if(LinkRespone.ok && LinkRespone.status != 204){
                        $stage2.attr('href', env.baseUrl + '/editors/distribution/download-student-apply-list/' + school_id + '/s2');
                        $stage2.addClass('link');
                        $stage2.removeClass('no-link');
                    }
                }
                if(openTimeData.s5_depart == 1 ){
                    const LinkRespone = await User.checkDownloadLink(school_id, 's5');
                    if(LinkRespone.ok && LinkRespone.status != 204){
                        $stage5.attr('href', env.baseUrl + '/editors/distribution/download-student-apply-list/' + school_id + '/s5');
                        $stage5.addClass('link');
                        $stage5.removeClass('no-link');
                    }
                }
            }
        }
    }
})();