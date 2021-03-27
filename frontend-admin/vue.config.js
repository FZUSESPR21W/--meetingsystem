module.exports = {
  lintOnSave: false,
  publicPath: '/',
  devServer: {
    proxy: {
        '/api': {
            target: 'http://47.98.152.179:8000',
            changeOrigin: true,
            ws: true,
            secure: false
        },
    }
}
}
