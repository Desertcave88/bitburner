/** @param {NS} ns */
import { maxThreads } from '/RAS/functions.js';
export async function main(ns) {
	var RASserver = ns.args[0];
	var filestring = ns.read('Serverlist.txt');
	var serverlist = filestring.split(',');
	for (var server in serverlist) {
		var clientServer = serverlist[server];
		var targetzone = ns.getServerMinSecurityLevel(clientServer) + 5;
		if (targetzone < ns.getServerSecurityLevel(clientServer)) {
			var threadcount = Math.floor((ns.getServerSecurityLevel(clientServer) - ns.getServerMinSecurityLevel(clientServer)) / .05);
			threadcount = maxThreads(ns, '/RAS/weaken.js', RASserver, threadcount);
			if (threadcount > 0) {
				ns.exec('/RAS/weaken.js', RASserver, threadcount, clientServer);
			};
		};
	};
};