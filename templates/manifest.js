module.exports = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>items</key>
  <array>
    <dict>
      <key>assets</key>
      <array>
        <dict>
          <key>kind</key>
          <string>software-package</string>
          <key>url</key>
          <string>{{IPA_URL}}</string>
        </dict>
      </array>
      <key>metadata</key>
      <dict>
        <key>bundle-identifier</key>
        <string>{{BUNDLE_IDENTIFIER}}</string>
        <key>bundle-version</key>
        <string>{{BUILD_NUMBER}}</string>
        <key>kind</key>
        <string>software</string>
        <key>title</key>
        <string>{{TITLE}}</string>
      </dict>
    </dict>
  </array>
</dict>
</plist>`;
