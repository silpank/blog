//define logic functions
const users = require('../Models/userSchema')
//register logic
exports.register=async(req,res)=>{
    console.log('Inside Register Function');
    try{
        const {userName, email, password} = req.body
        console.log(`${userName} ${email} ${password}`);
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(402).json("User already exists")
        }
        else{
            const newUser = new users({
                username,email,password
            })
            await newUser.save()
            res.status(200).json("User created successfully")
        }
    }
    catch(error){
        res.status(500).json("server error")
    }
}

exports.login=async(req,res)=>{
    console.log('Inside Login Function');
    try{
        console.log(req.body)
        const {email, password} = req.body
        console.log(`${email} ${password}`);
        const user = await users.findOne({email,password})
        if(user){
            const token = jwt.sign({userId:user._id},"superkey2024")
            console.log(token);
            res.status(200).json({user,token})
        }
        else{
            res.status(402).json("User not found")
        }
    }
    catch(error){
        res.status(500).json("server error")
    }
}