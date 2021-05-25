module.exports = `module.exports = {
  ios: {
    path: {
      root: 'ios/',
      workspace: 'ios/{{PRODUCTION_SCHEME}}.xcworkspace',
      archive: 'ios/archive/{{PRODUCTION_SCHEME}}.xcarchive',
      firebase: 'ios/firebase',
      export: 'ios/export',
      exportOptionsPlist: 'ios/exportOptions.plist',
      manifestPlist: 'ios/export/manifest.plist',
      infoPlist: 'ios/{{PRODUCTION_SCHEME}}/Info.plist',
      ipa: {
        production: 'ios/export/{{PRODUCTION_SCHEME}}.ipa',
        stage: 'ios/export/{{STAGE_SCHEME}}.ipa',
      },
    },
    version: {{IOS_VERSION}},
    build: {
      enabled: {{IOS_BUILD}},
      firebase: {{FIREBASE}},
      scheme: {
        production: '{{PRODUCTION_SCHEME}}',
        stage: '{{STAGE_SCHEME}}',
      },
    },
    upload: {
      enabled: {{IOS_UPLOAD}},
      method: '{{IOS_METHOD}}',
      username: '{{IOS_USERNAME}}',
      password: '{{IOS_PASSWORD}}',
      bundleIdentifier: {
        production: '{{PRODUCTION_BUNDLE_IDENTIFER}}',
        stage: '{{STAGE_BUNDLE_IDENTIFER}}',
      },
      cdn: {
        title: {
          production: 'YOUR_PRODUCTION_APP_TITLE',
          stage: 'YOUR_STAGE_APP_TITLE',
        },
        uploadIpa: async (ipaPath, env, buildNumber) => {
          const ipaFileUrl = await YOUR_UPLOAD_METHOD({ipaPath, env, buildNumber});
          return ipaFileUrl;
        },
        uploadManifest: async (manifestPath, env, buildNumber, downloadLinkPrefix) => {
          const manifestFileUrl = await YOUR_UPLOAD_METHOD({manifestPath, env, buildNumber});
          console.log(\`iOS Download Link: \${downloadLinkPrefix}\${manifestFileUrl}\`);
        },
      },
    },
  },
  android: {
    path: {
      root: 'android/',
      gradle: 'android/app/build.gradle',
      apk: {
        production: 'android/app/build/outputs/apk/production/release/app-production-release.apk',
        stage: 'android/app/build/outputs/apk/staging/release/app-staging-release.apk',
      },
    },
    version: {{ANDROID_VERSION}},
    build: {
      enabled: {{ANDROID_BUILD}},
    },
    upload: {
      enabled: {{ANDROID_UPLOAD}},
      method: '{{ANDROID_METHOD}}',
      cdn: {
        uploadApk: async (apkPath, env, buildNumber) => {
          const apkFileUrl = await YOUR_UPLOAD_METHOD({apkPath, env, buildNumber});
          console.log(\`Android Download Link: \${apkFileUrl}\`);
        },
      },
    },
  },
};`;
