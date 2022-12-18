/** @param {NS} ns */
export async function main(ns) {
	var clientname = ns.getHostname();
	var outport = ns.getPortHandle(1);
	var inport = ns.getPortHandle(2);
	while (true) {
		while (!(outport.tryWrite(clientname))) {
			ns.printf('Trying to send packet');
			await ns.sleep(5000);
		}
		while (inport.peek()['client'] != clientname) {
			ns.printf('Waiting for packet');
			await ns.sleep(5000);
		}
		var packet = inport.read();
		ns.print(packet);
		if (packet['func'] == 'weaken') {
			await ns.weaken(clientname, packet['threads']);
		}
		else if (packet['func'] == 'grow') {
			await ns.grow(clientname, packet['threads']);
		}
		else if (packet['func'] == 'hack') {
			await ns.hack(clientname, packet['threads']);
		}
	}
}