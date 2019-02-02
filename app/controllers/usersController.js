import bcrypt from 'bcryptjs';
import { Responder } from '../lib';
import { User } from '../models';

const _isPasswordInvalid = password => password.length < 8;

const create = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const salt = bcrypt.genSaltSync(10);

    if (_isPasswordInvalid(password)) {
      throw new Error('Password should be 8 characters long');
    };
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await User.create({
      name,
      email,
      phoneNumber,
      encrypted_password: hashedPassword,
    });

    return Responder.created(res, { user }); 
  } catch (error) {
    return Responder.operationFailed(res, { status: 400, error });
  }
};

const update = async (req, res) => {
  try {
    const { name, phoneNumber, email } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) throw new Error('User does not exist');

    const updateQuery = {};
    if (email) {
      Object.assign(updateQuery, { email });
    }
    if (phoneNumber) {
      Object.assign(updateQuery, { phoneNumber });
    }
    if (name) {
      Object.assign(updateQuery, { name });
    }
    await user.updateAttributes(updateQuery);

    return Responder.success(res, { user });
  } catch (error) {
    return Responder.operationFailed(res, { status: 400, error });
  }
};

const show = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) throw new Error('User does not exist');

    return Responder.success(res, { user });
  } catch (error) {
    return Responder.operationFailed(res, { status: 400, error });
  }
};

const verify = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) throw new Error('Invalid UserId');

    await user.updateAttributes({
      status: 1,
    });

    return Responder.success(res, { user });
  } catch (error) {
    return Responder.operationFailed(res, { status: 400, error });
  }
};

module.exports = {
  create,
  update,
  show,
  verify,
};
