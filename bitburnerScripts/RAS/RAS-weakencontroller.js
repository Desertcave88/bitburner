/** @param {NS} ns */
import { maxThreads } from '/RAS/functions.js';
export async function main(ns) {
	var filestring = ns.read('Serverlist.txt');
	var serverlist = filestring.split(',');
	for (var server in serverlist) {
		var target = serverlist[server];
		var targetzone = ns.getServerMinSecurityLevel(target) + 5;
		if (targetzone < ns.getServerSecurityLevel(target)) {
			var threadcount = Math.floor((ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target)) / .05);
			threadcount = maxThreads(ns, '/RAS/weaken.js', 'RAS-weaken-01', threadcount);
			if (threadcount > 0) {
				ns.exec('/RAS/weaken.js', 'RAS-weaken-01', threadcount, target);
			}
		}
	}
}