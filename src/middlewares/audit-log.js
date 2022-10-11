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
  const versionConfig = ['content-manager', '/upload/files', '/upload/folders', '/admin/webhooks', '/admin/api-tokens', '/upload/settings', '/admin/webhooks', '/admin/roles', '/admin/users', '/users-permissions/routes', '/users-permissions/providers', '/users-permissions/providers'];
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
  if (method.toLowerCase() === "post" && path.includes("login")) {
    return "User login";
  }
  return "Other Activities"
};

/**
 * `audit-log` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();
    if (ctx.state && ctx.state.user) {
      const routeStr = ctx._matchedRoute;
      console.log('---------------------');
      console.log(routeStr);
      console.log('---------------------');
      const arr = [
        '/content-manager', '/upload',
        '/admin/webhooks',
        '/admin/api-tokens',
        // '/upload/settings',
        '/admin/roles',
        '/admin/users',
        '/users-permissions/routes',
        '/users-permissions/providers'
      ];

      const contains = arr.some(element => {
        if (routeStr.includes(element)) {
          const entry = {
            contentType: getContentType(routeStr),
            action: getActionType(ctx.request.method, routeStr),
            statusCode: ctx.response.status,
            author: {
              id: ctx.state.user.id, email: ctx.state.user.email, ip: ctx.request.ip,
            },
            method: ctx.request.method,
            route: routeStr,
            params: ctx.params,
            request: ctx.request.body,
            content: ctx.request.body,
          };
          if (
            (ctx.params.model && ctx.params.model.includes("trail")) || (ctx.params.uid && ctx.params.uid.includes("trail"))) {
          } else {
            if (entry.action != 'Admin content View') {
              const removePwd = JSON.stringify(entry, removePasswords);
              const auditLog = JSON.parse(removePwd);
              strapi.service('api::trail.trail').create(auditLog);
            }
          }
          return true;
        }
        return false;
      });
    }
  };
};
