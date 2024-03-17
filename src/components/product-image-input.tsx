import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useCallback, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface ProductImageUploadProps {
  acceptedFileTypes: string[];
  onFilesSelected: (files: File[]) => void;
  error?: string;
}

export function ProductImageUpload({
  acceptedFileTypes,
  onFilesSelected,
  error,
}: ProductImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        return;
      }
      const file = acceptedFiles[0];
      if (file) {
        setFile(file);
        onFilesSelected([file]);
      }
    },
    [onFilesSelected],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: generateClientDropzoneAccept(acceptedFileTypes),
    maxFiles: 1,
  });

  const removeFile = () => {
    setFile(null);
    onFilesSelected([]);
  };

  return (
    <div className="space-y-2">
      <Label
        className={`text-sm font-semibold ${error ? "text-destructive" : ""}`}
      >
        Product image
      </Label>
      <div
        {...getRootProps()}
        className="overflow-hidden rounded-xl border border-dashed"
      >
        {file ? (
          <ImagePreview file={file} onRemove={removeFile} />
        ) : (
          <>
            <input {...getInputProps()} />
            <DropzonePrompt />
          </>
        )}
      </div>
      {error && (
        <p className="text-sm font-semibold text-destructive">{error}</p>
      )}
    </div>
  );
}

const ImagePreview = ({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) => (
  <div className="relative h-60 w-full">
    <Image
      draggable="false"
      className="object-cover"
      src={URL.createObjectURL(file)}
      alt="Uploaded Image"
      fill
    />
    <div className="absolute right-0 top-0 p-2">
      <Button
        onClick={onRemove}
        variant="ghost"
        size="icon"
        className="rounded-full bg-background/20 backdrop-blur hover:bg-background/40"
      >
        <X />
      </Button>
    </div>
  </div>
);

const DropzonePrompt = () => (
  <div className="group flex min-h-24 cursor-pointer flex-col items-center justify-center p-4">
    <p className="font-semibold text-muted-foreground group-hover:text-primary">
      Add product image
    </p>
  </div>
);
