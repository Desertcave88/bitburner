/** @param {NS} ns */
export async function main(ns) {
	var currentlevel = ns.getHackingLevel();
	ns.exec('/client-side/clientai.js', 'home');
	while (true) {
		if (currentlevel < ns.getHackingLevel()) {
			currentlevel = ns.getHackingLevel();
			ns.exec('/client-side/clientai.js', 'home');
		}
		await ns.sleep(5000);
	}
}