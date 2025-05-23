import { prisma } from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res)=> {

  const body = req.body
 // console.log(body)
  try {
    await prisma.chief.update({
      where: {id: req.body.id},
      data: {
        name: req.body.name,
        pos: req.body.pos,
        ao: Number(req.body.ao),
        ro: Number(req.body.ro),
        ta: Number(req.body.ta),
        fp: Number(req.body.fp),
        fa: Number(req.body.fa),
      }
    });
    res.status(200).json({success: true});
  } catch (err) {
    console.log(err);
    res.status(403).json({success: false });
  }
}