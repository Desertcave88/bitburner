/** @param {NS} ns */
export async function main(ns) {
	var filestring = ns.read('Serverlist.txt');
	var serverlist = filestring.split(',');
	for (var server in serverlist) {
		var target = serverlist[server];
		if ((ns.hasRootAccess(target)) && !(ns.fileExists('client.js', target)) && (0 < ns.getServerMoneyAvailable(target))) {
			ns.scp('/client-side/client.js', target, 'home');
			ns.mv(target, '/client-side/client.js', 'client.js');
		}
	}
}