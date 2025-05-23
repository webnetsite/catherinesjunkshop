import { prisma } from "../../../lib/prisma";


// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res)=> {

const id = req.query.delete_is;
  try {
    await prisma.issuance_slip.delete({
      where: {id}  
    });
    res.status(200).json({success: true});
  } catch (err) {
    console.log(err);
    res.status(403).json({success: false });
  }
}