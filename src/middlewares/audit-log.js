const koaBody = require("koa-body");

const removePasswords = (key, value) => key === "password" ? undefined : value;

const getContentType = (path) => {
  if (path.includes("service-request")) {
    return "Service Request";
  }
  if (path.includes("register")) {
    return "Account Registration";
  }
  if (path.includes("local")) {
    return "Account Login";
  }
  if (path.includes("service")) {
    return "Service";
  }
  if (path.includes("content-types") || path.includes("content-manager")) {
    return "Admin";
  }
  return "Others"
};

const getActionType = (method, path) => {
  if (method.toLowerCase() === "post" && path.includes("service-request")) {
    return "Created Service Request";
  }
  if (method.toLowerCase() === "get" && path.includes("content-manager")) {
    return "Admin content View";
  }
  if (method.toLowerCase() === "post" && path.includes("content-manager")) {
    return "Admin content create";
  }
  if (method.toLowerCase() === "put" && path.includes("content-manager")) {
    return "Admin content update";
  }
  if (method.toLowerCase() === "delete" && path.includes("content-manager")) {
    return "Admin content delete";
  }
  if (method.toLowerCase() === "post" && path.includes("register")) {
    return "User Register";
  }
  if (method.toLowerCase() === "post" && path.includes("local")) {
    return "User log in";
  }

  return "Other Activities"
};

/**
 * `audit-log` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    strapi.log.info('In audit-log middleware.');
    await next();
    if (ctx.state && ctx.state.user) {
      const entry = {

        contentType: getContentType(ctx._matchedRoute),
        action: getActionType(ctx.request.method, ctx._matchedRoute),
        statusCode: ctx.response.status,
        author: {
          id: ctx.state.user.id, email: ctx.state.user.email, ip: ctx.request.ip,
        },
        method: ctx.request.method,
        route: ctx._matchedRoute,
        params: ctx.params,
        request: ctx.request.body,
        content: ctx.request.body,
      };
      if ((ctx.params.model && ctx.params.model.includes("trail")) || (ctx.params.uid && ctx.params.uid.includes("trail"))) {
      } else {
        if (entry.action != 'Admin content View') {
          console.log("--------------- else here -------------");
          strapi.log.info(JSON.stringify(entry, removePasswords));
          await strapi.service('api::trail.trail').create(entry);
        }
      }
    }
  };
};
