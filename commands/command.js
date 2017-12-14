/*
* @Author: Jei
* @Date:   2017-12-13 09:52:41
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-14 16:13:30
*/

class Command {
  constructor(cfg = { user: {} }) {
    if (this.constructor === Command) {
      throw new TypeError('Cannot construct abstract class.');
    }

    if (this.routine === Command.prototype.routine) {
      throw new TypeError('Please implement abstract method "routine".');
    }

    if (this.getDescription === Command.prototype.getDescription) {
      throw new TypeError('Please implement abstract method "getDescription".');
    }

    this.user = cfg.user;
  }

  /**
   * Validate the current user's level and run this command's routine
   * @return {Promise} [description]
   */
  run() {
    const { username, level } = this.user || {};

    if (!this.canRun(level)) {
      console.warn(`User "${username}" called the command "${commandName}" but is not authorized.`);
      return Promise.reject('Unauthorized');
    }

    return this.routine.call(this, arguments);
  }

  /**
   * This command's routine
   * @return {Promise} A promise that resolves with the output to send back to the chat
   */
  routine() {
    throw new TypeError('Do not call abstract method "routine" from child.');
  }

  /**
   * Get the minimum security level needed to run this command
   * @return {Number}
   */
  getLevel() {
    return 0;
  }

  /**
   * Check if this command can be run by the given level
   * @property {String} [group="outsiders"] The group to check this command against
   * @return {Boolean}
   */
  canRun(level = 0) {
    return level >= this.getLevel();
  }

  /**
   * Get a description to be displayed by the "help" command
   * @return {String} A description
   */
  getDescription() {
    throw new TypeError('Do not call abstract method "getDescription" from child.');
  }
}

module.exports = Command;
