import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://35.209.49.134:8030',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => {
            // 如果API服务器不需要/api前缀，可以去掉
            console.log('🔄 代理重写:', path, '->', path.replace(/^\/api/, ''));
            return path.replace(/^\/api/, '');
          },
          configure: (proxy, options) => {
            proxy.on('error', (err, req, res) => {
              console.error('❌ 代理错误:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('🚀 代理请求:', req.method, req.url, '->', options.target + proxyReq.path);
            });
            proxy.on('proxyRes', (proxyRes, req, res) => {
              console.log('✅ 代理响应:', proxyRes.statusCode, req.url);
            });
          },
        },
      },
    },
  };
});
