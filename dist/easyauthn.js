const easyauthn = (() => {
  let statusCb = null
  let room = null
  const importScript = (scriptPath, callback) => {
    const script = document.createElement('script')
    script.src = scriptPath;
    (document.head || document.documentElement).appendChild(script)
    script.onload = callback
  }

  const createSocket = () => {
    const socket = io('https://easyauthn.com', { path: '/ws' })
    socket.emit('room', room)
    socket.on('registration-status', (status) => { statusCb && statusCb(status) })
  }

  const init = () => {
    importScript('https://easyauthn.com/sdk/easyauthn-registration-listener-front/socket.io.js', createSocket)
  }

  return {
    init: (statusRoom) => {
      room = statusRoom
      init()
    },
    onStatus: (cb) => { statusCb = cb }
  }
})()
