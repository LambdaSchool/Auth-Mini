const db = require('../../data/dbConfig');

module.exports = {
    find,
    findBy,
    insert
}

function find() {
    return db('users').select('id', 'username', 'department');
}

function findBy(user) {
    return db('users').where(user).first();
}

function insert(user) {
    return db('users').insert(user).then(([id]) => findBy({ id }).first());
} 