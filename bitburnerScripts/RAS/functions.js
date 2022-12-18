/** @param {NS} ns */
export function maxThreads(ns, script, host, threadsDesired) {
	var serverMaxRam = ns.getServerMaxRam(host);
	var serverUsedRam = ns.getServerUsedRam(host);
	var serverCurrentRam = (serverMaxRam - serverUsedRam);
	var scriptCost = ns.getScriptRam(script, host);
	var maxThreads = Math.floor(serverCurrentRam / scriptCost);
	if (maxThreads < threadsDesired) {
		threadsDesired = maxThreads;
	};
	return threadsDesired;
};