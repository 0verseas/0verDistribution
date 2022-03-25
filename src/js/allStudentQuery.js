var allStudentQuery = (function () {


    const $selectYear = $('#select_year');
    const $selectField = $('#select_field');
    const $keyword = $('#keyword');
    const $searchBtn = $('#search-button');
    const $resultBody = $('#resultBody');
    const $uploadBtn = $('#btn-upload');
    const $fileInput = $('#file-input');
    const $excelResultBody = $('#excelResultBody');
    
    
    $searchBtn.on('click', _searchBtn);
    $uploadBtn.on('click', _handleUpload);

    $selectYear.selectpicker();
    $selectField.selectpicker();

    _init();

    loading.complete();
    // 關鍵字送出查詢
    function _searchBtn() {
        $param_1 = $selectField.val();
        $param_2 = $keyword.val();
        $param_3 = $selectYear.val();

        if ($param_2 == ''){
            $resultBody.html(`<div style="font-size:medium; font-weight:bold; color:red">請輸入關鍵字</div>`);
        }
        else{
            User.queryBySingleKeyword($param_1, $param_2, $param_3).then(response => {
                if (!response.ok) {
                    switch (response.statusCode) {
                        case 404:
                            $resultBody.html(`<div style="font-size:large; font-weight:bold; color:blue">404 請連絡本會資訊人員陳小姐，電話:049-2910960＃2263</div>`);
                            break;
                        default:
                            alert(response.singleErrorMessage);
                            break;
                    }
                    return;
                }
                else {
                    $students = response.data;

                    $resultHtml = 
                        `<table class="table table-striped ">
                            <thead class="bg-info text-white">
                            <tr>
                                <th scope="col">僑生編號</th>
                                <th scope="col">學生姓名</th>
                                <th scope="col">性別</th>
                                <th scope="col">國家</th>
                                <th scope="col">生日</th>
                                <th scope="col">分發日期</th>
                                <th scope="col">分發文號</th>
                                <th scope="col">分發校系</th>
                            </tr>
                        </thead>`;
                    $resultHtml += `<tbody>`;
                    
                    for (let student of $students){
                        if (student.性別 == 'M'){
                            sex = '男';
                        }
                        else{
                            sex = '女';
                        }
                        $resultHtml += 
                        `<tr>
                            <th scope="row">${student.僑編}</th>
                            <td>${student.名字} <br> ${student.英文名字}</td>
                            <td>${sex}</td>
                            <td>${student.僑居地}</td>
                            <td>${student.生日}</td>
                            <td>${student.分發日期}</td>
                            <td>${student.分發文號}</td>
                            <td>${student.分發學校} <br> ${student.分發學系}</td>
                        </tr>`;
                    }

                    if ($students.length == 0) {
                        $resultHtml = `<div style="font-size:large; font-weight:bold; color:blue">無相關資料</div>`;
                    }
                }
                $resultBody.html($resultHtml);
                //console.log(response.data)
            });
        }
    }

    function _handleUpload() {
        $fileInput.trigger('click');
    }

    // 讀取 excel 資料
    $fileInput.change(function (e) {
        var files = e.target.files;
        var fileReader = new FileReader();
        fileReader.onload = function (ev) {
            try {
                var data = ev.target.result
                var workbook = XLSX.read(data, {
                    type: 'binary'
                }) // 以二進位制流方式讀取得到整份excel表格物件
                var persons = []; // 儲存獲取到的資料
            } catch (e) {
                alert('檔案型別不正確，請使用 Excel (.xlsx) 檔案！');
                return;
            }
            // 表格的表格範圍，可用於判斷表頭是否數量是否正確
            var fromTo = '';
            // 遍歷每張表讀取
            for (var sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    fromTo = workbook.Sheets[sheet]['!ref'];
                    //console.log(fromTo);
                    columnWidth = fromTo.split(":");
                    columnWidth = columnWidth[1].substr(0,1);
                    
                    // 僅限兩欄 姓名、生日
                    if (columnWidth != "B"){
                        alert("格式錯誤！請參考網頁範例檔！");
                        return;
                    }

                    persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    break; // 如果只取第一張表，就取消註釋這行
                }
            }
            //在控制檯打印出來表格中的資料
            exceltoSearch(persons);
            //console.log(persons);
        };
        // 以二進位制方式開啟檔案
        fileReader.readAsBinaryString(files[0]);
        $fileInput.val('');
    });

    // excel 上傳搜尋
    function exceltoSearch(data) {
        loading.start();
        User.queryByExcel(data).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json) => {
            $students = json;

            $resultHtml = '';
            $resultHtml =
                `<table class="table table-striped ">
                            <thead class="bg-info text-white">
                            <tr>
                                <th scope="col">僑生編號</th>
                                <th scope="col">學生姓名</th>
                                <th scope="col">性別</th>
                                <th scope="col">國家</th>
                                <th scope="col">生日</th>
                                <th scope="col">分發日期</th>
                                <th scope="col">分發文號</th>
                                <th scope="col">分發校系</th>
                            </tr>
                        </thead>`;
            $resultHtml += `<tbody>`;

            for (let student of $students) {
                if (student[3] == 'M') {
                    sex = '男';
                }
                else {
                    sex = '女';
                }
                $resultHtml +=
                    `<tr>
                            <th scope="row">${student[0]}</th>
                            <td>${student[1]} <br> ${student[2]}</td>
                            <td>${sex}</td>
                            <td>${student[4]}</td>
                            <td>${student[5]}</td>
                            <td>${student[6]}</td>
                            <td>${student[7]}</td>
                            <td>${student[8]} <br> ${student[9]}</td>
                        </tr>`;
            }

            if ($students.length == 0) {
                $resultHtml = `<div style="font-size:large; font-weight:bold; color:blue">無相關資料</div>`;
            }

            $excelResultBody.html($resultHtml);
            loading.complete();
        })
        .catch((err) => {
            err.json && err.json().then((data) => {
                console.error(data);
                alert(`ERROR: \n${data.messages[0]}`);
            })
            loading.complete();
        })
    }

    function _init(){
        // 先設定初始年份與抓取最新年份
        const start_year = 2011;
        const last_year = env.year;

        // 開始渲染年份選擇器選項
        $selectYear.append(`<option value="all" selected>不分年</option>`);
        for(let i=last_year; i >= start_year; i--){
            $selectYear.append(`<option value="${i}">${i} 秋季入學</option>`);
        }
        // 更新選擇器 不更新 剛剛渲染的物件不會顯示
        $selectYear.selectpicker("refresh");
    }

})(jQuery);