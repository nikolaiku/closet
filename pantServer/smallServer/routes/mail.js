var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var URL = require('url');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/postmail', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  var mailObj = {
    email: req.body.email,
    nickname: req.body.nickname,
    title: req.body.title,
    link: req.body.link,
  }

  var response = {
    errno: '',
    data: mailObj,
    message: '',
  }

  const params = {
    host: 'smtp.163.com',
    post: 465,
    secure: true,
    auth: {
      user: 'huohua_plus@163.com',
      pass: '123qwe'
    }
  };

  const mailOptions = {
    from: 'huohua_plus@163.com', // sender address
    to: mailObj.email, // list of receivers
    subject: '钬花教育社区方案包下载--【' + mailObj.title + '】', // Subject line
    html: '<div>' + mailObj.nickname + '，您好，</div><br>' +
      '<div>感谢使用钬花教育社区app，您在app内查看并下载了一个方案包，点击下方链接，下载观看该文档，链接有效期为72小时，请尽快下载。</div>' +
      '<div>【' + mailObj.link + '】</div>' +
      '<div>(如无法点击请复制链接到浏览器下载查看，下载后若出现文档乱码情况请使用Google浏览器下载查看）</div><br>' +
      '<div>如有疑问请在app内#钬花吐槽建议#讨论组发帖反馈，或添加客服小钬花儿001号（微信号：huohua_edu）。</div><br><br>' +
      '<div>请勿回复该邮件</div><br><br>' +
      '<div>谢谢您的支持！</div><br><br>' +
      '<div> 钬花教育社区</div>',
    attachments: [{
      filename: mailObj.title,
      path: mailObj.link,
    }]
  }

  var transporter = nodemailer.createTransport(params);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('*******>', error);
      response.errno = 99989;
      response.message = '发送邮件失败！';
      res.send(JSON.stringify(response));
    } else {
      console.log('Message sent: ' + info.response);
      response.errno = 0;
      response.message = '发送邮件成功！';
      res.send(JSON.stringify(response));
    }
  });

})

router.get('/getmail', function (req, res, next) {
  var query = URL.parse(req.url, true).query;

  console.log();
  var mailObj = {
    email: query.email,
    nickname: query.nickname,
    title: query.title,
    link: query.link,
  }

  var response = {
    errno: '',
    data: mailObj,
    message: '',
  }

  const params = {
    host: 'smtp.163.com',
    post: 465,
    secure: true,
    auth: {
      user: 'maggiegu94@163.com',
      pass: '123qwe'
    }
  };

  const mailOptions = {
    from: 'maggiegu94@163.com ', // sender address
    to: mailObj.email, // list of receivers
    subject: '您订阅的钬花方案包已经送到啦~', // Subject line
    text: '请小主查收！', // plaintext body
    html: '使用钬花APP，收获更多精彩~', // html body
    attachments: [{
      filename: mailObj.title,
      path: mailObj.link,
    }]
  };

  var transporter = nodemailer.createTransport(params);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('*******>', error);
      response.errno = 99989;
      response.message = '发送邮件失败！';
      res.send(JSON.stringify(response));
    } else {
      console.log('Message sent: ' + info.response);
      response.errno = 0;
      response.message = '发送邮件成功！';
      res.send(JSON.stringify(response));
    }
  });

});

module.exports = router;
