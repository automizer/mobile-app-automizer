module.exports = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>method</key>
	<string>{{METHOD}}</string>
	<key>teamID</key>
	<string>{{TEAM_ID}}</string>
	<key>signingStyle</key>
	<string>automatic</string>
	<key>provisioningProfiles</key>
	<dict>
		<key>{{PRODUCTION_BUNDLE_IDENTIFER}}</key>
		<string>{{PRODUCTION_SCHEME}}</string>
		<key>{{STAGE_BUNDLE_IDENTIFER}}</key>
		<string>{{STAGE_SCHEME}}</string>
	</dict>
</dict>
</plist>`;
