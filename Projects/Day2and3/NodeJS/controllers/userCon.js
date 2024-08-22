import Users from "../models/users.js";

export async function createUser (req, res) {
 try {
  const { name, email } = req.body;
  
  if (!email || !name) {
    throw new Error('Email and name are required');
  }

  const check = await Users.findOne({email});

  if (check) {
    throw Error('User already exists');
  }
  const newUser = new Users({ name, email });
  await newUser.save();

  res.status(201).json({ message: 'New user has been created', newUser});
 } catch (err) {
  res.status(400).json({ message: err.message});
 }
};

export const getUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error('Email is required');
    }

    const findUser = await Users.findOne({ email })

    if (!findUser) {
      throw Error('User not found')
    }

    res.status(200).json({
      message: "Here is the user details: ", findUser
    })
  } catch (err) {
    if (err instanceof Error) { 
      console.error(err.message);
      res.status(400).json({ message: err.message});

    } else {
      console.error("An unknown error occurred:", err);
      res.status(500).json(err);
    }
  }
};

export async function updateUser (req, res) {
  try {
    const { name, email } = req.body;

    if (!email || !name) {
      throw new Error('Email and name are required');
    }

    const find = await Users.findOne({ email });

    if (!find) {
      throw Error('User not found')
    }

    await Users.updateOne({ name })
    res.status(200).json({ message: 'User name has been updated'});
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(400).json({ message: err.message});
    } else {
      console.error("An unknown error occurred:", err);
      res.status(500).json(err);
    }
  }
};

export const deleteUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new Error('Email is required');
  }

  try {
    const find = await Users.findOne({ email });

    if (!find) {
      throw Error('User not found')
    }

    const del = await Users.deleteOne({ email });

    res.status(200).json({ message: 'USer details has been deleted'});
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(400).json({ message: err.message});
    } else {
      console.error("An unknown error occurred:", err);
      res.status(500).json(err);
    }
  }
};