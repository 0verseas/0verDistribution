var distributionList = (function () {
    /**
     * cache DOM
     */
    const $depart = $('#depart'); // 學士班個人申請
    const $gra_depart = $('#gra_depart'); // 碩博班個人申請
    const $tech_depart = $('#tech_depart'); // 港二技個人申請

    const $s1 = $('#s1'); // 聯分第一梯次
    const $s2 = $('#s2'); // 聯分第一梯次
    const $s3 = $('#s3'); // 聯分第一梯次
    const $s4 = $('#s4'); // 聯分第一梯次
    const $s5 = $('#s5'); // 聯分第一梯次
    
    /**
     * bind event
     */

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
            if (json.has_banned) {
                alert("權限不足");
                location.replace('/login.html');
            } else {
                userData = json;

                var school_id = userData.school_editor.school.id;

                distributionApi.is_function_open_time()
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw res;
                        }
                    }).then((json) => {
                        //console.log("distributionApi", json);
                        if (json.s0_depart == 1) {
                            $depart.attr('href', env.baseUrl + '/editors/distribution/s0-depart/' + school_id);
                            $depart.addClass('link');
                            $depart.removeClass('no-link');
                        }

                        if (json.s0_gra == 1) {
                            $gra_depart.attr('href', env.baseUrl + '/editors/distribution/s0-gra/' + school_id);
                            $gra_depart.addClass('link');
                            $gra_depart.removeClass('no-link');
                        }

                        if (json.s0_tech == 1) {
                            $tech_depart.attr('href', env.baseUrl + '/editors/distribution/s0-tech/' + school_id);
                            $tech_depart.addClass('link');
                            $tech_depart.removeClass('no-link');
                        }

                        if (json.s1_depart == 1) {
                            $s1.attr('href', env.baseUrl + '/editors/distribution/s1/' + school_id);
                            $s1.addClass('link');
                            $s1.removeClass('no-link');
                        }

                        if (json.s2_depart == 1) {
                            $s2.attr('href', env.baseUrl + '/editors/distribution/s2/' + school_id);
                            $s2.addClass('link');
                            $s2.removeClass('no-link');
                        }

                        if (json.s3_depart == 1) {
                            $s3.attr('href', env.baseUrl + '/editors/distribution/s3/' + school_id);
                            $s3.addClass('link');
                            $s3.removeClass('no-link');
                        }

                        if (json.s4_depart == 1) {
                            $s4.attr('href', env.baseUrl + '/editors/distribution/s4/' + school_id);
                            $s4.addClass('link');
                            $s4.removeClass('no-link');
                        }

                        if (json.s5_depart == 1) {
                            $s5.attr('href', env.baseUrl + '/editors/distribution/s5/' + school_id);
                            $s5.addClass('link');
                            $s5.removeClass('no-link');
                        }

                    }).then(() => {
                        loading.complete();
                    }).catch((err) => {
                        err.json && err.json().then((data) => {
                            console.error(data);
                            alert(`ERROR: \n${data.messages[0]}`);

                            loading.complete();
                        });
                    })
            }
        }).catch(function (err) {
            if (err == 401) {
                alert("權限不足");
                location.replace('/login.html');
            }
        });

        
    }

})(jQuery);

