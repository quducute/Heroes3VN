const path = require("node:path");

try {
  process.loadEnvFile(path.join(__dirname, ".env"));
} catch {}

module.exports = function appConfig({ config }) {
  return {
    ...config,
    extra: {
      ...config.extra,
      eas: {
        ...config.extra?.eas,
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
  };
};
