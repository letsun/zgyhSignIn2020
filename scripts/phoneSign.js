var main = {};

var option = '';

var _tmp = true;
var activityList2;
var flag = 0;

(function ($) {
    "use strict";

    var signMark = true;

    main.init = function () {
        main.getRound();
        main.initEvent();
        $("#userImg1").attr("src", common.photo);
    };

    main.initEvent = function () {
        /**
         * @desc 选择场次
         */
        $("#selectRound").on("click", function () {
            main.activityId = $("#session").val();
            if (main.activityId == "") {
                common.alert({content: "请选择场次"});
                return;
            }

            $("#selectSign").hide();
            $("#signCon").show();
        });


        /**
         * @desc 提交签到信息
         */

        $(".submitSign").on("click", function() {
            main.submitMes();
        });
    };

    /**
     * @desc 获取场次列表
     * @func main.getRound()
     */
    main.getRound = function () {
        var url = common.cfg.getRound + common.cfg.companyId + "/" + common.fansid + "/" + common.opid + "/" + common.mytoken;

        $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            jsonp: "getAllActivity",
            data: {},
            success: function (res) {
                if (res.status == "1") {

                    //0开启了多个活动
                    if (res.activityid == "0") {
                        var activityList = eval('(' + res.activityList + ')');

                        var html = "";
                        for (var i = 0; i < activityList.length; i++) {
                            html += '<option value="' + activityList[i].id + '">' + activityList[i].name + '</option>';
                        }

                        $("#session").append(html);

                        $("#selectSign").show();
                    } else {
                        //只有一个活动
                        $("#signCon").show();
                        main.activityId = res.activityid;

                        activityList2 = eval('(' + res.activityList + ')');
                        if(activityList2[0].voteopend == 1) {
                            //获取投票题目
                            main.getVote();
                        }

                    }

                } else if (res.status == "-1") {
                    //活动未开启
                    $("#selectSign").hide();
                    $("#closed").show();
                } else {
                    common.alert({content: "获取场次失败"});
                }
            },
            error: function () {
                common.alert({content: "获取场次失败：网络错误"});
            }
        });
    };

    /**
     * @desc 提交用户信息
     * @func main.submitMes()
     */
    main.submitMes = function () {
        var reg = /^1[0-9]{10}$/;
        var reg2 = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var reg3 = /.*@.*/;
        var name = $('#name').val();
        var gender = $('#gender').val();
        var idNum = $('#idNum').val();
        var education = $('#education option:selected').text();
        var school = $('#school').val();
        var profession = $('#profession').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var advocacySchool = $('#advocacySchool option:selected').text();

        if ($.trim(name) == "") {
            common.alert({
                mask: true,
                content: "请输入您的姓名"
            });
            return;
        }

        if ($.trim(gender) == "") {
            common.alert({
                mask: true,
                content: "请选择性别"
            });
            return;
        }

        if ($.trim(idNum) == "") {
            common.alert({
                mask: true,
                content: "请填写18位身份证号码"
            });
            return;
        }

        if (!reg2.test(idNum)) {
            common.alert({
                mask: true,
                content: "身份证号码格式不正确"
            });
            return;
        }

        if ($.trim(education) == "请选择学历") {
            common.alert({
                mask: true,
                content: "请选择学历"
            });
            return;
        }

        if ($.trim(school) == "") {
            common.alert({
                mask: true,
                content: "请填写学校名称"
            });
            return;
        }

        if ($.trim(profession) == "") {
            common.alert({
                mask: true,
                content: "请填写专业名称"
            });
            return;
        }

        if ($.trim(phone) == "") {
            common.alert({
                mask: true,
                content: "请填写手机号码"
            });
            return;
        }

        if (!reg.test(phone)) {
            common.alert({
                mask: true,
                content: "手机号码格式不正确"
            });
            return;
        }

        if ($.trim(email) == "") {
            common.alert({
                mask: true,
                content: "请填写您的邮箱"
            });
            return;
        }

        if (!reg3.test(email)) {
            common.alert({
                mask: true,
                content: "邮箱格式不正确"
            });
            return;
        }

        if ($.trim(advocacySchool) == "请选择参加宣讲的学校") {
            common.alert({
                mask: true,
                content: "请选择参加宣讲的学校"
            });
            return;
        }

        var url = common.cfg.submitMes + common.cfg.companyId;

        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            data: {
                candidate: name,
                sex: gender,
                idnumber: idNum,
                education: education,
                school: school,
                specialty: profession,
                mobile: phone,
                email: email,
                content: advocacySchool,
                ts: (new Date()).getTime()
            },
            jsonp: 'submitDataback',
            error: function () {
                common.alert({
                    mask: true,
                    content: "提交失败：网络错误"
                });
            },
            success: function (data) {
                if (data.status == "1") {
                    main.sign();
                } else {
                    common.alert({
                        mask: true,
                        content: "您已经签到过",
                    });
                }

            }
        });
    };

    /**
     * @desc 签到
     * @func main.sign()
     */
    main.sign = function () {
        var url = common.cfg.signUrl + common.cfg.companyId + "/" + common.fansid + "/" + main.activityId;

        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            data: {
                ts: (new Date()).getTime()
            },
            jsonp: 'submitCheckin',
            error: function () {
                common.alert({content: "签到失败：网络错误", ok: callback});
            },
            success: function (data) {
                if (data.status == "1") {
                    common.alert({
                        mask: true,
                        content: "签到成功",
                    });
                }

                else if (data.status == "-3") {
                    common.alert({
                        mask: true,
                        content: "您已经签到过",
                    });
                }

                else if (data.status == "-1") {
                    common.alert({
                        mask: true,
                        content: "活动尚未开启，敬请期待",
                    });
                }

                else {
                    common.alert({
                        mask: true,
                        content: "签到失败",
                    });
                }
            }
        });
    };

})(jQuery);

$(function () {

    // 输入框失去焦点兼容苹果系统
    $('input,textarea,select').on('blur',function(){
        setTimeout(function () {
            var hasFocus = $('input').is(':focus') || $('textarea').is(':focus') || $('select').is(':focus');
            if (!hasFocus) {
                window.scroll(0,0);
            }
        },100);
    });

    // 点击切换选项
    $('.select-item').on('click',function () {
        option = $(this).find('.select-text').html();
        $(this).addClass('active').siblings('.select-item').removeClass('active');
    });

    // 提交选项
    $('#submitOption').on('click',function () {
        if (option == '') {
            common.alert({
                mask: true,
                content: '请选择选项'
            });
            return false;
        } else {
            $('#questionnaire-win').fadeOut();
        }
    });

    // 下拉框获取焦点
    $('select').change(function () {
        $(this).addClass('active');
    });


    // 点击签到按钮
    $('#signBtn').on('click',function () {
        $('#sign').fadeIn();
    })
});