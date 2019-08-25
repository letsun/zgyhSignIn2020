(function () {
    "use strict";

    var ani = ["bounceIn", "zoomIn", "bounceInRight", "flipInX", "lightSpeedIn", "rotateInDownRight", "rollIn", "zoomInDown", "flipInY", "fadeInLeft"];
    var cani = ani[Math.floor(Math.random() * 10)];

    sign = {
        currentUser: 0,
        lastUserId: 0,
        timer: {
            signTimer: 0,
            getUser: 0
        },
        position: [
            {y: "80px", x: "295px"},
            {y: "70px", x: "308px"},
            {y: "90px", x: "304px"},
            {y: "88px", x: "280px"},
            {y: "97px", x: "265px"},
            {y: "105px", x: "293px"},
            {y: "108px", x: "250px"},
            {y: "109px", x: "271px"},
            {y: "125px", x: "287px"},
            {y: "123px", x: "240px"},
            {y: "124px", x: "260px"},
            {y: "134px", x: "275px"},
            {y: "147px", x: "279px"},
            {y: "140px", x: "240px"},
            {y: "147px", x: "257px"},
            {y: "160px", x: "274px"},
            {y: "154px", x: "242px"},
            {y: "170px", x: "245px"},
            {y: "165px", x: "259px"},
            {y: "186px", x: "244px"},
            {y: "183px", x: "262px"},
            {y: "172px", x: "277px"},
            {y: "205px", x: "254px"},
            {y: "193px", x: "270px"},
            {y: "224px", x: "257px"},
            {y: "214px", x: "267px"},
            {y: "236px", x: "263px"},
            {y: "259px", x: "266px"},
            {y: "143px", x: "218px"},
            {y: "161px", x: "214px"},
            {y: "178px", x: "210px"},
            {y: "180px", x: "223px"},
            {y: "200px", x: "210px"},
            {y: "200px", x: "225px"},
            {y: "222px", x: "218px"},
            {y: "219px", x: "234px"},
            {y: "237px", x: "236px"},
            {y: "252px", x: "245px"},
            {y: "270px", x: "254px"},
            {y: "254px", x: "228px"},
            {y: "265px", x: "242px"},
            {y: "281px", x: "251px"},
            {y: "298px", x: "263px"},
            {y: "304px", x: "278px"},
            {y: "274px", x: "286px"},
            {y: "290px", x: "290px"},
            {y: "313px", x: "293px"},
            {y: "262px", x: "305px"},
            {y: "283px", x: "305px"},
            {y: "301px", x: "308px"},
            {y: "324px", x: "312px"},
            {y: "275px", x: "325px"},
            {y: "295px", x: "325px"},
            {y: "322px", x: "325px"},
            {y: "308px", x: "335px"},
            {y: "270px", x: "343px"},
            {y: "288px", x: "343px"},
            {y: "325px", x: "345px"},
            {y: "305px", x: "354px"},
            {y: "269px", x: "361px"},
            {y: "285px", x: "365px"},
            {y: "320px", x: "365px"},
            {y: "300px", x: "374px"},
            {y: "315px", x: "384px"},
            {y: "278px", x: "383px"},
            {y: "307px", x: "399px"},
            {y: "290px", x: "400px"},
            {y: "267px", x: "400px"},
            {y: "251px", x: "410px"},
            {y: "295px", x: "414px"},
            {y: "272px", x: "417px"},
            {y: "279px", x: "432px"},
            {y: "230px", x: "415px"},
            {y: "262px", x: "443px"},
            {y: "253px", x: "426px"},
            {y: "243px", x: "449px"},
            {y: "213px", x: "415px"},
            {y: "232px", x: "434px"},
            {y: "224px", x: "454px"},
            {y: "213px", x: "435px"},
            {y: "192px", x: "411px"},
            {y: "174px", x: "401px"},
            {y: "203px", x: "455px"},
            {y: "182px", x: "450px"},
            {y: "193px", x: "433px"},
            {y: "171px", x: "421px"},
            {y: "168px", x: "436px"},
            {y: "162px", x: "384px"},
            {y: "151px", x: "425px"},
            {y: "154px", x: "407px"},
            {y: "165px", x: "367px"},
            {y: "146px", x: "390px"},
            {y: "152px", x: "370px"},
            {y: "163px", x: "349px"},
            {y: "174px", x: "337px"},
            {y: "188px", x: "325px"},
            {y: "203px", x: "316px"},
            {y: "225px", x: "325px"},
            {y: "220px", x: "310px"},
            {y: "238px", x: "317px"},
            {y: "238px", x: "336px"},
            {y: "155px", x: "315px"},
            {y: "135px", x: "325px"},
            {y: "116px", x: "330px"},
            {y: "100px", x: "344px"},
            {y: "130px", x: "342px"},
            {y: "114px", x: "354px"},
            {y: "91px", x: "364px"},
            {y: "126px", x: "362px"},
            {y: "108px", x: "375px"},
            {y: "89px", x: "385px"},
            {y: "119px", x: "382px"},
            {y: "114px", x: "402px"},
            {y: "100px", x: "398px"},
            {y: "80px", x: "404px"},
            {y: "79px", x: "424px"},
            {y: "96px", x: "420px"},
            {y: "111px", x: "419px"},
            {y: "73px", x: "443px"},
            {y: "91px", x: "441px"},
            {y: "106px", x: "436px"},
            {y: "62px", x: "463px"},
            {y: "85px", x: "463px"},
            {y: "98px", x: "453px"},
            {y: "53px", x: "477px"},
            {y: "71px", x: "475px"},
            {y: "42px", x: "488px"},
            {y: "284px", x: "482px"},
            {y: "296px", x: "476px"},
            {y: "292px", x: "492px"},
            {y: "314px", x: "480px"},
            {y: "328px", x: "490px"},
            {y: "252px", x: "517px"},
            {y: "272px", x: "518px"},
            {y: "293px", x: "520px"},
            {y: "311px", x: "520px"},
            {y: "328px", x: "520px"},
            {y: "291px", x: "543px"},
            {y: "304px", x: "551px"},
            {y: "325px", x: "552px"}
        ],
        currentPosition: 0
    };

    /**
     * @func main.getComment()
     * @desc 获取用户，添加到数组
     * @param time {number} 时间间隔
     */
    sign.getUser = function (time) {
        clearInterval(sign.timer.getUser);
        sign.timer.getUser = setInterval(function () {
            var url = common.cfg.getUser + common.cfg.companyId + '/' + activityId + '/' + sign.lastUserId;

            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'jsonp',
                data: {
                    ts: (new Date()).getTime()
                },
                jsonp: 'getlistRecord',
                error: function () {
                    /*common.alert({content: "获取用户失败：网络错误", width: "240px"});
                    clearInterval(sign.timer.getUser);*/
                },
                success: function (res) {
                    if (res.status == "0") {
                        /*clearInterval(sign.timer.getUser);
                        common.alert({content: "获取用户失败", width: "240px"});
                        return;*/
                    }
                    if (res.status == "-1") {
                        clearInterval(sign.timer.getUser);
                        common.alert({content: "活动尚未开启", width: "240px"});
                        return;
                    }
                    if (res.status == "-2") {
                        clearInterval(sign.timer.getUser);
                        common.alert({content: "不存在此签到活动信息", width: "240px"});
                        return;
                    }
                    if (res.status == "1") {
                        sign.lastUserId = res.lastid;

                        var list = eval('('+res.listfans+')');

                        for (var i = 0; i < list.length; i++) {
                            user.push({name: list[i].nickname, photo: list[i].photourl});

                            if(!lottery.firstInto){
                                main.user.push({name: list[i].nickname, photo: list[i].photourl});
                                main.user.sort(function () {
                                    return 0.5 - Math.random()
                                });
                            }

                            $("#hidden").append('<img src="' + list[i].photourl + '">');
                        }

                        //更新签到人数
                        $("#signNum").find("span").html(user.length);
                    }
                }
            });
        }, time);
    };

    /**
     * @func main.signPhoto()
     * @desc 每隔一段时间添加一个头像
     */
    sign.signPhoto = function () {
        sign.signAll();

        sign.timer.signTimer = setInterval(function () {

            /*添加头像和昵称*/
            if (sign.currentUser < user.length) {
                //头像出现
                sign.appendPhoto(user[sign.currentUser].photo, user[sign.currentUser].name);

                var photo = $("#photoShow" + sign.currentUser);
                var name = $("#name" + sign.currentUser);

                /*将头像上墙*/
                sign.setPhoto(photo, name);

                sign.currentUser++;
            }
        }, 2500);
    };

    /**
     * @desc 将用户添加到签到墙
     * @func main.signPhoto2()
     */
    sign.signPhoto2 = function () {
        clearInterval(sign.timer.signTimer);

        for (var i = sign.currentUser; i < user.length; i++) {
            $("#userList").prepend('<li><img src="' + user[i].photo + '"></li>');
            sign.currentUser++;
        }

        sign.timer.signTimer = setInterval(function () {
            if (user.length > sign.currentUser) {
                var cani = ani[Math.floor(Math.random() * 10)];

                $("#userList").prepend('<li id="user' + sign.currentUser + '" style="position: absolute;width: 150px;height: 150px;top: 115px;left: 324px;' +
                    '-webkit-animation:' + cani + ' 1s;"><img src="' + user[sign.currentUser].photo + '"><div class="user">' + user[sign.currentUser].name + '</div></li>');

                var cur = sign.currentUser;
                setTimeout(function () {
                    $(".user").remove();
                    $("#user" + cur).css({"top": "40px", "left": "50px", "width": "72px", height: "72px"});

                    setTimeout(function () {
                        $("#user" + cur).css("position", "static");
                    }, 500);
                }, 1500);
                sign.currentUser++;
            }
        }, 2500);
    };

    /**
     * @desc 添加所有已签到的头像
     * @func sign.signAll()
     */
    sign.signAll = function () {
        for (var i = sign.currentUser; i < user.length; i++) {
            $("#sign").append('<img id="photoShow' + sign.currentUser + '" class="photoShow" style="left:' + sign.position[sign.currentPosition].x + ';' +
                'top:' + sign.position[sign.currentPosition].y + ';z-index: 2" src="' + user[sign.currentUser].photo + '">');
            sign.currentUser++;
            sign.currentPosition++;
            if (sign.currentPosition >= sign.position.length) {
                sign.currentPosition = 0;
            }
        }
    };

    /**
     * @func appendPhoto()
     * @desc 将用户头像和昵称添加到页面
     * @param src {string} 头像路径
     * @param name {string} 昵称
     */
    sign.appendPhoto = function (src, name) {
        $("#sign").append('<img id="photoShow' + sign.currentUser + '" class="photoShow '+ cani +'" style="animation-duration: 2s" src="' + src + '">' +
            '<div id="name' + sign.currentUser + '" class="name zoomInLeft" style="animation-duration: 2s">' + name + '</div>');
    };

    /**
     * @func setPhoto()
     * @desc 将头像和昵称签到上墙
     * @param photo
     * @param name
     */
    sign.setPhoto = function (photo, name) {
        setTimeout(function () {
            photo.css({left: sign.position[sign.currentPosition].x, top: sign.position[sign.currentPosition].y}); //移动头像
            name.removeClass("zoomInLeft").addClass("rollOut").css("animation-duration", "0.5s"); //移动昵称

            sign.currentPosition++;
            if (sign.currentPosition >= sign.position.length) {
                sign.currentPosition = 0;
            }

            setTimeout(function () {
                photo.css("z-index", 2);
            }, 150);

            setTimeout(function () {
                name.remove();
            }, 500);
        }, 2500);
    };
})(jQuery);