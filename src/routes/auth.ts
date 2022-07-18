import { Request, Response, Router}  from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User  from '../models/user';
import login from '../schemas/login';
import validate  from '../schemas/user';
import _  from 'lodash'


const AuthRouter: Router = Router();



AuthRouter.post('/register', async(req: Request, res: Response) => {
    const { error }  = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email:  req.body.email });
    if (user) return res.status(400).json({
        success: false,
        message: 'User already registered'
    });

    user = new User({
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

     try {
        const result = await user.save();
        console.log(result);
       res.status(200).json({
        data: {
            user: (_.pick(user, ['_id', 'userName', 'email']))
        }
      
       });
    } catch (ex: any ) {
        console.log(ex.message);
    }

});

AuthRouter.post('/login', async(req: Request, res: Response)=>{
    const { error }  = login(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {

    let user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        })
    };
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        })
    }else{
        return res.status(200).json({
            success: true,
            message: "user logged in successfully",
            data: {
                user: (_.pick(user, ['_id', 'userName', 'email'])),
                ...user.generateAuthToken()
            }
        })
    }
        
    } catch (ex: any) {
        console.log(ex.message);
    }

    

});


export default AuthRouter;