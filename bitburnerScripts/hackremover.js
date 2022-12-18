/** @param {NS} ns */
var serverlist = [];

export async function main(ns) {
	build(ns, ns.getHostname())
	var targetfile = ns.args[0];
	for (var server in serverlist) {
		var target = serverlist[server];
		ns.killall(target, true);
		if (ns.fileExists(targetfile, target) && (target != 'home')) {
			ns.rm(targetfile, target);
			ns.tprint('Removed ' + targetfile + ' from ' + target);
		}
		else {
			ns.tprint(targetfile + ' not found on ' + target);
		}
	}
}

function build(ns, target) {
	var foundserverlist = ns.scan(target);
	for (var server in foundserverlist) {
		var target = foundserverlist[server];
		if (!(serverlist.includes(target))) {
			serverlist.push(String(target));
			build(ns, target);
		}
	}
}