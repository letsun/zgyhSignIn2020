
var main = {};
var user = [];
var sign;
var vote;
var lottery;
var comment;
var commentSwiper;

var activityId = common.getUrlString("activityid");


(function ($) {
    main.init = function () {
        main.pageInit();

        comment.initComment();

        sign.getUser(5000);
        comment.getComment(3000);

        sign.signPhoto2();

        main.initEvent();
    };

    main.initEvent = function () {
        /**
         * 切换到签到页
         */
        $("#nav1").on("click", function () {
            commentSwiper.stopAutoplay();//停止评论播放

            sign.signPhoto2();
            $("#comment,.commentBtn,#vote,#lottery").hide();
            $("#sign").show();
        });

        /**
         * 切换到投票页
         */
        $("#nav2").on("click", function () {
            clearInterval(sign.timer.signTimer);//停止签到
            commentSwiper.stopAutoplay();//停止评论播放

            $("#sign,#comment,.commentBtn,#lottery").hide();
            $("#vote").show();
        });

        /**
         * 切换到抽奖页
         */
        $("#nav3").on("click", function () {
            clearInterval(sign.timer.signTimer);//停止签到
            commentSwiper.stopAutoplay();//停止评论播放

            $("#sign,#comment,#vote,.commentBtn").hide();
            $("#lottery").show();

            //如果是第一次进入抽奖页就复制用户列表，并打乱顺序
            if (lottery.firstInto) {
                main.user = user.clone();
                main.user.sort(function () {
                    return 0.5 - Math.random()
                });

                if (user.length > 0) {
                    lottery.firstInto = false;
                }
            }
        });

        /**
         * 切换到评论页
         */
        $("#nav4").on("click", function () {
            clearInterval(sign.timer.signTimer);//停止签到

            $("#sign,#lottery,#vote").hide();
            $("#comment,.commentBtn").show();

            commentSwiper.startAutoplay();//播放评论
        });

        vote.initEvent();
        lottery.initEvent();
        comment.initEvent();
    };

    /**
     * @desc 页面初始化，获取签到信息
     * @func main.signInit()
     */
    main.pageInit = function () {
        var url = common.cfg.pcInit + common.cfg.companyId + '/' + activityId;

        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            data: {
                ts: (new Date()).getTime()
            },
            jsonp: 'queryActivity',
            error: function () {
                common.alert({content: "页面初始化失败：网络错误", width: "240px"});
            },
            success: function (res) {
                if (res.status == "1") {
                    main.initVote(res);
                    main.initLottery(res);
                } else if (res.status = "-1") {
                    common.alert({content: "活动尚未开启，敬请期待", width: "240px"});
                } else if (res.status = "-2") {
                    common.alert({content: "不存在此活动信息", width: "240px"});
                } else {
                    common.alert({content: "页面初始化失败", width: "240px"});
                }
            }
        });
    };

    /**
     * @desc 添加投票的题目
     * @func main.initVote()
     * @param con {Object} 题目选项列表
     */
    main.initVote = function (con) {
        var html = "";
        var title = eval('('+con.activity+')').votename;
        var list = eval('('+con.listVote+')');

        for (var i = 0; i < list.length; i++) {
            html += '<div class="select-box"><div class="selectNum">' +
                '<div id="s' + list[i].id + '" class="length"><span>0</span></div></div><div class="selectName">' + list[i].level + list[i].name + '</div></div>';
        }

        $("#voteTitle").html(title);
        $("#voteSelect").html(html);
    };

    /**
     * @desc 添加奖项
     * @func main.initLottery()
     * @param con {Object} 题目选项列表
     */
    main.initLottery = function (con) {
        var isPrize = con.isPrize;

        //有奖项
        if (isPrize == "1") {
            var prizeList = eval('('+con.prizeList+')');
            var html = "";

            for (var i = 0; i < prizeList.length; i++) {
                html += '<option value="level' + i + '" data-name="' + prizeList[i].levelname + '">' + prizeList[i].levelname + '</option>';
            }

            $("#lottery2").show();
            $("#level").html(html);
        } else {
            $("#lottery1").show();
        }
    };
})(jQuery);
