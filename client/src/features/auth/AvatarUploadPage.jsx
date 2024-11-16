"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Upload } from "lucide-react";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

export default function AvatarUploadPage() {
  const { user, updateAvarter, successType } = authService();
  const { toast } = useToast();
  const imageUrl = user?.profile;
  const [newImageUrl, setNewImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  console.log(user);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setNewImageUrl(e.target?.result);
          setError(null);
        };
        reader.readAsDataURL(file);
      } else {
        setError("Please select a valid image file.");
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleConfirmUpload = async () => {
    if (newImageUrl && fileInputRef.current.files[0]) {
      const formData = new FormData();
      formData.append("newImageUrl", fileInputRef.current.files[0]); // Add the file
      formData.append("username", user.username); // Add the username

      try {
        await updateAvarter(formData); // Call the service
        setNewImageUrl(null);
        console.log("Image uploaded successfully");
      } catch (error) {
        setError("Failed to upload the image. Please try again.");
        console.error("Upload error:", error);
      }
    }
  };

  useEffect(() => {
    if (successType === "updated-avatar") {
      toast({
        title: "Avatar Updated",
        description: "Your avatar has been updated successfully.",
      });
    }
  }, [successType, toast]);

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <Avatar className="w-32 h-32">
        <AvatarImage src={newImageUrl || imageUrl || ""} alt="Profile" />
        <AvatarFallback>
          <User className="w-16 h-16 text-gray-400" />
        </AvatarFallback>
      </Avatar>
      {newImageUrl ? (
        <div className="flex space-x-2">
          <Button onClick={handleConfirmUpload} variant="default">
            <Upload className="w-4 h-4 mr-2" />
            Upload New Photo
          </Button>
          <Button onClick={() => setNewImageUrl(null)} variant="outline">
            Cancel
          </Button>
        </div>
      ) : (
        <Button onClick={handleUploadClick} variant="outline">
          {imageUrl ? "Change Profile Picture" : "Upload Profile Picture"}
        </Button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload profile picture"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
