module.exports = async ({github, context, core, yaml}) => {
  core.info("Running something at the moment");
  return context.actor;
}
