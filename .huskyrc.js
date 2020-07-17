const huskyConfig = {
  "hooks": {
      "pre-commit": "./_bin/husky/pre-commit.sh",
      "pre-push": "./_bin/husky/pre-push.sh",
  }
};

module.exports = huskyConfig;