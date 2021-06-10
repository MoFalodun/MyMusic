/**
 * contains validation helpers
 *
 * @class ValidationHelper
 */
class ValidationHelper {
  /**
     * It validates a number.
     * @static
     * @memberof ValidationHelper
     * @returns {Boolean}
     */
  static numberCheck(param, joiObject, min = 1, max) {
    return joiObject
      .number()
      .required()
      .min(min)
      .max(max)
      .messages({
        'any.required': `${param} is a required field`,
        'number.base': `${param} must be a number`,
        'number.empty': `${param} cannot be an empty field`,
        'number.min': `${param} can not be lesser than ${min}`,
        'number.max': `${param} can not be greater than ${max}`
      });
  }

  /**
     * It validates a string.
     * @static
     * @memberof ValidationHelper
     * @returns {Boolean}
     */
  static stringCheck(param, joiObject, min = 1, max = 1200) {
    return joiObject
      .string()
      .required()
      .min(min)
      .max(max)
      .messages({
        'any.required': `${param} is a required field`,
        'string.max': `${param} can not be lesser than ${max} characters`,
        'string.min': `${param} can not be lesser than ${min} characters`,
        'string.base': `${param} must be a string`,
        'string.empty': `${param} cannot be an empty field`,
      });
  }

  /**
     * It validates a date.
     * @static
     * @memberof ValidationHelper
     * @returns {Boolean}
     */
  static dateCheck(param, joiObject) {
    return joiObject
      .date()
      .required()
      .messages({
        'any.required': `${param} is a required field`,
        'date.base': `${param} must be a correct date`,
        'string.empty': `${param} cannot be an empty field`
      });
  }

  /**
     * It validates a password.
     * @static
     * @memberof ValidationHelper
     * @returns {Boolean}
     */
  static passwordCheck(joiObject) {
    return joiObject.string().trim().required().min(7)
      .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password field cannot be an empty field',
        'any.required': 'Password field is required',
        'string.min': 'Password can not be lesser than 7 characters'
      });
  }

  /**
     * It validates a string that is not required.
     * @static
     * @memberof ValidationHelper
     * @returns {Boolean}
     */
  static editStringCheck(param, joiObject, min = 0, max = 1200) {
    return joiObject
      .string()
      .min(min)
      .max(max)
      .messages({
        'string.base': `${param}  must be a string`,
        'string.empty': `${param} cannot be an empty field`,
        'string.max': `${param} can not be lesser than ${max} characters`,
        'string.min': `${param} can not be lesser than ${min} characters`
      });
  }

  /**
     * It validates a phone number.
     * @static
     * @memberof ValidationHelper
     * @returns {Boolean}
     */
  static phoneNumberCheck(joiObject) {
    return joiObject
      .string()
      .required()
      .pattern(new RegExp('^[0-9]{11,14}$'))
      .messages({
        'string.pattern.base':
            'Phone number must be a number between 11 and 14 digits',
        'string.empty': 'Phone number must not be an empty field',
        'any.required': 'Phone number  is a required field'
      });
  }

  /**
     * It validates a phone number that is not required.
     * @static
     * @memberof ValidationHelper
     * @returns {Boolean}
     */
  static editPhoneCheck(joiObject) {
    return joiObject.string().pattern(new RegExp('^[0-9]{11,14}$')).messages({
      'string.pattern.base':
          'Phone Number must be a number between 11 and 14 digits',
      'string.empty': 'Phone Number must not be an empty field',
      'any.required': 'Phone Number  is a required field'
    });
  }

  /**
     * It validates a string is part of an enum.
     * @static
     * @memberof ValidationHelper
     * @returns {Boolean}
     */
  static enumCheck(fields, param, joiObject) {
    return joiObject
      .string()
      .required()
      .valid(...fields)
      .messages({
        'string.empty': `${param} must not be an empty field`,
        'any.required': `${param} is a required field`,
        'any.only': `Please enter a valid ${param}`
      });
  }

  /**
     * It validates a email
     * @static
     * @memberof ValidationHelper
     * @returns {Boolean}
     */
  static emailCheck(joiObject) {
    return joiObject.string().email().required().messages({
      'any.required': 'Email is a required field',
      'string.email': 'Email is not valid',
      'string.empty': 'Email cannot be an empty field'
    });
  }

  /**
     * It validates a email
     * @static
     * @memberof ValidationHelper
     * @returns {Boolean}
     */

  static editEmailCheck(joiObject) {
    return joiObject.string().email().messages({
      'string.email': 'Email is not valid',
      'string.empty': 'Email cannot be an empty field'
    });
  }

  /**
   * It validates a uuid that is not required.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editUuidCheck(param, joiObject) {
    return joiObject.string().pattern(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$')).messages({
      'string.pattern.base':
          `${param} must be a valid uuid`,
      'string.empty': `${param} must not be an empty field`,
      'any.required': `${param} is a required field`
    });
  }
}
export default ValidationHelper;
