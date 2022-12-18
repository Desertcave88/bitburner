/** @param {NS} ns */
import { maxThreads } from '/RAS/functions.js';
export async function main(ns) {
	var filestring = ns.read('Serverlist.txt');
	var serverlist = filestring.split(',');
	for (var server in serverlist) {
		var target = serverlist[server];
		if ((ns.getServerMaxMoney(target) * .8) < (ns.getServerMoneyAvailable(target)) && (ns.getServerMaxMoney(target) > 0)) {
			var threadcount = Math.round((ns.getServerMaxMoney(target) * .25) / ns.hackAnalyze(target));
			threadcount = maxThreads(ns, '/RAS/hack.js', 'RAS-hack-01', threadcount);
			if (threadcount > 0) {
				ns.exec('/RAS/hack.js', 'RAS-hack-01', threadcount, target);
			}
		}
	}
}