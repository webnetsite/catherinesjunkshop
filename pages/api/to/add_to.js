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
    await prisma.travel_order.create({
      data: {
        tt_id: req.body.ticket_id,
        date_from:moment(body.date_from, 'YYYY-MM-DD').add('days',1).toDate(),
        date_to:moment(body.date_to, 'YYYY-MM-DD').add('days',1).toDate(),
        recommending: req.body.recommending,
        pos_recommending: req.body.pos2,
        approval: req.body.approval,
        pos_approval: req.body.pos3,
      }
    });
    res.status(200).json({success: true});
  } catch (err) {
    console.log(err);
    res.status(403).json({success: false });
  }
}