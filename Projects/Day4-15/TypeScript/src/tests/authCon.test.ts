import { Request, Response } from 'express';
import { deleteUser } from '../controllers/auth.controller';
import User from '../models/userModel';

jest.mock('../models/userModel.ts');

describe('deleteUser', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: { email: 'test@example.com' },
    };

    statusMock = jest.fn().mockReturnValue({ json: jest.fn() });
    jsonMock = jest.fn();

    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it('should return 400 if user input is invalid', async () => {
    req.body = { email: '' }; // Invalid email

    await deleteUser(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Invalid',
      error: 'Invalid user input',
    });
  });

  it('should return a 400 if user does not exist', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null); // User doesn't exist

    await deleteUser(req as Request, res as Response);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Invalid',
      error: "This user isn't in our database",
    });
  });

  it('should return a 204 and success message if user is deleted', async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });
    (User.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 1 });

    await deleteUser(req as Request, res as Response);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(User.deleteOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(statusMock).toHaveBeenCalledWith(204);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Successful delete',
      deletedCount: 1,
    });
  });

  it('should return 500 if an unknown error occurs', async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

    await deleteUser(req as Request, res as Response);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Server Error',
      error: 'Database error',
    });
  });
});

// import request from 'supertest';
// import app from '../index'; // Assuming your Express app is exported from this file
// import User from '../models/userModel'; // Adjust the path to your User model

// jest.mock('../models/User'); // Mock the User model

// describe('DELETE /user', () => {
//   it('should delete a user successfully', async () => {
//     // Mock the User.findOne and User.deleteOne methods
//     User.findOne.mockResolvedValue({ email: 'test@example.com' });
//     User.deleteOne.mockResolvedValue({ deletedCount: 1 });

//     const response = await request(app)
//       .delete('/user')
//       .send({ email: 'test@example.com' });

//     expect(response.status).toBe(204);
//     expect(response.body.message).toBe('Successful delete');
//   });

//   it('should return an error if user does not exist', async () => {
//     // Mock the User.findOne method to return null
//     User.findOne.mockResolvedValue(null);

//     const response = await request(app)
//       .delete('/user')
//       .send({ email: 'nonexistent@example.com' });

//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe('Invalid');
//     expect(response.body.error).toBe("This user isn't in our database");
//   });

//   it('should return an error for invalid input', async () => {
//     const response = await request(app)
//       .delete('/user')
//       .send({ email: 'invalid-email' }); // Assuming your validation schema catches this

//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe('Invalid');
//     expect(response.body.error).toBe('Invalid user input');
//   });
// });
