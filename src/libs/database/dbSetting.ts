interface databaseSettingInterface {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export const getDatabaseSetting = () => {
    const env = process.env.NODE_ENV || "development";

    if (env === "development") {
        return {
            host: process.env.MYSQL_HOST_DEV!,
            port: parseInt(process.env.MYSQL_PORT_DEV!),
            user: process.env.MYSQL_USER_DEV!,
            password: process.env.MYSQL_PWD_DEV!,
            database: process.env.MYSQL_DATABASE_DEV!,
        };
    } else {
        return {
            host: process.env.MYSQL_HOST_PRODUCTION!,
            port: parseInt(process.env.MYSQL_PORT_PRODUCTION!)!,
            user: process.env.MYSQL_USER_PRODUCTION!,
            password: process.env.MYSQL_PWD_PRODUCTION!,
            database: process.env.MYSQL_DATABASE_PRODUCTION!,
        };
    }
};
