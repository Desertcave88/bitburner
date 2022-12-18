/** @param {NS} ns */
export async function main(ns) {
	ns.tprint('Max Money: ' + ns.getServerMaxMoney(ns.args[0]));;
	ns.tprint('Current Money: ' + Math.round(ns.getServerMoneyAvailable(ns.args[0])));
	ns.tprint('Percentage of Max: ' + Math.round(ns.getServerMaxMoney(ns.args[0]) / ns.getServerMoneyAvailable(ns.args[0])) + '%');
}