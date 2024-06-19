const distributionApi = (() => {


    function has_admitted_students () {
        return fetch(env.baseUrl + '/young-associate/distribution', {
            credentials: 'include'
        });
    }

    return {
        has_admitted_students,
    }

})();