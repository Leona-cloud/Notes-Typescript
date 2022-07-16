import { Request, Response, Router}  from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User  from '../models/user';
// import loginValidation from '../schemas/login';
import validate  from '../schemas/user';


const AuthRouter: Router = Router();



AuthRouter.post('/', async(req: Request, res: Response) => {
    const { error }  = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email:  req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = new User({
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
        confirmPassword: req.body.confirmPassword
    });

    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password !== confirmPassword){
        return res.send("Passwords do not match");
    };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.confirmPassword = await bcrypt.hash(user.confirmPassword, salt);

     try {
        const result = await user.save();
        console.log(result);
        const token = user.generateAuthToken();
       res.header('x-auth-token', token).json({
        data: user,
        token: token
       });
    } catch (ex: any ) {
        console.log(ex.message);
    }

    


});


export default AuthRouter;