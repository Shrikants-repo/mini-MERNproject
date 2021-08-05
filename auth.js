const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');


const User = require('../model/userSchema');

router.get('/', (req, res)=>{
        res.send('hello from auth')
})

router.post('/register', async(req, res)=>{

    const { name , email , phone ,work , password , cpassword } = req.body;
    
    if(!name || !email || !phone || !work || !password || !cpassword )
    {
        return res.json({ message:"issue with number of inpues"});
    }
    
    try {
        const responce =await User.findOne({ email: email});
        
        if(responce){
            return res.json({ message:"already present"});
        }

        const user = new User({name , email , phone ,work , password , cpassword});
         
        const saving=await user.save();
        if(saving)
        {
            res.send("saved successfully");
        }
        else
        {
            res.send("issue with  successfully");
        }
    
    } catch (error) {
        console.log(error);
        
    }

 
})

router.post('/sig',async(req, res)=>{

    try {
        
        const {email, password}= req.body;
        
        if(!email || !password)
        {
            return res.json({ message:"fill the data"});
        }

        const responce1 =await User.findOne({ email: email});
        
        const ismatch =await bcryptjs.compare(password , responce1.password);

        let token = await  responce1.generateAuthToken();
        console.log(token);
        
        if(!ismatch)
        {
            return res.json({ message:"issue with email"});
            
        }
        else{
            
        res.json({ message: "yup its done password matched"})
        }
        



    } catch (error) {
        console.log(error);
    }

})    

module.exports = router;
