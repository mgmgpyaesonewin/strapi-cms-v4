const axios = require('axios');

const removePasswords = (key, value) => key === "password" ? '******' : value;

const checkModel = (model, ctx) => (ctx.params.model && !ctx.params.model.includes(model)) || (ctx.params.uid && !ctx.params.uid.includes(model)) ? true : false;

const getContentType = (path) => {
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

const getActionType = (method, path, username) => {
  if (method.toLowerCase() === "get" && path.includes("content-manager")) {
    return `${username} - view content`;
  }
  if (method.toLowerCase() === "post" && path.includes("content-manager")) {
    return `${username} - create content`;
  }
  if (method.toLowerCase() === "put" && path.includes("content-manager")) {
    return `${username} - update content`;
  }
  if (method.toLowerCase() === "delete" && path.includes("content-manager")) {
    return `${username} - delete content`;
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
      const visitedRoutes = ctx._matchedRoute;
      const auditRoutes = ['/content-manager', '/upload', '/admin/webhooks', '/admin/api-tokens'];
      auditRoutes.map(route => {

        if (visitedRoutes.includes(route)) {
          const entry = {
            contentType: getContentType(visitedRoutes),
            action: getActionType(ctx.request.method, visitedRoutes, ctx.state.user.username),
            statusCode: ctx.response.status,
            author: {
              id: ctx.state.user.id, email: ctx.state.user.email, ip: ctx.request.ip,
            },
            method: ctx.request.method,
            route: visitedRoutes,
            params: ctx.params,
            request: ctx.request.body,
            content: ctx.request.body,
          };

          // isAudtiTrailCollection
          if (checkModel("trail", ctx)) {
            if (entry.action !== `${ctx.state.user.username} - view content`) {
              const removePwd = JSON.stringify(entry, removePasswords);
              const auditLog = JSON.parse(removePwd);
              strapi.service('api::trail.trail').create(auditLog);
              if (entry.action !== 'Other Activities') {
                /* actionable message */
                sendActionableMessage(entry);
                /* actionable message */
              }
            }
          }
        }
      });
    }
  };
};

const sendActionableMessage = async (entry) => {
  try {
    const webhookURL = process.env.MS_WEBHOOK_AUDIT_LOG_URL;
    let content = JSON.stringify(entry.content).length > 18000 ? JSON.stringify(entry.content).substring(0, 3000) + '...' : JSON.stringify(entry.content);
    let author = JSON.stringify(entry.author);
    let param = JSON.stringify(entry.params);
    const resp = await axios.post(webhookURL, {
      "themeColor": "0072C6",
      "title": entry.action,
      "text": `**Route** - ${entry.route} <br> **Param** - ${param}  <br>**Author** - <code>${author}</code> <br> **Content** - ${content}`,
    });
    console.log(resp.data);
  } catch (err) {
    console.error(err);
  }
};