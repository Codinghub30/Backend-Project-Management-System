import bcryptjs from 'bcryptjs';
import User from "../model/authModel.js";

export const Signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    username === "" ||
    email === "" ||
    password === "" ||
    !username ||
    !email ||
    !password
  ) {
    return res.status(404).json({ message: "All feilds are neccessary" });
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUserModel = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      res.json({ message: "Email is already Present" });
    }

    await newUserModel.save();
    return res.json({ message: "user is created successfully" });
  } catch (err) {
    res.json({ message: "Error!!!!" });
  }
};

export const Signin = async (req, res) => {
    const {email, password} = req.body;

    try{
        const ValidEmail = await User.findOne({email});
        if(!ValidEmail){
            res.status(404).json({message:"Email is not found. Please Signup Again"});
        }
        const validpass =  bcryptjs.compareSync(password, ValidEmail.password);

        if(!validpass){
            res.status(401).json({message:"Password and email is not matching"});
        }
        res.json(ValidEmail);
    }

    catch(error){
     
            console.log(error);
            return res.status(500).json({message: "Internal Server Error"});
    
        
    }
}
