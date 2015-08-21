self.addEventListener('message', function (e) {
	var data = e.data;
	var xdata = [];
	switch (data.cmd) {
	case 'updateStars':
		console.log('in graphics');
		xdata = updateGraphics(data.data);
		self.postMessage({'wprops':xdata});
		break;
	case 'start':
		console.log('in start');
		self.postMessage('WORKER STARTED: ' + data.msg);
		console.log(data.msg);
		break;
	case 'stop':
		self.postMessage('WORKER STOPPED: ' + data.msg +
			'. (buttons will no longer work)');
		self.close(); // Terminates the worker.
		break;
	default:
		self.postMessage('Unknown command: ' + data.msg);
	};
}, false);

function updateGraphics(data) {
	var indx = 0;
	var wprops = data;
	wprops.map(function (n) {
		wprops[indx].x = n.x + .05;
		wprops[indx].y = n.y + .1;
		indx++;
	})
	return wprops;
}
