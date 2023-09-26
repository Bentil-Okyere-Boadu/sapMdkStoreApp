{
	"_Name": "FirstMDKApp",
	"Version": "/FirstMDKApp/Globals/AppDefinition_Version.global",
	"MainPage": "/FirstMDKApp/Pages/Main.page",
	"OnLaunch": [
		"/FirstMDKApp/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/FirstMDKApp/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/FirstMDKApp/Actions/Service/InitializeOffline.action",
	"Styles": "/FirstMDKApp/Styles/Styles.less",
	"Localization": "/FirstMDKApp/i18n/i18n.properties",
	"_SchemaVersion": "23.4"
}