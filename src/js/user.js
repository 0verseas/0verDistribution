var User = (function () {
    var _userInfo;
    var baseUrl = env.baseUrl;

    function _setUserInfo(userInfo) {
        _userInfo = userInfo;
    }

    function login(loginForm) {
        return fetch(baseUrl + '/editors/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(loginForm)
        });
    }

    function logout() {
        return fetch(baseUrl + '/editors/logout', {
            method: "POST",
            credentials: 'include'
        });
    }

    function isLogin() {
        return fetch(baseUrl + '/editors/login', {
            credentials: 'include'
        });
    }

    // permission: 'school_editor' | 'school_reviewer'
    function checkLogin(permission) {
        return isLogin().then(function (res) {
            if (res.ok) {
                return res.json();
            } else {
                throw res.status;
            }
        }).then(function (json) {
            if (!json[permission] || json[permission].has_banned) {  
                //alert("權限不足");              
                window.location.href = './login.html';
            } else {
                _setUserInfo(json);
            }
        }).catch(function (err) {
            if (err == 401) {    
                //alert("權限不足");                 
                window.location.href = './login.html';
            }
        });
    }

    function update(userInfo) {
        return fetch(baseUrl + `/schools/me/editors/${userInfo.username}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(userInfo)
        }).then(function (res) {
            if (res.ok) {
                return res.json();
            } else {
                throw res.status;
            }
        }).then(function (json) {
            _setUserInfo(json);
            Sidebar.showUserInfo();
        });
    }

    function getUserInfo() {
        return _userInfo
    }

    // function getLoginUserInfo() {
    //     isLogin().then(function (res) {
    //         if (res.ok) {
    //             console.log("101112", res)
    //             return res.json();
    //         } else {
    //             throw res.status;
    //         }
    //     }).then(function (json) {
    //         console.log("123", json)
    //         if (json.has_banned) {
    //             alert("權限不足");
    //             location.replace('/login.html');
    //         } else {
    //             console.log("456", json)
    //             return json;
    //         }
    //         console.log("789")
    //     }).catch(function (err) {
    //         if (err == 401) {
    //             alert("權限不足");
    //             location.replace('/login.html');
    //         }
    //     });
    // }


    function queryBySingleKeyword(category, keyword, year) {
        const request = fetch(`${baseUrl}/editors/distribution/single_query?category=${category}&year=${year}&keyword=${keyword}`, {
            credentials: 'include'
        });

        return _requestHandle(request);
    }

    function queryByExcel(data) {
        return fetch(`${baseUrl}/editors/distribution/excel_query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        //return _requestHandle(request);
    }

    // http request 的中介處理
    function _requestHandle(request) {
        return request.then(fetchResponse => {
            return fetchResponse.json().then(data => {
                return {
                    ok: fetchResponse.ok,
                    data,
                    statusCode: fetchResponse.status
                };
            }).then(response => {
                // 錯誤時的處理

                // 沒錯閃邊去
                if (response.ok) {
                    return response;
                }

                // 設定兩種錯誤類型（單行 string 跟原始 string array）
                response.singleErrorMessage = response.data.messages.join(',');
                response.errorMessages = response.data.messages;

                return response;
            });
        })
    }

    function  getLastTime() {
        return fetch(baseUrl + '/editors/taiwan-entry-permit', {
            credentials: 'include'
        });
    }

    function  getStudentList() {
        return fetch(baseUrl + '/editors/indonesia', {
            method: 'GET',
			credentials: 'include'
        });
    }

    function  getStudentInfo(studentInfo) {
        return fetch(baseUrl + `/editors/indonesia/${studentInfo.name}/${studentInfo.overseasId}`, {
            method: 'GET',
			credentials: 'include'
        });
    }

    function  saveStudentInfo(data) {
        return fetch(baseUrl + '/editors/indonesia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
			credentials: 'include',
            body: JSON.stringify(data)
        });
    }

    function  uploadStudentList(data) {
        return fetch(baseUrl + `/editors/indonesia/upload`, {
            method: 'POST',
			credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    function CSVToArray(strData, strDelimiter) {
		// Check to see if the delimiter is defined. If not,
		// then default to comma.
		strDelimiter = (strDelimiter || ",");
		// Create a regular expression to parse the CSV values.
		var objPattern = new RegExp((
			// Delimiters.
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
			// Standard fields.
			"([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
		// Create an array to hold our data. Give the array
		// a default empty first row.
		var arrData = [[]];
		// Create an array to hold our individual pattern
		// matching groups.
		var arrMatches = null;
		// Keep looping over the regular expression matches
		// until we can no longer find a match.
		while (arrMatches = objPattern.exec(strData)) {
			// Get the delimiter that was found.
			var strMatchedDelimiter = arrMatches[1];
			// Check to see if the given delimiter has a length
			// (is not the start of string) and if it matches
			// field delimiter. If id does not, then we know
			// that this delimiter is a row delimiter.
			if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
				// Since we have reached a new row of data,
				// add an empty row to our data array.
				arrData.push([]);
			}
			// Now that we have our delimiter out of the way,
			// let's check to see which kind of value we
			// captured (quoted or unquoted).
			if (arrMatches[2]) {
				// We found a quoted value. When we capture
				// this value, unescape any double quotes.
				var strMatchedValue = arrMatches[2].replace(
					new RegExp("\"\"", "g"), "\"");
			} else {
				// We found a non-quoted value.
				var strMatchedValue = arrMatches[3];
			}
			// Now that we have our value string, let's add
			// it to the data array.
			arrData[arrData.length - 1].push(strMatchedValue);
		}
		// Return the parsed data.
		return (arrData);
	}

    return {
        login,
        logout,
        isLogin,
        checkLogin,
        getUserInfo,
        update,
        queryBySingleKeyword,
        queryByExcel,
        getLastTime,
        getStudentList,
        getStudentInfo,
        saveStudentInfo,
        CSVToArray,
        uploadStudentList
        //getLoginUserInfo
    }
})();
