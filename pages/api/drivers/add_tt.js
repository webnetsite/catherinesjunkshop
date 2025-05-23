import { prisma } from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res)=> {

  const session = await getSession({req})
  if(!session){
      res.status(401).json({error:'Unauthorized User'})
  }

  const body = req.body
 // console.log(body)
  try {
    await prisma.driver.create({
      data: {
        name: req.body.name,
        position: req.body.position
      }
    });
    res.status(200).json({success: true});
  } catch (err) {
    console.log(err);
    res.status(403).json({success: false });
  }
}