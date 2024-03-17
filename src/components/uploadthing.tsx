import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers
} from "@uploadthing/react";

import type { fileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<fileRouter>();
export const UploadDropzone = generateUploadDropzone<fileRouter>();
export const { useUploadThing } = generateReactHelpers<fileRouter>();
