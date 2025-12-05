BEGIN;

ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own"
ON "profiles"
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "profiles_insert_own"
ON "profiles"
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "profiles_update_own"
ON "profiles"
FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

COMMIT;

