const fs = require("node:fs");
const path = require("node:path");

const envFile = path.join(__dirname, ".env");
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

module.exports = function appConfig({ config }) {
  const buildNumber = config.version.replaceAll(".", "");
  return {
    ...config,
    android: { ...config.android, versionCode: Number(buildNumber) },
    ios: { ...config.ios, buildNumber },
    extra: {
      ...config.extra,
      eas: {
        ...config.extra?.eas,
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
  };
};
