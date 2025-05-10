import React, { useEffect } from 'react';

const AnimatedBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const elements = [];
    const presets = {};

    presets.o = function (x, y, s, dx, dy) {
      return {
        x, y, r: 12 * s, w: 5 * s, dx, dy,
        draw(ctx, t) {
          this.x += this.dx;
          this.y += this.dy;
          ctx.beginPath();
          ctx.arc(
            this.x + Math.sin((50 + x + (t / 10)) / 100) * 3,
            this.y + Math.sin((45 + x + (t / 10)) / 100) * 4,
            this.r,
            0,
            2 * Math.PI,
            false
          );
          ctx.lineWidth = this.w;
          ctx.strokeStyle = '#000';
          ctx.stroke();
        }
      };
    };

    presets.x = function (x, y, s, dx, dy, dr, r = 0) {
      return {
        x, y, s: 20 * s, w: 5 * s, r, dx, dy, dr,
        draw(ctx, t) {
          this.x += this.dx;
          this.y += this.dy;
          this.r += this.dr;

          ctx.save();
          ctx.translate(
            this.x + Math.sin((x + (t / 10)) / 100) * 5,
            this.y + Math.sin((10 + x + (t / 10)) / 100) * 2
          );
          ctx.rotate(this.r * Math.PI / 180);

          const line = (x, y, tx, ty) => {
            ctx.beginPath();
            ctx.moveTo((_this.s / 2) * x, (_this.s / 2) * y);
            ctx.lineTo((_this.s / 2) * tx, (_this.s / 2) * ty);
            ctx.lineWidth = this.w;
            ctx.strokeStyle = '#000';
            ctx.stroke();
          };

          const _this = this;
          line(-1, -1, 1, 1);
          line(1, -1, -1, 1);

          ctx.restore();
        }
      };
    };

    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        if (Math.round(Math.random() * 8000) === 1) {
          const s = ((Math.random() * 5) + 1) / 10;
          if (Math.round(Math.random()) === 1)
            elements.push(presets.o(x, y, s, 0, 0));
          else
            elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, Math.random() * 360));
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = new Date().getTime();
      elements.forEach(el => el.draw(ctx, time));
    };

    const interval = setInterval(draw, 10);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      id="canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        background: 'white',
      }}
    />
  );
};

export default AnimatedBackground;
