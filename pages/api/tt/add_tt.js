import { prisma } from "../../../lib/prisma";
import moment from "moment";
import { getSession } from "next-auth/react";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res)=> {

  const session = await getSession({req})
  if(!session){
      res.status(401).json({error:'Unauthorized User'})
  }

  const body = req.body
  console.log(body)
  try {
    await prisma.trip_ticket.create({
      data: {
        ticket_id: req.body.ticket_id,
        date_from:moment(body.date_from, 'YYYY-MM-DD').add('days',1).toDate(),
        date_to:moment(body.date_to, 'YYYY-MM-DD').add('days',1).toDate(),
        driver_id: req.body.driver,
        alternatedriver_id: req.body.alternatedriver,
        vehicle_id:req.body.vehicle_id,
        destination: req.body.destination,
        purpose: req.body.purpose,
        approving_officer: req.body.approving_officer,
        pos1: req.body.pos1,
        pass1: req.body.pass1,
        pass2: req.body.pass2,
        pass3: req.body.pass3,
        pass4: req.body.pass4,
        pass5: req.body.pass5,
        pass6: req.body.pass6,
        pass7: req.body.pass7
      }
    });
    res.status(200).json({success: true});
  } catch (err) {
    console.log(err);
    res.status(403).json({success: false });
  }
}