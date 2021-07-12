(()=>{
    const $paginationContainer = $('#pagination-container'); // 分頁區域
    const $studentList = $('#student-list');

    const $editStudentInfoModal = $('#editStudentInfoModal'); // 學生資料編輯區域
    const $modalStudentInfo = $('#modal-studentInfo'); // 學生資料
    const $year = $modalStudentInfo.find('#year');
    const $schoolName = $modalStudentInfo.find('#schoolName');
    const $name = $modalStudentInfo.find('#name');
    const $overseasId = $modalStudentInfo.find('#overseasId');
    const $department = $modalStudentInfo.find('#department');
    const $distributeDate = $modalStudentInfo.find('#distributeDate');
    const $distributeNumber = $modalStudentInfo.find('#distributeNumber');
    const $confirmStatus = $modalStudentInfo.find('#confirmStatus');
    const $studentStatus = $modalStudentInfo.find('#studentStatus');
    const $studentStatusReason = $modalStudentInfo.find('#studentStatusReason');
    const $statusDate = $modalStudentInfo.find('#statusDate');
    const $registerDate = $modalStudentInfo.find('#registerDate');

    const $schoolYear = $modalStudentInfo.find('#schoolYear');
    const $academicCredit = $modalStudentInfo.find('#academicCredit');
    const $averageGrades = $modalStudentInfo.find('#averageGrades');
    const $classPopulation = $modalStudentInfo.find('#classPopulation');
    const $ranking = $modalStudentInfo.find('#ranking');
    const $suspension = $modalStudentInfo.find('#suspension');
    const $transfer = $modalStudentInfo.find('#transfer');
    const $dropOut = $modalStudentInfo.find('#dropOut');

    const $saveBtn = $('#btn-studentInfo-save');
    const $uploadBtn = $('#student-list-upload-button');
    const $confirmedBtn = $('#student-list-confirmed-button');
    const $fileInput = $('#file-input');
    
    let confirmed_at = false;

    /**
     * bind event
     */
    $saveBtn.on('click', _handleSave);
    $uploadBtn.on('click', _uploadStudentList);
    $confirmedBtn.on('click', _handleConfirmed);
    $fileInput.on('change', _handleFileInput);

    /**
     * init
     */
    _setData();

    function _setData() {
        // 設定下載學生名冊按鈕事件
        $('#student-list-download-button').attr('href', env.baseUrl + '/editors/indonesia/create');

        loading.start();

        //取得資料渲染學生列表
        User.getStudentList().then(function (res) {
            if (res.ok) {
                // loading.start();
                return res.json();
            } else {
                throw res.status;
            }
        }).then(function (json) {
            // console.log(json);
            $studentAllList=json;
            $paginationContainer.pagination({
                dataSource: json,
                pageSize: 20,
                callback: function(json, pagination) {
                    _studentListTamplate(json,pagination.pageNumber);
                    $editStudentInfoBtn = $('.btn-editStudentInfo'); // 新增學生資料編輯按鈕的觸發事件（開啟 Modal）
                    $editStudentInfoBtn.on('click', _handleEditStudentInfo);
                }
            });
        }).then(function (){
            if(confirmed_at){
                $schoolYear.attr('disabled', true);
                $suspension.attr('disabled', true);
                $academicCredit.attr('disabled', true);
                $averageGrades.attr('disabled', true);
                $classPopulation.attr('disabled', true);
                $ranking.attr('disabled', true);
                $rankingOfPopulation.attr('disabled', true);
                $saveBtn.hide();
                $uploadBtn.attr('disabled', true);
                $confirmedBtn.attr('disabled', true).html(`<i class="fa fa-lock fa-fw" aria-hidden="true"></i>已確定並鎖定資料`).removeClass('btn-warning').addClass('btn-danger');
            }
            loading.complete();
        }).catch(function (err) {
            loading.complete();
            if (err == 401) {
                //alert("權限不足");
                window.location.href = './login.html';
            }
        });   
    }

    function _studentListTamplate(json,page){
        // 渲染 student 列表
        $studentList.html('');
        json.forEach(function (data, index) {
            let studentHtml =`<tr class="btn-editStudentInfo" data-overseasid="${data[1]}" data-name="${data[2]}"><td>${index+1+((page-1)*20)}</td>`;
            data.forEach(function (value, index) {
                if(index == 3 || index == 5 || index == 6 || index == 9){
                    
                } else {
                    studentHtml+=`<td>${(value)}</td>`
                }
            });
            confirmed_at = (data[9] !== '');
            studentHtml+=`</tr>`;
            $studentList.append(studentHtml);
        });
    }

    async function _handleEditStudentInfo() { // 學生列表 Modal 觸發
        $editStudentInfoModal.modal({backdrop: true, keyboard:true,}); // 讓使用者 點選外圍或按下esc時關閉Modal
        _currentOverseasId = $(this).data('overseasid');
        _currentName = $(this).data('name');

        User.getStudentInfo({'overseasId':_currentOverseasId, 'name':_currentName})
        .then((res) => {
            if(res.ok){
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json) => {
            $year.val(json[0]);
            $schoolName.val(json[3]);
            
            $name.val(json[2]);
            $overseasId.val(json[1]);

            $department.val(json[4]);

            $distributeDate.val(json[7]);
            $distributeNumber.val(json[8]);

            $confirmStatus.val(json[9]);
            $studentStatus.val(json[10]);

            $studentStatusReason.val(json[11]);

            $statusDate.val(json[12]);
            $registerDate.val(json[13]);

            $schoolYear.val(json[14]);
            $academicCredit.val(json[15]);
            $averageGrades.val(json[16]);
            $classPopulation.val(json[17]);
            $ranking.val(json[18]);
            $suspension.val(json[19]);
            $transfer.val(json[20]);
            $dropOut.val(json[21]);
        })
        .then(()=>{
            $editStudentInfoModal.modal({
                backdrop: 'static',
                keyboard: false
            });
        })
        .catch((err) => {
            err.json && err.json().then((data) => {
                console.error(data);
            })
        })
    }

    // 單一學生資料修改並儲存
    function _handleSave(){
        // 準備好要傳遞的資料
        let data;
        data = {
            'name':document.getElementById('name').value,
            'overseasId':document.getElementById('overseasId').value,
            'schoolYear':document.getElementById('schoolYear').value,
            'academicCredit':document.getElementById('academicCredit').value,
            'averageGrades':document.getElementById('averageGrades').value,
            'classPopulation':document.getElementById('classPopulation').value,
            'ranking':document.getElementById('ranking').value,
            'suspension':document.getElementById('suspension').value,
            'transfer':document.getElementById('transfer').value,
            'dropOut':document.getElementById('dropOut').value
        };
        
        // 使用者確認
        swal({
            title: '確認是否要儲存並覆蓋學生資料',
            html: `更動後資料：<br/>年級：${data.schoolYear}<br/>
            累計實得學分數：${data.academicCredit}<br/>
            學業成績總平均：${data.averageGrades}<br/>
            全班(組)人數：${data.classPopulation}<br/>
            名次：${data.ranking}<br/>
            入學後是否曾經休學：${data.suspension}<br/>
            入學後是否曾經轉系：${data.transfer}<br/>
            入學後是否退學：${data.dropOut}<br/>`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '儲存',
            cancelButtonText: '取消',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(()=>{
            _saveEvent(data)
        }).catch(()=>{
        });
    }

    // 發送欲修改資料跟請求到後端
    function _saveEvent(data){
        loading.start();
        User.saveStudentInfo(data)
        .then((res) => {
            if(res.ok){
                loading.complete();
                alert('儲存成功');
                return ;
            } else {
                throw res;
            }
        })
        .catch((err) => {
            loading.complete();
            err.json && err.json().then((json) => {
                alert('儲存失敗:'+json);
            })
        })
    }

    function _uploadStudentList(){
        $fileInput.trigger('click');
    }
    
    function _handleFileInput(){
        const file = this.files[0];
        $fileInput.val('');
        if (file.name.split('.').pop() !== 'csv') {
			alert('請匯入 .csv 檔');
        }

        // 需先讀成 binary string 以判斷編碼
		const fileReaderAsBinaryString = new FileReader();
		const fileReaderAsText = new FileReader();

		fileReaderAsBinaryString.onload = function (e) {
			// 偵測檔案編碼
			const encoding = window.jschardet.detect(e.target.result).encoding;
			// 使用偵測的編碼來讀取檔案成文字
			fileReaderAsText.readAsText(file, encoding);
		};

		fileReaderAsText.onload = function (e) {
			_renderCSVTable(e.target.result);
		};

		// 讀入檔案判斷編碼
		fileReaderAsBinaryString.readAsBinaryString(file);
    }

    function _renderCSVTable(data) {
		const csv_datas = window.User.CSVToArray(data);
		const header = csv_datas.shift();
        csv_datas.pop();
		const fieldLength = header.length;
		if (fieldLength !== 20) {
			alert ('匯入之 csv 欄位數量有誤');
			return;
		}
        loading.start();
        User.uploadStudentList(csv_datas)
        .then((res) => {
            if(res.ok){
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json)=>{
            alert(json);
            window.location.reload();
            loading.complete();
        })
        .catch((err) => {
            err.json && err.json().then((data) => {
                console.error(data);
                alert('匯入失敗:'+data)
            })
            loading.complete();
        });
    }

    function _handleConfirmed(){
        // 使用者確認
        swal({
            title: '確認是否要確定並鎖定學生資料',
            html: `鎖定後將無法進行任何的修改，請確定資料都已正確登記再鎖定。`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定',
            cancelButtonText: '取消',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(()=>{
            _confirmedEvent()
        }).catch(()=>{
        });
    }

    function _confirmedEvent(){
        loading.start();
        User.confirmedStudentInfo()
        .then((res) => {
            if(res.ok){
                loading.complete();
                alert('鎖定成功');
                window.location.reload();
                return ;
            } else {
                throw res;
            }
        })
        .catch((err) => {
            loading.complete();
            err.json && err.json().then((json) => {
                alert('鎖定失敗:'+json);
            })
        })        
    }
})();