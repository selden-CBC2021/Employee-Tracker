const connection = require("./connection");

class Database {
    constructor(connection) {
        this.connection = connection;
    }
}

const createEmployee = (employee) => {
    const query = connection.query(
        'INSERT FROM company WHERE ?',
        {
            id: ''
        }
    )
}

const deleteEmployee = () => {
    const query = connection.query(
        'DELETE FROM company WHERE ?',
        {
            id: ''
        }
    )
}

module.exports = new Database(connection)