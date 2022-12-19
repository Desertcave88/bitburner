/** @param {NS} ns */
export async function main(ns) {
    var inport = ns.getPortHandle(20);
    while(true) {
	    while(inport.empty()){
	        await ns.sleep(5000);
        };
        ns.print(inport.read().split(','));
    };
};