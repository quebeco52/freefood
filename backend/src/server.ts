import { app } from './app.js';
import { sequelize } from './config/database.js';
import { env } from './config/env.js';
import './models/index.js';

async function start() {
    await sequelize.authenticate();
    console.log('Database connected');

    if (env.NODE_ENV === 'development') {
        await sequelize.sync();
        console.log('Database synced');
    }

    app.listen(env.PORT, () => {
        console.log(`Server listening on http://localhost:${env.PORT}`);
    });
}


start().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
