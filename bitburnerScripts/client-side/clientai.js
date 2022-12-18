/** @param {NS} ns */
export async function main(ns) {
	ns.run('/client-side/scanall.js');
	await ns.sleep(1000);
	ns.run('/client-side/crack.js');
	await ns.sleep(1000);
	ns.run('/client-side/inject.js');
	await ns.sleep(1000);
	ns.run('/client-side/clienthandler.js');
}