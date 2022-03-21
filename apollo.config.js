module.exports = {
  client: {
    includes: ["./src/graphql/mutations/*.ts"],
    service: {
      name: "auth-api",
      url: "https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql",
      skipSSLValidation: true,
    },
  },
};
