


class Users {
    constructor() {
        this.users = []
    }

    AddUserData(id, name, room) {
        var users = { id, name, room }
        this.users.push(users)
        return users
    }
    GetUsersList(room) {
        var users = this.users.filter((user) => user.room === room)
        var nameArray = users.map((user) => user.name)
        return nameArray
    }
}
module.exports = { Users }