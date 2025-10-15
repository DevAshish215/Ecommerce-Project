// simple in-memory "model" to let you run APIs without DB yet.
// We'll replace this with raw MongoDB and later Mongoose.

let users = [
  {
    id: 1,
    name: "Seller User",
    email: "seller@ecom.com",
    password: "Password1", // NOTE: placeholder. We'll hash later.
    type: "seller"
  },
  {
    id: 2,
    name: "Customer User",
    email: "customer@ecom.com",
    password: "Password1",
    type: "customer"
  }
];

export default class UserModel {
  static async all() {
    // returns all users (raw)
    return users;
  }

  static async findByEmail(email) {
    return users.find(u => u.email === email);
  }

  static async create({ name, email, password, type = "customer" }) {
    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { id, name, email, password, type };
    users.push(newUser);
    return newUser;
  }
}
