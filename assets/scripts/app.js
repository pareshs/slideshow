(function (global) {
    'use strict';

    var SlideShow = function (domId, d) {
        this.container = document.getElementById(domId);
        this.pictures = [];
        this.images = [];  //for caching
        this.currentPicture = 0;
        this.timer = null;
        this.delay = d * 1000;  //for configurable delay
        if (this.container === null) {
            throw {
                name: 'BadID',
                message: 'An element with the ID of "' + domId
                    + '" does not exist'
            };
        }
    };

    SlideShow.prototype.addPicture = function (pic) {
        this.pictures.push(pic);
    };

    SlideShow.prototype.addPictures = function (pics) {
        this.pictures = this.pictures.concat(pics);
    };

    SlideShow.prototype.play = function () {
        var that = this;

        this.render();
        this.timer = window.setInterval(function () {
            that.cycle();
        }, that.delay);     // for configurable delay
    };

    SlideShow.prototype.pause = function () {
        window.clearInterval(this.timer);
        this.timer = null;
    };

    SlideShow.prototype.isPlaying = function () {
        return this.timer !== null;
    };

    SlideShow.prototype.cycle = function () {
        if (this.currentPicture + 1 === this.pictures.length) {
            this.currentPicture = 0;
        } else {
            this.currentPicture += 1;
        }
        this.render();
    };
	SlideShow.prototype.recycle = function () {  // for reverse cycling
        if (this.currentPicture === 0) {
            this.currentPicture = this.pictures.length - 1;
        } else {
            this.currentPicture -= 1;
        }
        this.render();
    };
	SlideShow.prototype.cache = function () {   //for caching
	    var ii;
	    for (ii = 0; ii < this.pictures.length; ii += 1) {
			this.images[ii] = new Image();
			this.images[ii].src = this.pictures[ii].src;
			this.images[ii].alt = this.pictures[ii].caption;
		}
	};

    SlideShow.prototype.render = function () {
        var html = '',
		    currentPic = this.pictures[this.currentPicture];

        html = '<div id=pictureFrame>';
		//removed for caching
        //  html += '<img src=' + currentPic.src + ' alt="' + currentPic.caption + '">';
        if (currentPic.caption !== undefined) {
            html += '<div id=pictureCaption>' + currentPic.caption + '</div>';
        }
        html += '</div>';

        this.container.innerHTML = html;
		//implemented for caching
	    document.getElementById("pictureFrame").insertBefore(this.images[this.currentPicture], document.getElementById("pictureFrame").firstChild);
    };

    global.SlideShow = SlideShow;
}(window || this));
