import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const userId = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId: userId };
};
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Defining file route
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(() => handleAuth())
    // This code RUNS ON YOUR SERVER after upload on usccf
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
