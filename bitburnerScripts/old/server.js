/** @param {NS} ns */
export async function main(ns) {
	var outport = ns.getPortHandle(2);
	var inport = ns.getPortHandle(1);
	while (true) {
		while (inport.empty()) {
			ns.printf('Waiting for packet');
			await ns.sleep(1000);
		}
		var clientname = inport.read();
		var clientmaxram = ns.getServerMaxRam(clientname);
		var clientminsecuritylevel = ns.getServerMinSecurityLevel(clientname);
		var clientsecuritylevel = ns.getServerSecurityLevel(clientname);
		var clientmaxmoney = ns.getServerMaxMoney(clientname);
		var clientmoney = ns.getServerMoneyAvailable(clientname);

		var targetsecuritylevel = (clientsecuritylevel - clientminsecuritylevel);
		var targetmoneylevel = (clientmaxmoney * .8);
		var maxthreads = Math.floor(clientmaxram / ns.getScriptRam('client.js', 'home'));

		if (targetsecuritylevel > 5) {
			var func = 'weaken'
		}
		else if (targetmoneylevel > clientmoney) {
			var func = 'grow'
		}
		else {
			var func = 'hack'
		}

		var packet = { client: clientname, func: func, threads: maxthreads };
		ns.print(packet);

		while (!(outport.tryWrite(packet))) {
			ns.printf('Trying to send packet');
			await ns.sleep(5000);
		}

	}
}