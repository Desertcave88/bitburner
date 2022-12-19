/** @param {NS} ns */
import { maxThreads } from '/RAS/functions.js';
export async function main(ns) {
	var RASserver = ns.args[0];
	var filestring = ns.read('Serverlist.txt');
	var serverlist = filestring.split(',');
	for (var server in serverlist) {
		var clientServer = serverlist[server];
		if ((ns.getServerMaxMoney(clientServer) > 0) && ((ns.getServerMaxMoney(clientServer) * .9) > ns.getServerMoneyAvailable(clientServer))) {
			var growthMuliplyer = Math.round((ns.getServerMaxMoney(clientServer) * .8) / ns.getServerMoneyAvailable(clientServer));
			var growthThreadCount = Math.floor(ns.growthAnalyze(clientServer, growthMuliplyer, 1));
			growthThreadCount = maxThreads(ns, '/RAS/grow.js', RASserver, growthThreadCount);
			var securitylevel = ns.growthAnalyzeSecurity(growthThreadCount, clientServer, 1) + ns.getServerSecurityLevel(clientServer);
			if ((100 > securitylevel) && (growthThreadCount > 0)) {
				ns.exec('/RAS/grow.js', RASserver, growthThreadCount, clientServer);
			};
		};
	};
};