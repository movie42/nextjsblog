import { readFile } from "@/lib/readFile";
import type { NextApiRequest, NextApiResponse } from "next";

const postsHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case "GET":
      const files = readFile();
      const data = files.filter((file) => file.meta.data.slug === id);
      res.status(200).json({ data });
      break;
    // case "PUT":
    //   // Update or create data in your database
    //   res.status(200).json({ id, name || `User ${id}` });
    //   break;
    // default:
    //   res.setHeader("Allow", ["GET", "PUT"]);
    //   res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default postsHandler;
