class Main {
	constructor() {
		this.patchPlayButton();
		this.patchVolumeControl();
		this.patchProgressBar();
	}

	patchPlayButton() {
		document.querySelector('.ytp-play-button').addEventListener('keyup', event => {
			if(event.keyCode === 32) {
				event.preventDefault();
			}
		});
	}

	newControls(event, overridePageControls) {
		event.preventDefault();
		event.stopImmediatePropagation();
		const video = document.querySelector('video');
		if(event.keyCode === 38) { // Up arrow
			video.volume = video.volume > 0.95 ? 1 : video.volume + 0.05;
			const left = parseInt(document.querySelector('.ytp-volume-slider-handle').style.left);
			const delta = video.volume === 1 ? 40 : left < 40 ? left + 2 : 40;
			document.querySelector('.ytp-volume-slider-handle').style.left = delta + 'px';
		} else if (event.keyCode === 40) { // Down arrow
			video.volume = video.volume < 0.05 ? 0 : video.volume - 0.05;
			const left = parseInt(document.querySelector('.ytp-volume-slider-handle').style.left);
			const delta = video.volume === 0 ? 0 : left > 0 ? left - 2 : 0;
			document.querySelector('.ytp-volume-slider-handle').style.left = delta + 'px';
		} else if (event.keyCode === 37) { // Left arrow
			video.currentTime = video.currentTime - 5;
		} else if (event.keyCode === 39) { // Right arrow
			video.currentTime = video.currentTime + 5;
		} else if(event.keyCode === 32) { // Space
			video.paused ? video.play() : video.pause();
		} else if(event.keyCode === 13) { // Enter
			video.paused ? video.play() : video.pause();
		}

		if(overridePageControls) {
			if (event.keyCode === 36) { // Home
				video.currentTime = 0;
			} else if (event.keyCode === 35) { // End
				const maxVal = document.querySelector('.ytp-progress-bar').getAttribute('aria-valuemax');
				video.pause();
				video.currentTime = parseFloat(maxVal);
			} else if (event.keyCode === 34) { // Page down
				video.volume = 1;
				document.querySelector('.ytp-volume-slider-handle').style.left = '40px';
			} else if (event.keyCode === 33) { // Page up
				video.volume = 0;
				document.querySelector('.ytp-volume-slider-handle').style.left = 0;
			}
		}
	}

	patchProgressBar() {
		const container = document.querySelector('.ytp-progress-bar-container');
		const newContainer = container.cloneNode(true);
		newContainer.removeChild(newContainer.querySelector('.ytp-progress-bar'));
		newContainer.addEventListener('keydown', (event) => this.newControls(event, false), false);
		const containerParent = container.parentElement;
		containerParent.insertBefore(newContainer, containerParent.firstChild);
		const progressBar = document.querySelector('.ytp-progress-bar');
		newContainer.insertBefore(progressBar, newContainer.firstChild);
		containerParent.removeChild(container);
	}

	patchVolumeControl() {
		const panel = document.querySelector('.ytp-volume-panel');
		const blur = panel.blur;
		const focus = panel.focus;
		const newPanel = panel.cloneNode(true);
		newPanel.removeChild(newPanel.querySelector('.ytp-volume-slider'));
		newPanel.addEventListener('blur', panel.blur, true);
		newPanel.addEventListener('focus', panel.focus, true);
		const panelParent = panel.parentElement;
		const slider = document.querySelector('.ytp-volume-slider');
		panelParent.appendChild(newPanel);
		newPanel.appendChild(slider);
		panelParent.removeChild(panel);
		newPanel.addEventListener('keydown', (event) => this.newControls(event, false), false);
	}
}

export const main = new Main();
