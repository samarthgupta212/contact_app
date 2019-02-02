import express from 'express';
import { contactsController } from '../../controllers';

const initContactRoutes = () => {
  const contactRoutes = express.Router();

  contactRoutes.post('/', contactsController.create);
  contactRoutes.get('/', contactsController.index);
  contactRoutes.get('/:contactId', contactsController.show);
  contactRoutes.put('/:contactId', contactsController.update);
  contactRoutes.delete('/:contactId', contactsController.remove);

  return contactRoutes;
};

export default initContactRoutes;
