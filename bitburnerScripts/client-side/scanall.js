/** @param {NS} ns */
var serverlist = [];
export async function main(ns) {
	serverlist = [];
	build(ns, ns.getHostname())
	for (var server = 0; server < serverlist.length; server++) {
		var target = serverlist[server];
		if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel() || target == 'home') {
			serverlist.splice(server, 1);
			server--;
		}
	}
	ns.write('Serverlist.txt', serverlist.join(), "w");
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