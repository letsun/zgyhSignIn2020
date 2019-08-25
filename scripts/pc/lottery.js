(function ($) {

    lottery = {
        firstInto: true,
        userIndex: 0,
        timer: {
            lotteryTimer: 0
        }
    };

    lottery.initEvent = function () {
        /**
         * @desc 抽奖-无奖项
         */
        $("#lotteryStart1").on("click", function () {
            if (main.user.length == 0) {
                return;
            }

            var self = $(this);

            if (self.hasClass("stop")) {
                //抽奖停止
                lottery.lotteryStop1();
            } else {
                //抽奖开始
                lottery.lotteryStart1();
            }
        });

        /**
         * @desc 抽奖-有奖项
         */
        $("#lotteryStart2").on("click", function () {
            if (main.user.length == 0) {
                return;
            }
            var self = $(this);

            if (self.hasClass("stop")) {
                lottery.lotteryStop2();
            } else {
                lottery.lotteryStart2();
            }
        });

        /**
         * 重新抽奖-无奖项
         */
        $("#lotteryAgain1").on("click", function () {
            main.user = user.clone();
            main.user.sort(function () {
                return 0.5 - Math.random()
            });

            //清除获奖列表的数据
            $("#prizeWinner1").empty();
            $("#winnerNum").html(0);

            $(this).prop("disabled", true);
        });

        /**
         * 重新抽奖-有奖项
         */
        $("#lotteryAgain2").on("click", function () {
            main.user = user.clone();
            main.user.sort(function () {
                return 0.5 - Math.random()
            });

            //清除获奖列表的数据
            $("#prizeWinner2").empty();
            $("#winnerNum").html(0);

            $(this).prop("disabled", true);
        });
    };

    /**
     * @func main.lotteryStart();
     * @desc 开始抽奖头像滑动效果
     */
    lottery.rankUser = function () {
        var id = 1;
        $("#lotteryUser").empty();

        if (lottery.userIndex >= main.user.length) {
            lottery.userIndex = 0;
        }

        lottery.timer.lotteryTimer = setInterval(function () {
            $("#lotteryUser").append('<div id="lotUser' + id + '" class="lotUser photoMove"><img src="' + main.user[lottery.userIndex].photo + '">' +
                '<p>' + main.user[lottery.userIndex].name + '</p></div>');
            lottery.userIndex++;

            if (lottery.userIndex >= main.user.length) {
                lottery.userIndex = 0;
            }

            var ele = $("#lotUser" + id);
            id++;
            if (id == 20) {
                id = 1;
            }
            setTimeout(function () {
                ele.remove();
            }, 400);
        }, 100);
    };

    /**
     * @desc 抽奖停止选出中奖的用户展示
     * @func lottery.lotteryStop()
     * @returns winnerIndex {Number} 中奖用户在数组中的序号
     */
    lottery.getWinner = function () {
        var html = "";
        var winnerIndex;

        if (lottery.userIndex >= main.user.length) {
            lottery.userIndex = 0;
        }

        for (var j = 0; j < 6; j++) {
            html += '<div class="lotUser photoMove2" style="left:' + (-250 + 125 * j) + 'px"><img src="' + main.user[lottery.userIndex].photo + '">' +
                '<p>' + main.user[lottery.userIndex].name + '</p></div>';

            if (j == 3) {
                winnerIndex = lottery.userIndex;
            }

            lottery.userIndex++;
            if (lottery.userIndex >= main.user.length) {
                lottery.userIndex = 0;
            }
        }

        $("#lotteryUser").append(html);

        return winnerIndex;
    };

    /**
     * @func main.showWinner()
     * @desc 中奖提示，显示中奖的用户，两秒后消失
     * @param img {string} 用户头像链接
     */
    lottery.showWinner = function (img) {
        var box = $("#showWinner");
        box.find(".winnerUser").attr("src", img);

        box.show();
        box.find(".con").addClass("tada");

        setTimeout(function () {
            box.find(".con").removeClass("tada").addClass("zoomOut");
            setTimeout(function () {
                box.find(".con").removeClass("zoomOut");
                box.hide();
            }, 300)
        }, 2000)
    };

    /**
     * @desc 点击抽奖开始-无奖项
     * @func lottery.lotteryStart()
     */
    lottery.lotteryStart1 = function () {
        var btn = $("#lotteryStart1");
        btn.addClass("stop");
        btn.html("停止抽奖");

        lottery.rankUser();
    };

    /**
     * @desc 点击抽奖结束-有奖项
     * @func lottery.lotteryStop()
     */
    lottery.lotteryStop1 = function () {
        var btn = $("#lotteryStart1");

        btn.removeClass("stop");
        btn.html("开始抽奖");
        btn.prop("disabled", true);

        clearInterval(lottery.timer.lotteryTimer);
        var index = lottery.getWinner();//获取中奖的用户
        var userWinner = main.user[index];

        //抽奖结束，弹框，中奖者添加到右侧列表
        setTimeout(function () {
            btn.prop("disabled", false);
            $("#lotteryAgain1").prop("disabled", false); //接触禁用按钮

            //中奖弹框
            lottery.showWinner(userWinner.photo);

            //添加中奖者到列表
            $("#prizeWinner1").append('<div class="userList"><span class="userListNum">' + ($("#prizeWinner1").find(".userList").length + 1) + '</span>' +
                '<img class="userListImg" src="' + userWinner.photo + '">' +
                '<p class="userListName">' + userWinner.name + '</p>');

            $("#winnerNum").html($("#prizeWinner1").find(".userList").length);
        }, 1800);

        //在用户列表中删除已中奖的用户
        main.user.del(index);
    };

    /**
     * @desc 点击抽奖开始-有奖项
     * @func lottery.lotteryStart()
     */
    lottery.lotteryStart2 = function () {
        var btn = $("#lotteryStart2");
        btn.addClass("stop");
        btn.html("停止抽奖");

        lottery.rankUser();
    };

    /**
     * @desc 点击抽奖结束-有奖项
     * @func lottery.lotteryStop()
     */
    lottery.lotteryStop2 = function () {
        var btn = $("#lotteryStart2");

        btn.removeClass("stop");
        btn.html("开始抽奖");
        btn.prop("disabled", true);

        clearInterval(lottery.timer.lotteryTimer);
        var index = lottery.getWinner();//获取中奖的用户
        var userWinner = main.user[index];

        //抽奖结束，弹框，中奖者添加到右侧列表
        setTimeout(function () {
            btn.prop("disabled", false);
            $("#lotteryAgain2").prop("disabled", false); //接触禁用按钮

            lottery.showWinner(userWinner.photo);

            //添加用户到右侧列表
            var level = $("#level");
            var conId = level.val();
            var winnerCon = $(("#" + conId));
            var levelName = level.find("option:selected").data("name");

            if (!winnerCon[0]) {
                $("#prizeWinner2").append('<div id="' + conId + '"><div class="levelName">' + levelName + '：<span class="winnerNum"></span></div></div>');
            }

            winnerCon = $(("#" + conId));

            winnerCon.append('<div class="userList"><span class="userListNum">' + (winnerCon.find(".userList").length + 1) + '</span>' +
                '<img class="userListImg" src="' + userWinner.photo + '">' +
                '<p class="userListName">' + userWinner.name + '</p>');

            winnerCon.find(".winnerNum").html(winnerCon.find(".userList").length);
            $("#winnerNum").html($("#prizeWinner2").find(".userList").length);
        }, 1800);

        main.user.del(index);
    };
})(jQuery);