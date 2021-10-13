export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  postMany,
};

function query(entityType, filterBy = null, delay = 1200) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];
  if (filterBy) {
    if (filterBy.userId) {
      entities = entities.filter((order) => {
        return order.user._id === filterBy.userId;
      });
    }
    if (filterBy.hostId) {
      entities = entities.filter((order) => {
        return order.host._id === filterBy.hostId;
      });
    }
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(entities);
    }, delay);
  });
}

function get(entityType, entityId) {
  return query(entityType).then((entities) =>
    entities.find((entity) => entity._id === entityId)
  );
}

function post(entityType, newEntity) {
  newEntity._id = _makeId();
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex(
      (entity) => entity._id === updatedEntity._id
    );
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function postMany(entityType, newEntities) {
  return query(entityType).then((entities) => {
    newEntities = newEntities.map((entity) => ({ ...entity, _id: _makeId() }));
    entities.push(...newEntities);
    _save(entityType, entities);
    return entities;
  });
}
