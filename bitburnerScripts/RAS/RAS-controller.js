/** @param {NS} ns */
export async function main(ns) {
	while (true) {
		if (!(ns.scriptRunning('/RAS/grow.js', 'RAS-grow-01'))) {
			ns.exec('/RAS/RAS-growcontroller.js', 'home');
		}
		if (!(ns.scriptRunning('/RAS/weaken.js', 'RAS-weaken-01'))) {
			ns.exec('/RAS/RAS-weakencontroller.js', 'home');
		}
		if (!(ns.scriptRunning('/RAS/hack.js', 'RAS-hack-01'))) {
			ns.exec('/RAS/RAS-hackcontroller.js', 'home');
		}
		await ns.sleep(5000);
	}
}