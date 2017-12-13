/*
* @Author: Jei
* @Date:   2017-12-13 09:52:41
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-13 16:59:32
*/

class Command {
  constructor() {
    if (this.constructor === Command) {
      throw new TypeError('Cannot construct abstract class.');
    }

    if (this.routine === Command.prototype.routine) {
      throw new TypeError('Please implement abstract method "routine".');
    }

    if (this.getDescription === Command.prototype.getDescription) {
      throw new TypeError('Please implement abstract method "getDescription".');
    }
  }

  /**
   * Validate the current user's group and run this command's routine
   * @return {Promise} [description]
   */
  run() {
    const { username, group } = this.user || {};

    if (!this.canRun(group)) {
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
   * Get a list of the groups that can run this command
   * @return {String[]} A list of group names
   */
  getGroups() {
    return ['admins'];
  }

  /**
   * Check if this command can be run by the given group
   * @property {String} [group="outsiders"] The group to check this command against
   * @return {Boolean}
   */
  canRun(group = 'outsiders') {
    return this.getGroups().indexOf(group) >= 0;
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
