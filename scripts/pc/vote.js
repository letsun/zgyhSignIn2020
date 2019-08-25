
(function ($) {
    "use strict";

    vote = {
        timer: {
            voteTimer: 0
        }
    };

    vote.initEvent = function () {
        /**
         * 投票开启和关闭
         */
        $("#voteBtn").on("click", function () {
            if ($(this).hasClass("stop")) {
                //停止投票
                vote.set(0);

                $(this).removeClass("stop");
                $(this).html("开始投票");

                clearInterval(vote.timer.voteTimer);
            } else {
                //开始投票
                vote.set(1);

                $(this).addClass("stop");
                $(this).html("关闭投票");

                vote.getNum(2000);
            }
        });
    };

    /**
     * @func main.vote()
     * @param time
     */
    vote.getNum = function (time) {
        clearInterval(vote.timer.voteTimer);

        vote.timer.voteTimer = setInterval(function () {
            //clearInterval(vote.timer.voteTimer);
            var url = common.cfg.getVoteNum + common.cfg.companyId + "/" + activityId;
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'jsonp',
                data: {
                    ts: (new Date()).getTime()
                },
                jsonp: 'getlistVoteRecord',
                error: function () {
                    common.alert({content: "获取投票失败：网络错误"});
                    clearInterval(vote.timer.voteTimer);
                },
                success: function (res) {
                    if (res.status == "1") {
                        var list = eval('('+res.voteList+')');
                        var total = 0;

                        for (var i = 0; i < list.length; i++) {
                            total = total + list[i].num;
                        }

                        for (var j = 0; j < list.length; j++) {
                            $("#s" + list[j].id).css("height", parseInt(list[j].num) / total * 100 + "%").find("span").html(list[j].num);//设置柱形图宽度
                        }

                        //clearInterval(vote.timer.voteTimer);
                    } else if (res.status == "-1") {
                        common.alert({content: "活动尚未开启，敬请期待"});
                        clearInterval(vote.timer.voteTimer);
                    } else if (res.status == "-2") {
                        common.alert({content: "不存在此签到活动信息"});
                        clearInterval(vote.timer.voteTimer);
                    }
                }
            });
        }, time)
    };

    /**
     * @desc 投票关闭或开启
     * @func vote.set()
     * @param flag
     */
    vote.set = function (flag) {
        var url = common.cfg.setVote + common.cfg.companyId + "/" + activityId + "/" + flag;

        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            data: {
                ts: (new Date()).getTime()
            },
            jsonp: 'setVoteOpend',
            error: function () {
                common.alert({content: "设置状态失败：网络错误"});
            },
            success: function (res) {
                if (res.status == "0") {
                    common.alert({content: "设置状态失败"});
                }
                if (res.status == "-1") {
                    common.alert({content: "活动尚未开启，敬请期待"});
                }
                if (res.status == "-2") {
                    common.alert({content: "不存在此签到活动信息"});
                }
            }
        });
    };
})(jQuery);