const distributionApi = (() => {


    function is_function_open_time () {
        return fetch(env.baseUrl + '/editors/distribution/check_open_time', {
            credentials: 'include'
        });
    }

    return {
        is_function_open_time,
    }

})();