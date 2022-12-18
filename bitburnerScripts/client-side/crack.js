/** @param {NS} ns */
export async function main(ns) {
	var filestring = ns.read('Serverlist.txt');
	var serverlist = filestring.split(',');
	for (var server in serverlist) {
		var target = serverlist[server];
		if (!(ns.hasRootAccess(target))) {
			var portsneeded = ns.getServerNumPortsRequired(target);
			var portscracked = 0;
			if (ns.fileExists("BruteSSH.exe", "home")) {
				ns.brutessh(target);
				portscracked += 1;
			}
			if (ns.fileExists("FTPCrack.exe", "home")) {
				ns.ftpcrack(target);
				portscracked += 1;
			}
			if (ns.fileExists("HTTPWorm.exe", "home")) {
				ns.httpworm(target);
				portscracked += 1;
			}
			if (ns.fileExists("SQLInject.exe", "home")) {
				ns.sqlinject(target);
				portscracked += 1;
			}
			if (portscracked >= portsneeded) {
				ns.nuke(target);
			}
		}
	}
}