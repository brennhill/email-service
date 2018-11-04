const prefix = 'EMAIL_'
const defaults = {}

/**
 * Provides a set of environment variable mappings.
 * These are populated either from a .env file loaded automatically by better-npm-run
 * or from the host OS.
 * @param env
 * @returns {function(*, *): *}
 */
module.exports = (env = {}) => (key, defaultValue) => {
  return [
    env[prefix + key],
    env[key],
    process.env[prefix + key],
    process.env[key],
    defaultValue,
    defaults[key]
  ].find(value => value != null)
}
