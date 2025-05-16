// uploadthing.config.js
import { createUploadthing} from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
     console.log("File uploaded:", file.ufsUrl);
    }),
};


