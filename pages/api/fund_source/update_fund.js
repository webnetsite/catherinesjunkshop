import { prisma } from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res)=> {

  const body = req.body
 // console.log(body)
  try {
    await prisma.fund_source.update({
      where: {id: req.body.id},
      data: {
        name: req.body.name,
      }
    });
    res.status(200).json({success: true});
  } catch (err) {
    console.log(err);
    res.status(403).json({success: false });
  }
}