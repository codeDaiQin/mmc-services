exports.get = async ctx => {
  ctx.body = {
    success: true,
    data: {
      name: '萌萌手抓饼',
      avatar: '/logo.svg',
      userid: '00000001',
      email: 'mmszb@qq.com',
      signature: `signature`,
      title: 'title',
      exp: 5000,
      group: 'group',
      tags: [
        {
          key: '0',
          label: '猫控',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
      ],
      notifyCount: 11,
      unreadCount: 11,
      country: 'China',
      access: 'admin',
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    },
  }
}

exports.login = async ctx => {
  const { password, username, type } = ctx.request.body

  if (password === '123456' && username === 'admin') {
    return ctx.body = {
      status: 'ok',
      type,
      currentAuthority: 'admin',
    }
  }
  if (password === '123456' && username === 'user') {
    return ctx.body = {
      status: 'ok',
      type,
      currentAuthority: 'user',
    };
  }
}