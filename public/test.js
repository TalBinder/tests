var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
/**
 * Created by Tal on 12 May,2016.
 */
var ShareType;
(function (ShareType) {
    ShareType[ShareType["Message"] = 0] = "Message";
    ShareType[ShareType["Image"] = 1] = "Image";
    ShareType[ShareType["Highlight"] = 2] = "Highlight";
})(ShareType || (ShareType = {}));
var BaseShare = (function () {
    function BaseShare() {
    }
    BaseShare.prototype.getUrlAndMessage = function () {
        return [window.location.href, "My Message"];
    };
    ;
    BaseShare.prototype.getCombinedUrlAndMessage = function () {
        var urlAndMessage = this.getUrlAndMessage();
        return urlAndMessage[0] + "\n" + urlAndMessage[1];
    };
    ;
    BaseShare.prototype.share = function (type) {
        switch (type) {
            case ShareType.Message:
                this.shareMessage();
                break;
            case ShareType.Image:
                this.shareImage();
                break;
            case ShareType.Highlight:
                console.log('Not supported');
                break;
            default:
                console.log('Share type not found.');
                break;
        }
    };
    return BaseShare;
}());
;
/**
 * Created by Tal on 13 May,2016.
 */
/// <reference path="../BaseShare.ts"/>
var EmailShare = (function (_super) {
    __extends(EmailShare, _super);
    function EmailShare() {
        _super.apply(this, arguments);
    }
    EmailShare.prototype.shareMessage = function () {
        var urlAndMessage = this.getUrlAndMessage();
        location.href = "mailto:?subject=" + encodeURIComponent(urlAndMessage[1]) + "&body=" + encodeURIComponent(urlAndMessage[0]);
    };
    EmailShare.prototype.shareImage = function () {
    };
    return EmailShare;
}(BaseShare));
;
/**
 * Created by Tal on 13 May,2016.
 */
/// <reference path="../BaseShare.ts"/>
var FacebookShare = (function (_super) {
    __extends(FacebookShare, _super);
    function FacebookShare() {
        _super.apply(this, arguments);
    }
    FacebookShare.prototype.shareMessage = function () {
    };
    ;
    FacebookShare.prototype.addMetaToHead = function (property, content) {
        var element = document.createElement("meta");
        element.setAttribute("property", property);
        element.setAttribute("content", content);
        document.head.appendChild(element);
    };
    ;
    FacebookShare.prototype.shareImage = function () {
        this.addMetaToHead("og:url", "http://getlemmeno.com/MichalTest");
        this.addMetaToHead("og:type", "article");
        this.addMetaToHead("og:title", "Binder Done That");
        this.addMetaToHead("og:description", "Binder Done That - Share");
        this.addMetaToHead("og:site_name", "Lemmeno Share");
        this.addMetaToHead("og:image", "http://i.imgur.com/dNsGzEC.png");
    };
    return FacebookShare;
}(BaseShare));
;
/**
 * Created by Tal on 13 May,2016.
 */
/// <reference path="../BaseShare.ts"/>
var SmsShare = (function (_super) {
    __extends(SmsShare, _super);
    function SmsShare() {
        _super.apply(this, arguments);
    }
    SmsShare.prototype.shareMessage = function () {
        location.href = "sms:?body=" + encodeURIComponent(this.getCombinedUrlAndMessage());
    };
    ;
    SmsShare.prototype.shareImage = function () {
    };
    ;
    return SmsShare;
}(BaseShare));
;
/**
 * Created by Tal on 13 May,2016.
 */
/// <reference path="../BaseShare.ts"/>
var TwitterShare = (function (_super) {
    __extends(TwitterShare, _super);
    function TwitterShare() {
        _super.apply(this, arguments);
    }
    TwitterShare.prototype.shareMessage = function () {
        location.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(this.getCombinedUrlAndMessage());
    };
    ;
    TwitterShare.prototype.shareImage = function () {
    };
    ;
    return TwitterShare;
}(BaseShare));
;
/**
 * Created by Tal on 13 May,2016.
 */
/// <reference path="../BaseShare.ts"/>
var WhatsAppShare = (function (_super) {
    __extends(WhatsAppShare, _super);
    function WhatsAppShare() {
        _super.apply(this, arguments);
    }
    WhatsAppShare.prototype.shareMessage = function () {
        location.href = "whatsapp://send?text=" + encodeURIComponent(this.getCombinedUrlAndMessage());
    };
    WhatsAppShare.prototype.shareImage = function () {
    };
    return WhatsAppShare;
}(BaseShare));
;
/**
 * Created by Tal on 13 May,2016.
 */
/// <reference path="../BaseShare.ts"/>
var FacebookMessengerShare = (function (_super) {
    __extends(FacebookMessengerShare, _super);
    function FacebookMessengerShare() {
        _super.apply(this, arguments);
    }
    FacebookMessengerShare.prototype.shareMessage = function () {
    };
    ;
    FacebookMessengerShare.prototype.shareImage = function () {
    };
    ;
    return FacebookMessengerShare;
}(BaseShare));
;
/**
 * Created by Tal on 13 May,2016.
 */
/// <reference path="./BaseShare.ts" />
/// <reference path="platforms/EmailShare.ts"/>
/// <reference path="platforms/FacebookShare.ts"/>
/// <reference path="platforms/SmsShare.ts"/>
/// <reference path="platforms/TwitterShare.ts"/>
/// <reference path="platforms/WhatsAppShare.ts"/>
/// <reference path="platforms/FacebookMessengerShare.ts"/>
var ShareFactory = (function () {
    function ShareFactory() {
    }
    ShareFactory.share = function (platform, type) {
        var shareObject;
        switch (platform.toLowerCase()) {
            case 'email':
                shareObject = new EmailShare();
                break;
            case 'facebook':
                shareObject = new FacebookShare();
                break;
            case 'sms':
                shareObject = new SmsShare();
                break;
            case 'twitter':
                shareObject = new TwitterShare();
                break;
            case 'whatsapp':
                shareObject = new WhatsAppShare();
                break;
            case 'facebook_messenger':
                shareObject = new FacebookMessengerShare();
                break;
            default:
                console.log('Sharing platform is not supported');
                break;
        }
        if (shareObject) {
            shareObject.share(type);
        }
    };
    return ShareFactory;
}());
;
/**
 * Created by Tal on 13 May,2016.
 */
/// <reference path="ShareFactory.ts"/>
ShareFactory.share('Facebook', ShareType.Image);
