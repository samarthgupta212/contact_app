import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Responder } from '../lib';
import { User } from '../models';

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({
      where: { phoneNumber },
    });

    if (!user) throw new Error('PhoneNumber does not exist');
    const {
      encrypted_password, status, name, id,
    } = user;
    if (status !== 1) {
      throw new Error('User not verified');
    }
    const passwordIsValid = bcrypt.compareSync(password, encrypted_password);
    if (!passwordIsValid) throw new Error('Either Username or password is invalid');

    const token = jwt.sign({ id: user.id }, process.env.jwtSecret, {
      expiresIn: process.env.tokenExpiration, 
    });

    return Responder.created(res, { token, name, id });
  } catch (error) {
    return Responder.operationFailed(res, { error, status: 401, token: null });
  }
};

const signout = (req, res) => Responder.success(res, { token: null });

module.exports = {
  login,
  signout,
};
