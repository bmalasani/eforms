const withTM = require("next-transpile-modules")(["@meb/components"]);

module.exports = withTM({
  reactStrictMode: true,
});
