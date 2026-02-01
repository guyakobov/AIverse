export default function handler(req, res) {
    res.status(200).json({
        status: 'ok',
        version: '85cc7d9-fix-ui',
        time: new Date().toISOString(),
        env: process.env.NODE_VERSION || 'unknown'
    });
}
