/** @param {NS} ns */
import { maxThreads } from '/RAS/functions.js';
export async function main(ns) {
	var RASserver = ns.args[0];
	var filestring = ns.read('Serverlist.txt');
	var serverlist = filestring.split(',');
	for (var server in serverlist) {
		var clientServer = serverlist[server];
		if ((ns.getServerMaxMoney(clientServer) * .8) < (ns.getServerMoneyAvailable(clientServer)) && (ns.getServerMaxMoney(clientServer) > 0)) {
			var threadcount = Math.round((ns.getServerMaxMoney(clientServer) * .25) / ns.hackAnalyze(clientServer));
			threadcount = maxThreads(ns, '/RAS/hack.js', RASserver, threadcount);
			if (threadcount > 0) {
				ns.exec('/RAS/hack.js', RASserver, threadcount, clientServer);
			};
		};
	};
};