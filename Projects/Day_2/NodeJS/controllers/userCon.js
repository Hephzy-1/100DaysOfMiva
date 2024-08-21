import Users from "../models/users.js";

export async function createUser (req, res) {
 const { name, email } = req.body;
 
 try {
  const newUser = new Users({ name, email });
  await newUser.save();

  res.status(201).json({ message: 'New user has been created', newUser});
 } catch (err) {
  res.status(400).json({ message: err.message})
 }
}