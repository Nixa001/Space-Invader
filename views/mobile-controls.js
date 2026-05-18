// views/mobile-controls.js
import { isMobile } from '../utils/device/isMobile.js';

export class MobileControls {
  constructor(keys, onPause) {
    if (!isMobile()) return;
    this.keys = keys;
    this._buildPauseButton(onPause);
    this._buildOverlay();
  }

  _buildPauseButton(onPause) {
    this.pauseBtn = document.createElement('div');
    this.pauseBtn.className = 'pause-btn-mobile';
    this.pauseBtn.textContent = '⏸';
    this.pauseBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      onPause();
    });
    document.body.appendChild(this.pauseBtn);
  }

  _buildOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'mobile-controls';
    this.overlay.appendChild(this._buildJoystick());
    this.overlay.appendChild(this._buildFireButton());
    document.body.appendChild(this.overlay);
  }

  _buildJoystick() {
    const joystick = document.createElement('div');
    joystick.className = 'joystick';

    const layout = [
      [null,         'ArrowUp',    null        ],
      ['ArrowLeft',  null,         'ArrowRight'],
      [null,         'ArrowDown',  null        ],
    ];
    const symbols = { ArrowUp: '▲', ArrowDown: '▼', ArrowLeft: '◄', ArrowRight: '►' };

    layout.forEach((row) => {
      row.forEach((key) => {
        const cell = document.createElement('div');
        cell.className = key ? 'joystick-btn' : 'joystick-btn joystick-empty';
        if (key) {
          cell.textContent = symbols[key];
          cell.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys[key] = true; });
          cell.addEventListener('touchend',   (e) => { e.preventDefault(); this.keys[key] = false; });
          cell.addEventListener('touchcancel', ()  => { this.keys[key] = false; });
        }
        joystick.appendChild(cell);
      });
    });

    return joystick;
  }

  _buildFireButton() {
    const btn = document.createElement('div');
    btn.className = 'fire-btn';
    btn.textContent = 'FIRE';
    btn.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys[' '] = true; });
    btn.addEventListener('touchend',   (e) => { e.preventDefault(); this.keys[' '] = false; });
    btn.addEventListener('touchcancel', ()  => { this.keys[' '] = false; });
    return btn;
  }
}
