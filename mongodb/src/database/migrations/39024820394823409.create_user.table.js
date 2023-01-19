module.exports = {
    up(db) {
        return db.collection('users').insertMany([
            { name: 'ABC11', email: 'abc11@getnada.com' },
            { name: 'ABC22', email: 'abc22@getnada.com' },
            { name: 'ABC33', email: 'abc33@getnada.com' },
        ]);
    },

    down(db) {
        return db.collection('users').drop();
    },
};
