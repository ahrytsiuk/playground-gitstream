export default async ({ github, context, core }) => {
  core.debug("Running something at the moment");
  return context.actor;
};
