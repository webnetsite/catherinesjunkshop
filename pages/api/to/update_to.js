import { prisma } from "../../../lib/prisma";
import moment from "moment";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res)=> {

  const body = req.body
  console.log(body)
  try {
    await prisma.travel_order.update({
      where: {id: req.body.id},
      data: {
        date_from: moment(req.body.date_from, 'YYYY-MM-DD').add('days',1).toDate(),
        date_to: moment(req.body.date_to, 'YYYY-MM-DD').add('days',1).toDate(),
        recommending: req.body.recommending,
        approval: req.body.approval,
        pos_recommending: req.body.pos2,
        pos_approval: req.body.pos3,
      }
    });
    res.status(200).json({success: true});
  } catch (err) {
    console.log(err);
    res.status(403).json({success: false });
  }
}