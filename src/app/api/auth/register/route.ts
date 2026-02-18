import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  try {
    await connectDb()
    const {name , email , password}=await req.json()

    if(!name || !email || !password){
      return NextResponse.json(
        {message:"Please fill all the fields"},
        {status:400}
      )
    } 

    const existUser = await  User.findOne({email})
    if(existUser){
      return NextResponse.json(
        {message:"User already exist with this email"},
        {status:400}
      )
    }

    if(password.length < 6){
      return NextResponse.json(
        {message:"Password must be at least 6 characters long"},
        {status:400}
      )
    }

    const hashedPassword = await bcrypt.hash(password , 10)
    const user = await User.create({
      name,email,password:hashedPassword
    })

    return NextResponse.json(
      user,
      {status:200},
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
    {message:"Error registering user",error},
    {status:500}
    )
    
  }
}

// sab se plhe dbconnect krlo 
// name email password milega frontend se 
// sari fields fill hai ya nhi ye check krenge angr koe field empty ha to message pass krdenge plhe data pura bharo 
// fir email check krenge ki email already exist to nhi krta 
// fir password ko check krlenge 6 characeter se bda hoga 
// fir uske baad password ko hash krke strore krenge database me 