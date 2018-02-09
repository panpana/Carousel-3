var Carousel = (function () {
    function Carousel($ct) {
        this.$ct = $ct;
        this.autoPlay();
        this.init();
        this.bind();

    }

    Carousel.prototype.init = function(){
        var $imgCt = this.$imgCt = this.$ct.find('.container');
        var $imgs = this.$imgs = this.$ct.find('.container > li');
        var $left = this.$left = this.$ct.find('.pre');
        var $right = this.$right = this.$ct.find('.next');
        var $bullets = this.$bullets = this.$ct.find('.page-btn > li');

        this.pageIndex = 0;
        this.isAnimate = false;
        this.imgCount = $imgs.length;
        this.imgWidth = $imgs.width();

        $imgCt.append($imgs.first().clone());
        $imgCt.prepend($imgs.last().clone());
        $imgCt.width((this.imgCount + 2) * this.imgWidth);
        $imgCt.css({left: -this.imgWidth})
    };

    Carousel.prototype.bind = function(){
        var _this = this;
        this.$left.on('click',function(){
            _this.playPre();
        });

        this.$right.on('click',function(){
            _this.playNext();
        });

        this.$bullets.on('click',function(){
            var index = $(this).index();
            _this.$imgCt.animate({
                left: -((index + 1) * _this.imgWidth)
            });
            _this.pageIndex = index;
            _this.setBullet();
        })
    };

    Carousel.prototype.playPre = function(){
        window.clearInterval(this.timeId);
        var _this = this;
        if(this.isAnimate) return;
        this.isAnimate = true;
        this.$imgCt.animate({
            left: '+=' + this.imgWidth
        },function(){
            _this.pageIndex--;
            if(_this.pageIndex === -1){
                _this.pageIndex = (_this.imgCount - 1);
                _this.$imgCt.css({left: -(_this.imgCount*_this.imgWidth)})
            }
            _this.setBullet();
            _this.isAnimate = false;
            _this.autoPlay();
        })
    };

    Carousel.prototype.playNext = function(){
        window.clearInterval(this.timeId);
        var _this = this;
        if(this.isAnimate) return;
        this.isAnimate = true;
        this.$imgCt.animate({
            left: '-=' + this.imgWidth
        },function(){
            _this.pageIndex++;
            if(_this.pageIndex === _this.imgCount){
                _this.pageIndex = 0;
                _this.$imgCt.css({left: -_this.imgWidth})
            }
            _this.setBullet();
            _this.isAnimate = false;
            _this.autoPlay();
        })
    };

    Carousel.prototype.setBullet = function(){
        this.$bullets.removeClass('active').eq(this.pageIndex).addClass('active')
    };
    Carousel.prototype.autoPlay = function(){
        var _this = this;
        this.timeId = setInterval(function () {
            _this.playNext(1);
        },3000);
    };

    return {
        init: function ($ct) {
            $ct.each(function (index, element) {
                new Carousel($(element));
            });
        }
    }
})();
Carousel.init($('.wrap'));