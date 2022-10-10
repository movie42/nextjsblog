// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "../../lib/readFile";

type Data = {
  posts: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const files = readFile();

  return res.status(200).json({ posts: files });
}
