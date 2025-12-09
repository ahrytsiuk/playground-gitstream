module.exports = async ({github, context, core}) => {
  core.info("Running something at the moment");
  return context.actor;
}
