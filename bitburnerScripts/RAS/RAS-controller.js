/** @param {NS} ns */
export async function main(ns) {
	var hostServer = ns.getHostname();
	var growString = ns.read('/RAS/config/ServerGrowList.txt');
	var weakenString = ns.read('/RAS/config/ServerWeakenList.txt');
	var hackString = ns.read('/RAS/config/ServerHackList.txt');
	var growList = growString.split(',');
	var weakenList = weakenString.split(',');
	var hackList = hackString.split(',');
	ns.exec('RAS/RAS-logs.js', hostServer);
	while (true) {
		for (var server in growList){
			var growServer = growList[server];
			if ((ns.getServerMaxRam(growServer) * .85) < ns.getServerMaxRam(growServer)) {
				ns.exec('/RAS/RAS-growcontroller.js', hostServer, 1, growServer);
			};
		};
		for (var server in weakenList){
			var weakenServer = weakenList[server];
			if ((ns.getServerMaxRam(weakenServer) * .85) < ns.getServerMaxRam(weakenServer)) {
				ns.exec('/RAS/RAS-weakencontroller.js', hostServer, 1, weakenServer);
			};
		};
		for (var server in hackList){
			var hackServer = hackList[server];
			if ((ns.getServerMaxRam(hackServer) * .85) < ns.getServerMaxRam(hackServer)) {
				ns.exec('/RAS/RAS-hackcontroller.js', hostServer, 1, hackServer);
			};
		};
		await ns.sleep(5000);
	};
};