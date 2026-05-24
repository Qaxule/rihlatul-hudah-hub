
DROP POLICY IF EXISTS "Avatar images publicly readable by path" ON storage.objects;

-- Only the owner can list/select their own avatar objects through the API.
-- The bucket remains public so /storage/v1/object/public/avatars/... URLs still resolve for display.
CREATE POLICY "Users can view their own avatar objects"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
