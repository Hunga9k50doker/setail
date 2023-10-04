export const generateUniqueFileName = (file) => {
  // Generate a unique file name
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const originalFileName = file.name;
  const fileExtension = originalFileName.split(".").pop();
  const uniqueFileName = `${timestamp}-${randomString}.${fileExtension}`;
  return uniqueFileName;
};
