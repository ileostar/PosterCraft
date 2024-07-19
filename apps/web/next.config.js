module.exports = {
    async headers() {
        return [{
                // Match only /auth/github/callback
                source: '/auth/github/callback',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: 'http://127.0.0.1:3000' }, // 注意这里最好指定具体的源，而不是 '*'
                    { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS, POST' }, // 如果需要的话，也可以添加其他允许的HTTP方法
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type' }, // 如果需要的话，也可以添加其他允许的HTTP头
                    // ... 可以添加更多CORS相关的头
                ],
            },
            // 如果你还需要为其他路径设置头，可以在这里继续添加规则
        ];
    },
};