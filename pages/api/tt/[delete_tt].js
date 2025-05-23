import { prisma } from "../../../lib/prisma";


// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res)=> {

const ticket_id = req.query.delete_tt;
  try {
    await prisma.trip_ticket.delete({
      where: {ticket_id}  
    });
    res.status(200).json({success: true});
  } catch (err) {
    console.log(err);
    res.status(403).json({success: false });
  }
}