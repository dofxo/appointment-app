import { supabase } from "../Supabase/initialize";

const uploadProfilePicture = async (userId: string, file: any) => {
  try {
    const bucketName = "profile-pictures";
    const fileName = `${userId}_${Date.now()}_${file.name}`;

    // Upload the file to storage
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get the public URL for the uploaded image
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    const profilePictureUrl = urlData.publicUrl;

    // Update the user's profile_picture field in the database
    const { error: updateError } = await supabase
      .from("users")
      .update({ profile_picture: profilePictureUrl })
      .eq("id", userId);

    if (updateError) return updateError;

    return profilePictureUrl;
  } catch (error) {
    console.error(error);
  }
};

export default uploadProfilePicture;
