import { prisma } from "../../lib/prisma";
// GET /api/status/:id
export default async function handler(req, res) {

  const ticket_id = req.query.getTicket;

  try {
    const result = await prisma.trip_ticket.findUnique({
        where: {ticket_id}
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({success: false });
  }

}