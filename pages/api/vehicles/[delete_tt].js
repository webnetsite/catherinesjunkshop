import { prisma } from "../../../lib/prisma";


// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res)=> {

const id = Number(req.query.delete_tt);
  try {
    await prisma.vehicle.delete({
      where: {id}  
    });
    res.status(200).json({success: true});
  } catch (err) {
    console.log(err);
    res.status(403).json({success: false });
  }
}