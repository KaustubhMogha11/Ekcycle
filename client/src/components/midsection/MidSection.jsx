import React, { useEffect } from 'react';
import './midsection.css';
import { Circ } from 'gsap/all';
import { TweenLite } from 'gsap';
import image from '../../images/yy.png';
import logo from '../../images/punarchakarlogoBlack.png';

const CanvasBackground = () => {
  useEffect(() => {
    let width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    function initHeader() {
      width = window.innerWidth;
      height = window.innerHeight;
      target = { x: width / 2, y: height / 2 };

      largeHeader = document.getElementById('large-header');
      if (!largeHeader) return;

      largeHeader.style.height = height + 'px';

      canvas = document.getElementById('demo-canvas');
      if (!canvas) return;

      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d');

      points = [];
      for (let x = 0; x < width; x += width / 20) {
        for (let y = 0; y < height; y += height / 20) {
          let px = x + Math.random() * width / 20;
          let py = y + Math.random() * height / 20;
          let p = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      for (let i = 0; i < points.length; i++) {
        let closest = [];
        let p1 = points[i];
        for (let j = 0; j < points.length; j++) {
          let p2 = points[j];
          if (p1 !== p2) {
            if (closest.length < 5) {
              closest.push(p2);
            } else {
              for (let k = 0; k < 5; k++) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  break;
                }
              }
            }
          }
        }
        p1.closest = closest;
      }

      for (let i in points) {
        let c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(0,0,0,0.3)');
        points[i].circle = c;
      }

      initAnimation();
      addListeners();
    }

    function addListeners() {
      if (!('ontouchstart' in window)) {
        window.addEventListener('mousemove', mouseMove);
      }
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
      target.x = e.clientX;
      target.y = e.clientY;
    }

    function scrollCheck() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollFactor = Math.min(1, scrollTop / height);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const dx = p.originX - width / 2;
        const dy = p.originY - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const maxRadius = Math.min(width, height) / 2.2;
        const r = scrollFactor * maxRadius;

        p.x = width / 2 + Math.cos(angle) * distance * (1 - scrollFactor) + Math.cos(angle) * r * scrollFactor;
        p.y = height / 2 + Math.sin(angle) * distance * (1 - scrollFactor) + Math.sin(angle) * r * scrollFactor;
      }

      animateHeader = scrollTop <= height;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      largeHeader.style.height = height + 'px';
      canvas.width = width;
      canvas.height = height;
    }

    function initAnimation() {
      animate();
      for (let i in points) {
        shiftPoint(points[i]);
      }
    }

    function animate() {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (let i in points) {
          let dist = getDistance(target, points[i]);
          if (dist < 4000) {
            points[i].active = 0.3;
            points[i].circle.active = 0.6;
          } else if (dist < 20000) {
            points[i].active = 0.1;
            points[i].circle.active = 0.3;
          } else if (dist < 40000) {
            points[i].active = 0.02;
            points[i].circle.active = 0.1;
          } else {
            points[i].active = 0;
            points[i].circle.active = 0;
          }

          drawLines(points[i]);
          points[i].circle.draw();
        }
      }
      requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
      TweenLite.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: () => shiftPoint(p)
      });
    }

    function drawLines(p) {
      if (!p.active) return;
      for (let i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = 'rgba(0,0,0,' + p.active + ')';
        ctx.stroke();
      }
    }

    function Circle(pos, rad, color) {
      this.pos = pos;
      this.radius = rad;
      this.color = color;
      this.draw = function () {
        if (!this.active) return;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(0,0,0,' + this.active + ')';
        ctx.fill();
      };
    }

    function getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    initHeader();
  }, []);

  return <canvas id="demo-canvas"></canvas>;
};

const MidSection = () => {
  return (
    <div id="large-header" className="large-header">
      <CanvasBackground />
      <div className="overlay-content">
        <div className="left-text">
          <div className="logo-row">
            <img src={logo} alt="PunarChakar Logo" className="mid-logo" />
          </div>
          {/* <h2 className="sub-title">From Scrap To Sustainability - Trace Every Step</h2> */}
          <p className="description">
            We power India’s battery circular economy with end-to-end traceability, compliance, and marketplace access. From tracking every scrap battery and black mass using digital identifiers to ensuring BWMR 2022 and EPR compliance, we offer real-time pricing for LFP, NMC, and LCO chemistries, verified by lab-tested certification. Our platform connects recyclers, manufacturers, OEMs, and metal buyers to a trusted ecosystem enabling smart buying, sustainable reuse, and transparency. With credit registries, scorecards, and verified networks, we turn recycling into a measurable, compliant, and profitable process bridging the gap between waste and value.
          </p>
          <a href="/purchase" className="learn-more-btn">Purchase Now</a>
        </div>
        <div className="right-image">
          <img src={image} alt="Battery Recycling Illustration" />
        </div>
      </div>
    </div>
  );
};

export default MidSection;
