const mysql = require('../../utils/mysql')

const table = 'user'

exports.get = async ctx => {
  const data = [
    {
      "id": "afc123",
      "title": "React",
      "url": "https://react.docschina.org/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "用于构建用户界面的 JavaScript 库",
      "tag": [
        { "value": "前端", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afc124",
      "title": "知道创宇研发技能表",
      "url": "http://t.cn/RyyYMV3",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "知道创宇研发工程师的技能树集合",
      "tag": [
        { "value": "集合", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afc125",
      "title": "安全技能树简版",
      "url": "http://t.cn/RS1DueL",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "安全技能树简版",
      "tag": [
        { "value": "图片", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afc126",
      "title": "SecWiki技能表",
      "url": "https://www.sec-wiki.com/skill/index",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "SecWiki技能表",
      "tag": [
        { "value": "表格", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afc127",
      "title": "SecWiki思维导图",
      "url": "https://github.com/SecWiki/sec-chart",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "有关信息安全的一些截图及流程图分享",
      "tag": [
        { "value": "表格", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afc128",
      "title": "漏洞银行技能树",
      "url": "https://skills.bugbank.cn/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "漏洞银行技能树相关学习以及WEB渗透学习",
      "tag": [
        { "value": "技能树", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afd120",
      "title": "渗透师导航",
      "url": "http://www.shentoushi.top/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "漏洞平台（国内，国外，及测试）",
      "tag": [
        { "value": "平台集合", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afd121",
      "title": "纳威安全",
      "url": "https://navisec.it/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "NaviSec.it – 纳威安全导航",
      "tag": [
        { "value": "上网导航", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afe120",
      "title": "实验吧",
      "url": "http://www.shiyanbar.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "实验吧主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afe121",
      "title": "合天网安实验室",
      "url": "http://www.hetianlab.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "合天网安实验室主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afe122",
      "title": "i春秋",
      "url": "https://www.ichunqiu.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "i春秋主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afe123",
      "title": "安全牛课堂",
      "url": "https://edu.aqniu.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "安全牛课堂主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afe124",
      "title": "乌云百科",
      "url": "http://wiki.secbug.net/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "乌云百科主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "aff120",
      "title": "漏洞盒子",
      "url": "https://www.vulbox.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "漏洞盒子主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "aff121",
      "title": "exploit-db",
      "url": "https://www.exploit-db.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "exploit-db主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "aff122",
      "title": "知道创宇Seebug",
      "url": "https://www.seebug.org/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "知道创宇Seebug主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "aff123",
      "title": "应急响应中心",
      "url": "http://www.srcsec.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "应急响应中心主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "aff124",
      "title": "乌云网",
      "url": "http://wooyun.jozxing.cc/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "乌云网主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "aff125",
      "title": "被黑站点统计系统",
      "url": "http://www.zone-h.org/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "被黑站点统计系统主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "aff126",
      "title": "国家信息安全漏洞库",
      "url": "http://www.cnnvd.org.cn/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "国家信息安全漏洞库主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afg120",
      "title": "freebuf",
      "url": "http://www.freebuf.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "freebuf主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afg121",
      "title": "安全客",
      "url": "https://www.anquanke.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "安全客主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afg122",
      "title": "SecWiki",
      "url": "https://www.sec-wiki.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "SecWiki主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afg123",
      "title": "Tuisec安全热点",
      "url": "https://paper.tuisec.win/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "Tuisec安全热点主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afg124",
      "title": "嘶吼",
      "url": "http://www.4hou.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "嘶吼主页",
      "tag": [
        { "value": "主页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afh120",
      "title": "看雪论坛",
      "url": "https://bbs.pediy.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "看雪论坛",
      "tag": [
        { "value": "论坛", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afh121",
      "title": "i春秋论坛",
      "url": "https://bbs.ichunqiu.com/portal.php",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "i春秋论坛",
      "tag": [
        { "value": "论坛", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afh122",
      "title": "吾爱破解",
      "url": "https://www.52pojie.cn/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "吾爱破解",
      "tag": [
        { "value": "网站", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afh123",
      "title": "t00ls论坛",
      "url": "https://www.t00ls.net/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "t00ls论坛",
      "tag": [
        { "value": "论坛", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afh124",
      "title": "先知社区",
      "url": "https://xianzhi.aliyun.com/forum/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "先知社区",
      "tag": [
        { "value": "社区", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "afh124",
      "title": "赛克社区",
      "url": "http://zone.secevery.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "赛克社区",
      "tag": [
        { "value": "社区", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "CTF001",
      "title": "CTF Wiki",
      "url": "https://ctf-wiki.github.io/ctf-wiki/#/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "CTF Wiki",
      "tag": [
        { "value": "首页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "CTF002",
      "title": "pwnhub",
      "url": "https://pwnhub.cn/index",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "pwnhub",
      "tag": [
        { "value": "首页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "CTF003",
      "title": "Jarvis OJ",
      "url": "https://www.jarvisoj.com/login",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "Jarvis OJ",
      "tag": [
        { "value": "首页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "CTF004",
      "title": "XCTF",
      "url": "https://www.xctf.org.cn/index/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "XCTF",
      "tag": [
        { "value": "首页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "CTF005",
      "title": "CTF Rank",
      "url": "https://www.ctfrank.org/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "CTF Rank",
      "tag": [
        { "value": "首页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "CTF006",
      "title": "CTFtime",
      "url": "https://ctftime.org/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "CTFtime",
      "tag": [
        { "value": "首页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "CTF007",
      "title": "CTF Writeups",
      "url": "https://github.com/ctfs",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "CTF Writeups",
      "tag": [
        { "value": "首页", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "boke001",
      "title": "猪猪侠ring04h",
      "url": "https://github.com/ctfs",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "猪猪侠ring04h的博客",
      "tag": [
        { "value": "个人博客", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "boke001",
      "title": "猪猪侠ring04h",
      "url": "https://github.com/ring04h",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "猪猪侠ring04h的博客",
      "tag": [
        { "value": "个人博客", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "boke002",
      "title": "离别歌",
      "url": "https://www.leavesongs.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "离别歌的博客",
      "tag": [
        { "value": "个人博客", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "boke003",
      "title": "廖雪峰",
      "url": "https://www.liaoxuefeng.com/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "廖雪峰的博客",
      "tag": [
        { "value": "个人博客", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "boke004",
      "title": "阮一峰",
      "url": "http://www.ruanyifeng.com/home.html",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "阮一峰的博客",
      "tag": [
        { "value": "个人博客", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "boke005",
      "title": "pcat",
      "url": "http://www.cnblogs.com/pcat/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "pcat的博客",
      "tag": [
        { "value": "个人博客", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "boke006",
      "title": "Seebug_Paper",
      "url": "https://paper.seebug.org/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "Seebug_Paper的博客",
      "tag": [
        { "value": "个人博客", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "boke007",
      "title": "Chybeta",
      "url": "http://t.cn/RNPknsu",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "Chybeta的博客",
      "tag": [
        { "value": "个人博客", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "boke008",
      "title": "信安之路",
      "url": "http://www.myh0st.cn/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "信安之路的博客",
      "tag": [
        { "value": "个人博客", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "gj001",
      "title": "ctf资源库",
      "url": "http://www.myh0st.cn/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "信安之路的博客",
      "tag": [
        { "value": "个人博客", "id": "id1", "type": 0 }
      ]
    },
    {
      "id": "gj002",
      "title": "开源安全工具",
      "url": "http://www.myh0st.cn/",
      "cover": {
        "url": "/wechat.jpg",
        "alt": "weixin"
      },
      "description": "开源安全工具的博客",
      "tag": [
        { "value": "个人博客", "id": "id1", "type": 0 }
      ]
    }
  ]
  ctx.body = {
    data: {
      list: data,
      total: 50,
    },
  }
}

exports.detail = async ctx => {
  ctx.body = {
    data: {
      id: 'detail_ID',
      title: '测试标题',
      time: 'string',
      tag: [
        { value: 'key1', id: 'label1', type: 1 },
        { value: 'key2', id: 'i2', type: 1 },
        { value: 'key1', id: 'label1', type: 1 },
        { value: 'key1', id: 'label1', type: 1 },
        { value: 'key1', id: 'label1', type: 1 },
      ],
      imgaes: [
        {
          url: '/wechat.jpg',
          alt: '艹',
        },
        {
          url: '/r.jpg',
          alt: '蓉蓉',
        },
      ],
      comment: {
        id: '001',
        name: 'string',
        likeNum: 0,
        userId: 'string',
        content: 'string',
        time: 'Tue Oct 19 2021 18:34:37 GMT+0800',
      },
    }
  }
}

