# Mobile App Automizer

![Mobile App Automizer Demo](img/demo.gif)

You can automize iOS and Android app's build, upload and versioning processes via **Mobile App Automizer** CLI tool. You can upload your app to **Apple App Store**, **Google Play Store** or your own **CDN**. You can use this tool for platform and frameworks below.

- Native iOS
- Native Android
- React Native
- Flutter
- may be others...

## Installation

You need to install [Node.js](https://nodejs.org/en/download/) first, then install the tool globally using this command:

```bash
npm install -g mobile-app-automizer
```

When the installation is completed, you can define your config's by switching your repo that includes your mobile apps via the command below.

```bash
mobile-app-automizer --install
```

![Mobile App Automizer Install](img/install.gif)

When you define all preferences, a config file called **.ma-automizer.js** will be automatically added to your repo. You can change this file whenever you want. Don't forget to commit this file so that you don't lose your preferences.

### Upload

**CDN**

If you choose to upload your app to your own CDN then don't forget to update functions and values on the upload section in the file **.ma-automizer.js**. This tool automatically creates **manifest.plist** and **exportOptions.plist** files for iOS app.

**Apple App Store** (Experimental)

If you choose to upload your app to Apple App Store then this CLI tool automatically will add **exportOptions.plist** file to your repo.

**Google Play Store** (Experimental)

If you choose to upload your app to Google Play Store then you should install [gradle-play-publisher](https://github.com/Triple-T/gradle-play-publisher).

### Firebase (Just for iOS)

If you use Firebase, these following files must be included in your repo. Default folder is **ios/firebase**, if you want you can change this firebase folder path in **.ma-automizer.js**.

```
└── myApp
	└── ios
		└── firebase
			├── GoogleService-Info.plist
			├── GoogleService-Info-production.plist
			└── GoogleService-Info-stage.plist
```

**GoogleService-Info-production.plist** file must contain **production** values. **GoogleService-Info-stage.plist** file must contain **stage** values. The content of **GoogleService-Info.plist** file will automatically change once you start new build depending environment value you choose.

For example: If you choose **stage** environment type while starting build, the content of **GoogleService-Info.plist** file will change with the content of **GoogleService-Info-stage.plist** file.

## How to use

You can start build, upload and versioning processes with this one line command below.

```bash
mobile-app-automizer
```

![Mobile App Automizer Demo](img/demo.gif)

When you execute this command, environment value will be **production** and versioning value will be **patch** in default.

### Stage

If you want to start the process for stage environment, you can give **--stage** parameter as below;

```bash
mobile-app-automizer --stage
```

PS: If you give the **--stage** parameter, this tool will skip versioning process.

### Verbose

If you want to see what this tool is doing in the background, you can give **--verbose** parameter.

```bash
mobile-app-automizer --verbose
```

### Versioning

There are 3 types of versioning **patch**, **minor** and **major**. If you're not sure which one you will select, take a look [semantic versioning](https://semver.org/) website.

Versioning only work for **production** environment and default value is **patch**. If you want to choose the other types, you can give **--minor** and **--major** parameters as below.

```bash
mobile-app-automizer --minor
```

```bash
mobile-app-automizer --major
```

PS: If you use versioning, you should have **package.json** file in your repo.

## Support

If you have an issue with this CLI tool, please open an [issue](https://github.com/Trendyol/mobile-app-automizer/issues).

## Contributing

Pull requests are welcome.

## License

This project is licensed under the MIT License