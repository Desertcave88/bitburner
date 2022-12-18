/** @param {NS} ns */
import { maxThreads } from '/RAS/functions.js';
export async function main(ns) {
	var filestring = ns.read('Serverlist.txt');
	var serverlist = filestring.split(',');
	for (var server in serverlist) {
		var target = serverlist[server];
		if ((ns.getServerMaxMoney(target) > 0) && ((ns.getServerMaxMoney(target) * .9) > ns.getServerMoneyAvailable(target))) {
			var growthMuliplyer = Math.round((ns.getServerMaxMoney(target) * .8) / ns.getServerMoneyAvailable(target));
			var growthThreadCount = Math.floor(ns.growthAnalyze(target, growthMuliplyer, 1));
			growthThreadCount = maxThreads(ns, '/RAS/grow.js', 'RAS-grow-01', growthThreadCount);
			var securitylevel = ns.growthAnalyzeSecurity(growthThreadCount, target, 1) + ns.getServerSecurityLevel(target);
			if ((100 > securitylevel) && (growthThreadCount > 0)) {
				ns.exec('/RAS/grow.js', 'RAS-grow-01', growthThreadCount, target);
			}
		}
	}
}