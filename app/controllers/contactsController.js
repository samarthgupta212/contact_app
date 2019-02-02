import { pagination } from './_helper';
import { Responder } from '../lib';
import { User, Contact } from '../models';

const _checkIfEmailExists = async (userId, email) => {
  const contact = await Contact.findOne({
    where: {
      userId,
      email,
    },
  });
  if (contact) {
    throw new Error('Email Address already exits in your contact book');
  }
  return;
};

const create = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) throw new Error('User does not exist');

    await _checkIfEmailExists(userId, email);
    const contact = await Contact.create({
      name,
      email,
      phoneNumber,
      userId,
    });

    return Responder.created(res, { contact }); 
  } catch (error) {
    return Responder.operationFailed(res, { status: 400, error });
  }
};

const index = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { limit, offset } = pagination(req.query);
    const whereClause = {};
    if (name) {
      Object.assign(whereClause, { name: { [Op.iLike]: `%${name}%` } });
    }
    if (email) {
      Object.assign(whereClause, { email: { [Op.iLike]: `%${email}%` } });
    }
    const contacts = await Contact.findAll({
      where: whereClause,
      limit,
      offset,
    });

    return Responder.success(res, { contacts });
  } catch (error) {
    return Responder.operationFailed(res, { status: 400, error });
  }
};

const update = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { name, phoneNumber, email } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) throw new Error('Invalid User');

    const contact = await Contact.findById(contactId);
    if (!contact) throw new Error('Invalid Contact');

    const updateQuery = {};
    if (email) {
      await _checkIfEmailExists(userId, email);
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
    const { contactId } = req.params;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) throw new Error('Invalid User');

    const contact = await Contact.findById(contactId);
    if (!contact) throw new Error('Invalid Contact');

    return Responder.success(res, { contact });
  } catch (error) {
    return Responder.operationFailed(res, { status: 400, error });
  }
};

const remove = async (req, res) => {
  try {
    const { contactId } = req.params;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) throw new Error('Invalid User');

    const contact = await Contact.destroy({
      where: {
        id: contactId,
      },
    });

    return Responder.deleted(res, { contact });
  } catch (error) {
    return Responder.operationFailed(res, { status: 400, error });
  }
};

module.exports = {
  create,
  index,
  update,
  show,
  remove,
};
