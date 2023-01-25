db = connect("mongodb://localhost:27017/cityapp");
db.createUser({
  user: "test",
  pwd: "1234",
  roles: [{ role: "dbOwner", db: "cityapp" }]
});