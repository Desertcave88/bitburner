/** @param {NS} ns */
export async function main(ns) {
	var filestring = ns.read('Serverlist.txt');
	var serverlist = filestring.split(',');
	var scriptcost = ns.getScriptRam('/client-side/client.js', 'home');
	for (var server in serverlist) {
		var target = serverlist[server];
		var serverram = ns.getServerMaxRam(target);
		if ((ns.fileExists('client.js', target)) && (serverram >= scriptcost) && (!(ns.scriptRunning('client.js', target)))) {
			var numofscripts = Math.floor(serverram / scriptcost);
			ns.exec('client.js', target, numofscripts);
			ns.tprint('Target: ' + target + ' number of scripts ' + numofscripts);
		}

	}
}