# Osembo School System: Android app

Every push to `main` builds the app in `www/index.html` into an APK and publishes it under **Releases**.

## Set up (once)
1. Create a GitHub repository and upload everything in this folder, including the hidden `.github` folder.
2. **Create a signing key** (needed so updates install over the old version without losing data). On a computer with Java:
   `keytool -genkeypair -v -keystore osembo.jks -alias osembo -keyalg RSA -keysize 2048 -validity 10000`
   Then turn it into text: Linux `base64 -w0 osembo.jks`, Mac `base64 -i osembo.jks`, Windows `certutil -encode osembo.jks k.txt`.
   Keep `osembo.jks` and the passwords safe forever. If lost, phones must reinstall.
3. In GitHub: **Settings, Secrets and variables, Actions, New repository secret**. Add:
   `ANDROID_KEYSTORE_BASE64` (the text from step 2), `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS` (osembo), `ANDROID_KEY_PASSWORD`.
4. Go to **Actions, Build and publish Android APK, Run workflow**.

## Releasing an update
Replace `www/index.html` with the new HTML file (keep the name `index.html`) and commit. A new APK appears under **Releases** in about 5 to 10 minutes. Share the APK on WhatsApp; teachers tap it to install or update.

## Notes
- Teachers may need to allow "Install unknown apps" the first time.
- Backups, PDFs and sync files open the phone's share menu so they can be sent on WhatsApp.
- Icon: replace `resources/icon.png` (1024 x 1024) to change it.
