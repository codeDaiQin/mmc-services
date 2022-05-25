const mysql = require('../../utils/mysql')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const table = 'user'

const code = {}
const KEY = 'MMSZB'

function randomCode() {
  return Math.floor(Math.random() * 10000)
}

exports.get = async (ctx) => {
  const uid = ctx.auth
  if (uid) {
    const [data] = await mysql(`SELECT * FROM ${table} WHERE id=?`, uid)
    if (data.id) {
      ctx.body = data
      return
    }
  }
  ctx.body = {}
}

exports.captcha = async (ctx) => {
  const { email } = ctx.request.query
  // 随机验证码
  const captchaCode = randomCode()
  code[email] = captchaCode
  // 10分钟后过期
  setTimeout(() => {
    delete code[email]
  }, 1000 * 60 * 10)

  let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user: 'mmszb@qq.com',
      // 这里密码不是qq密码，是你设置的smtp授权码
      pass: 'zvsnbvhvkopbbbeb',
    },
  })

  let mailOptions = {
    from: '"您的验证码" <mmszb@qq.com>', // sender address
    to: email, // list of receivers
    subject: '您的验证码', // Subject line
    // 发送text或者html格式
    // text: 'Hello world?', // plain text body
    html: `<p>您的验证码为${captchaCode}<p/>`, // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
    // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
  })

  ctx.body = { email }
}

exports.login = async (ctx) => {

  const { type, email, captcha, password, name } = ctx.request.body

  if (type === 'email') {
    console.log(captcha, code, email);
    if (code[email] == captcha) {
      const [data] = await mysql(`SELECT * FROM ${table} WHERE email=?`, email)
      const { id } = data
      if (id) {
        const token = jwt.sign(id, KEY)
        await mysql(`UPDATE ${table} SET token=? WHERE id=?`, [token, id])
        ctx.body = { ...data, token }
        return
      }
      ctx.body = { message: '未找到账号' }
    }
    ctx.body = { message: '验证码不正确' }
  }

  if (type === 'account') {
    const [data] = await mysql(
      `SELECT * FROM ${table} WHERE name=? and password=?`,
      [name, password]
    )
    const { id } = data
    if (id) {
      const token = jwt.sign(id, KEY)
      await mysql(`UPDATE ${table} SET token=? WHERE id=?`, [token, id])
      ctx.body = { ...data, token }
      return
    }
    
  }

  ctx.body = {
    mesage: 'not found',
  }
}

exports.notices = async (ctx) => {
  const data = [
    {
      id: '000000001',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: 'notification',
    },
    {
      id: '000000002',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      datetime: '2017-08-08',
      type: 'notification',
    },
    {
      id: '000000003',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: '这种模板可以区分多种通知类型',
      datetime: '2017-08-07',
      read: true,
      type: 'notification',
    },
    {
      id: '000000004',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '左侧图标用于区分不同的类型',
      datetime: '2017-08-07',
      type: 'notification',
    },
    {
      id: '000000005',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '内容不要超过两行字，超出时自动截断',
      datetime: '2017-08-07',
      type: 'notification',
    },
    {
      id: '000000006',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '曲丽丽 评论了你',
      description: '描述信息描述信息描述信息',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000007',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '朱偏右 回复了你',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000008',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '标题',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000009',
      title: '任务名称',
      description: '任务需要在 2017-01-12 20:00 前启动',
      extra: '未开始',
      status: 'todo',
      type: 'event',
    },
    {
      id: '000000010',
      title: '第三方紧急代码变更',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '马上到期',
      status: 'urgent',
      type: 'event',
    },
    {
      id: '000000011',
      title: '信息安全考试',
      description: '指派竹尔于 2017-01-09 前完成更新并发布',
      extra: '已耗时 8 天',
      status: 'doing',
      type: 'event',
    },
    {
      id: '000000012',
      title: 'ABCD 版本发布',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '进行中',
      status: 'processing',
      type: 'event',
    },
  ]
  // data.forEach(x => {
  //   const { title, description, avatar, datetime, type } = x
  //   mysql(
  //     `INSERT INTO notices SET title=?,description=?,avatar=?,datetime=?,type=?`,
  //     [title, description, avatar, datetime, type]
  //   )
  // })
  ctx.body = { data }
}

exports.register = async (ctx) => {
  const { email, captcha } = ctx.request.body
  console.log(code[email], captcha, code);
  if (code[email] == captcha) {
    await mysql(`INSERT INTO ${table} SET email=?,password=?,name=?`, [
      email,
      email,
      email,
    ])
    const [data] = await mysql(`SELECT * FROM ${table} WHERE email=?`, email)
    const { id } = data
    const token = jwt.sign(id, KEY)
    await mysql(`UPDATE ${table} SET token=? WHERE id=?`, [token, id])
    ctx.body = { ...data, token }
    return
  }
  ctx.body = { message: '验证码不正确' }
}
