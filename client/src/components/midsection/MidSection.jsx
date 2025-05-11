import React, { useEffect, useState } from 'react';
import './midsection.css';
import { Circ } from 'gsap/all';
import { TweenLite } from 'gsap';
import { motion } from 'framer-motion';
import logo from '../../images/logo.png';
import { GoogleOAuthProvider, GoogleLogin,googleLogout  } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';




const MidSection = () => {
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
        let c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
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
      let posx = 0, posy = 0;
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      target.x = posx;
      target.y = posy;
    }

    function scrollCheck() {
      animateHeader = document.body.scrollTop <= height;
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
        ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
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
        ctx.fillStyle = 'rgba(156,217,249,' + this.active + ')';
        ctx.fill();
      };
    }

    function getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    initHeader();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    setShowModal(false);
  };

  const handleLoginError = () => {
    console.error('Login Failed');
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  return (
     <GoogleOAuthProvider clientId="1064124323746-joih7ld2k4segefnalikfp4lek1llmv5.apps.googleusercontent.com">
    <div id="large-header" className="large-header">
      <canvas id="demo-canvas"></canvas>

      {/* Navigation */}
      <motion.nav className="nav-center" /* animation omitted for brevity */>
        <a href="#">Home</a>
        <a href="#">Marketplace</a>
        <a href="#">Contact Us</a>

        {/* Login/Logout */}
        {!user ? (
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>
            Login
          </a>
        ) : (
          <div className="nav-user">
            <span>Hi, {user.given_name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}

        {/* Logo */}
        <div className="logo-right">
          <img src={logo} alt="Ekcycle Logo" />
        </div>
      </motion.nav>

      {/* Google Login Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
          </div>
        </div>
      )}

      {/* Main title */}
      <h1 className="main-title">
        Recycle <span className="thin">Batteries</span>
      </h1>
    </div>
  </GoogleOAuthProvider>
  );
};

export default MidSection;