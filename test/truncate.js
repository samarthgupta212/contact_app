import map from 'lodash/map';
import db from '../app/models'; 

(async () => {
  return await Promise.all(
    map(Object.keys(db), (key) => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      return db[key].destroy({ where: {}, force: true });
    })
  );
})();
