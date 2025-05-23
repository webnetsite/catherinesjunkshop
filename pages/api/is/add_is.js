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
  try {
    await prisma.issuance_slip.create({
      data: {
        id: req.body.id,
        ticket_id: req.body.ticket_id,
        date_req: moment(body.date_req, 'YYYY-MM-DD').add('days',1).toDate(),
        charging: body.charging,
        charge_to:body.charge_to,
        req_officer: body.req_officer,
        vehicle: body.vehicle,
        driver: body.driver,
        prepared: body.prepared,
        approved: body.approved,
        consumableproduct:body.consumableproduct,
        liters: Number(body.diesel),
        pos1: body.pos1,
        pos2: body.pos2,

      }
    });
    res.status(200).json({success: true});
  } catch (err) {
    console.log(err);
    res.status(403).json({success: false });
  }
}