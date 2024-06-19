var distributionList = (function () {
    /**
     * cache DOM
     */
    const $oyvtp = $('#oyvtp'); // 四年制產學合作學士班

    /**
     * bind event
     */

    /**
     * init
     */
    _init();

    async function _init() {
        // 先確認是否登入
        const isLoginResponse = await User.isLogin();
        const isLoginData = await isLoginResponse.json();
        if(!isLoginResponse.ok){
            console.error(isLoginData);
            alert(`ERROR: \n${isLoginData.messages[0]}`);
            location.href="./login.html";
        } else {
            await loading.start();
            // 抓取校代碼
            const school_id = isLoginData.school_editor.school_code;
            // 確認開放下載時間
            const hasAdmittedStudentsResponse =  await distributionApi.has_admitted_students();
            const hasAdmittedStudentsData = await hasAdmittedStudentsResponse.json();
            if(!hasAdmittedStudentsResponse.ok){
                console.error(hasAdmittedStudentsData);
                alert(`ERROR: \n${hasAdmittedStudentsData.messages[0]}`);
                $oyvtp.addClass('link');
                $oyvtp.removeClass('no-link');
                $oyvtp.attr('onclick', `alert('無錄取學生！');`);
            } else {
                $oyvtp.addClass('link');
                $oyvtp.removeClass('no-link');
                $oyvtp.attr('href', env.baseUrl + '/young-associate/distribution/2');
            }
            await loading.complete();
        }
    }

})(jQuery);

