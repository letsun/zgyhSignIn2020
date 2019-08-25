/**
 * Created by qiu on 2016/9/21.
 */
(function ($) {
    comment = {
        currentComment: 0,
        lastCommentTime: "2016-01-01 11:11:11",
        timer: {
            getComment: 0
        }
    };

    comment.initComment = function () {
        commentSwiper = new Swiper('#commentCon', {
            direction: 'vertical',
            slidesPerView: 4,
            spaceBetween: 10,
            simulateTouch: false,
            autoplay: 2000,
            autoplayDisableOnInteraction: false,
            autoplayStopOnLast: true,
            width: 700,
            height: 410,
            onAutoplayStart: function () {
                $("#stop").removeClass("stop");
            },
            onAutoplayStop: function () {
                $("#stop").addClass("stop");
            }
        });

        commentSwiper.stopAutoplay();
    };

    comment.initEvent = function () {
        /**
         * @desc 评论暂停和播放
         */
        $("#stop").on("click", function () {
            if ($(this).hasClass("stop")) {
                //播放
                commentSwiper.startAutoplay();
            } else {
                //暂停
                commentSwiper.stopAutoplay();
            }
        });

        /**
         * @desc 评论翻上一页
         */
        $("#prev").on("click", function () {
            commentSwiper.slidePrev();
        });

        /**
         * @desc 评论翻下一页
         */
        $("#next").on("click", function () {
            commentSwiper.slideNext();
        });
    };

    /**
     * @func main.getComment()
     * @desc 获取评论，添加到数组
     * @param time {number} 时间间隔
     */
    comment.getComment = function (time) {
        clearInterval(comment.timer.getComment);
        comment.timer.getComment = setInterval(function () {
            var url = common.cfg.getComment + common.cfg.companyId + '/' + activityId;

            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'jsonp',
                data: {
                    lastedittime: comment.lastCommentTime,
                    ts: (new Date()).getTime()
                },
                jsonp: 'getlistCommentRecord',
                error: function (XmlHttpRequest,textStatus,errorThrown) {
                    //common.alert({content: "获取评论失败：网络错误", width: "240px"});
                    //clearInterval(data.timer.getComment);
                },
                success: function (res) {
                    if (res.status == "0") {
                        /*clearInterval(data.timer.getComment);
                        common.alert({content: "获取评论失败", width: "240px"});
                        return;*/
                    }
                    if (res.status == "-1") {
                        clearInterval(data.timer.getComment);
                        common.alert({content: "活动尚未开启", width: "240px"});
                        return;
                    }
                    if (res.status == "-2") {
                        clearInterval(data.timer.getComment);
                        common.alert({content: "不存在此签到活动信息", width: "240px"});
                        return;
                    }
                    if (res.status == "1") {
                        comment.lastCommentTime = res.lasttime;

                        var list = eval('(' + res.listfans + ')');
                        console.log(res);
                        for (var i = 0; i < list.length; i++) {
                            //将评论添加到页面
                            comment.appendComment({
                                name: list[i].nickname,
                                photo: list[i].photourl,
                                content: list[i].remark
                            });
                        }
                    }
                }
            });
        }, time);
    };

    /**
     * @func main.appendComment()
     * @desc 添加评论到页面
     * @param con {object} 用户评论
     */
    comment.appendComment = function (con) {
        commentSwiper.appendSlide('<div class="swiper-slide"><img class="userImg" src="' + con.photo + '">' +
            '<div class="userName">' + con.name + '</div><p>' + con.content + '</p></div>');

        commentSwiper.startAutoplay();
    };
})(jQuery);