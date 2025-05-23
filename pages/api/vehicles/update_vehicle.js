import { prisma } from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res)=> {

  const body = req.body
 // console.log(body)
  try {
    await prisma.vehicle.update({
      where: {id: req.body.id},
      data: {
        plate_number: req.body.plate_number,
        name: req.body.name,
        make: req.body.make,
        division_ass: req.body.division_ass,
      }
    });
    res.status(200).json({success: true});
  } catch (err) {
    console.log(err);
    res.status(403).json({success: false });
  }
}