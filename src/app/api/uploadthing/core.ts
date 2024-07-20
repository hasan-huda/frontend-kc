
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({}))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ file }) => {
      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();

      const imgMetadata = await sharp(Buffer.from(buffer)).metadata();
      const { width, height } = imgMetadata;

      // Handle image processing if needed here

      return { url: file.url, width, height };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;