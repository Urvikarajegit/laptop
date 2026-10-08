/**
 * Interactive 3D/2D Canvas DNA Double Helix Visualizer
 * Fully responsive across all devices, mobile aspect ratios, and touch gestures.
 */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('heroDnaCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  // Visualizer State
  let width = 0;
  let height = 0;
  let rotationY = 0;
  let rotationX = 0.2;
  let rotationSpeed = 0.015;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let time = 0;

  // Double Helix Parameters
  const numBasePairs = 28;
  const turns = 2.4;

  // Base Pair Color Palette (Biotechnology Standard)
  const baseColors = {
    A: '#0284c7', // Adenine (Bio-Blue)
    T: '#f43f5e', // Thymine (Rose Red)
    G: '#10b981', // Guanine (Emerald Green)
    C: '#eab308'  // Cytosine (Amber Yellow)
  };

  const sampleSequences = [
    { strand1: 'A', strand2: 'T' },
    { strand1: 'T', strand2: 'A' },
    { strand1: 'G', strand2: 'C' },
    { strand1: 'C', strand2: 'G' },
    { strand1: 'A', strand2: 'T' },
    { strand1: 'A', strand2: 'T' },
    { strand1: 'G', strand2: 'C' },
    { strand1: 'C', strand2: 'G' },
    { strand1: 'T', strand2: 'A' },
    { strand1: 'G', strand2: 'C' },
    { strand1: 'A', strand2: 'T' },
    { strand1: 'T', strand2: 'A' },
    { strand1: 'G', strand2: 'C' },
    { strand1: 'C', strand2: 'G' }
  ];

  // Ambient Floating Ions / Nanobubbles
  const ambientParticles = [];
  const particleCount = 24;

  function initParticles() {
    ambientParticles.length = 0;
    const spreadX = Math.max(width * 0.7, 260);
    const spreadY = Math.max(height * 0.8, 280);
    for (let i = 0; i < particleCount; i++) {
      ambientParticles.push({
        x: (Math.random() - 0.5) * spreadX,
        y: (Math.random() - 0.5) * spreadY,
        z: (Math.random() - 0.5) * 180,
        radius: Math.random() * 2 + 1,
        speedY: (Math.random() * 0.35 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
        base: ['A', 'T', 'G', 'C'][Math.floor(Math.random() * 4)],
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  // Dynamic Responsive Dimensions calculation
  function getResponsiveHelixParams() {
    // Current canvas dimensions
    const cWidth = width || 440;
    const cHeight = height || 360;

    // Scale factor relative to 440x360 reference design
    const scale = Math.min(cWidth / 440, cHeight / 360);
    const dynamicScale = Math.max(0.62, Math.min(scale, 1.2));

    // Dynamic radius bounded so it leaves comfortable breathing room and avoids badge collision
    const dynamicRadius = Math.max(40, Math.min(cWidth * 0.20, 75 * dynamicScale));

    // Dynamic height framed inside canvas (~13% padding top & bottom, preventing clipping)
    const dynamicHeight = Math.max(160, cHeight * 0.74);

    // Dynamic node sphere radius
    const dynamicSphereRadius = Math.max(3.0, 4.8 * dynamicScale);

    // FOV perspective distance
    const dynamicFov = Math.max(260, Math.min(380, cWidth * 0.82));

    return {
      radius: dynamicRadius,
      height: dynamicHeight,
      sphereRadius: dynamicSphereRadius,
      fov: dynamicFov,
      scale: dynamicScale
    };
  }

  function resizeCanvas() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Cap DPR at 2 for optimal crispness without mobile GPU strain
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    width = rect.width;
    height = rect.height;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Apply exact DPR transform cleanly
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (ambientParticles.length === 0) {
      initParticles();
    }
  }

  window.addEventListener('resize', resizeCanvas);
  if (window.ResizeObserver && canvas.parentElement) {
    const ro = new ResizeObserver(() => {
      resizeCanvas();
    });
    ro.observe(canvas.parentElement);
  }

  resizeCanvas();
  initParticles();

  // 3D Point Projection Helper
  function project3D(x, y, z, fov = 380) {
    // Rotate around X axis
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;

    // Rotate around Y axis
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    const x2 = x * cosY + z1 * sinY;
    const z2 = -x * sinY + z1 * cosY;

    // Perspective projection
    const distance = fov;
    const scale = distance / (distance + z2 + 180);
    const projX = width / 2 + x2 * scale;
    const projY = height / 2 + y1 * scale;

    return {
      x: projX,
      y: projY,
      z: z2,
      scale: Math.max(scale, 0.2)
    };
  }

  // Draw Helix Loop
  function draw() {
    ctx.clearRect(0, 0, width, height);

    time += 0.02;
    if (!isDragging) {
      rotationY += rotationSpeed;
    }

    const helixParams = getResponsiveHelixParams();
    const { radius, height: helixHeight, sphereRadius, fov } = helixParams;

    // Collect all renderable elements (strands, rungs, particles) to sort by Z-depth
    const renderQueue = [];

    // 1. Ambient Particles
    const maxParticleY = helixHeight * 0.55;
    ambientParticles.forEach((p) => {
      p.y += p.speedY;
      if (p.y > maxParticleY) p.y = -maxParticleY;
      if (p.y < -maxParticleY) p.y = maxParticleY;

      const proj = project3D(p.x, p.y, p.z, fov);
      renderQueue.push({
        type: 'particle',
        z: proj.z,
        draw: () => {
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, p.radius * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = baseColors[p.base] || '#38bdf8';
          ctx.globalAlpha = p.opacity * Math.min(proj.scale, 1);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });
    });

    // 2. DNA Base Pairs & Backbone Nodes
    for (let i = 0; i < numBasePairs; i++) {
      const progress = i / (numBasePairs - 1);
      const angle = progress * Math.PI * 2 * turns;
      const y = (progress - 0.5) * helixHeight;

      // Strand 1 (5' -> 3')
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const p1 = project3D(x1, y, z1, fov);

      // Strand 2 (3' -> 5', 180 deg offset)
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      const p2 = project3D(x2, y, z2, fov);

      // Center hydrogen bond midpoint
      const midZ = (p1.z + p2.z) / 2;

      // Base pair assignment
      const seqIndex = i % sampleSequences.length;
      const seq = sampleSequences[seqIndex];
      const color1 = baseColors[seq.strand1];
      const color2 = baseColors[seq.strand2];

      // Add Rung Line
      renderQueue.push({
        type: 'rung',
        z: midZ,
        draw: () => {
          // Connecting Hydrogen Bond Line
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, color1);
          grad.addColorStop(0.5, 'rgba(148, 163, 184, 0.6)'); // Hydrogen bond bridge
          grad.addColorStop(1, color2);
          
          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(2.4 * ((p1.scale + p2.scale) / 2), 1);
          ctx.stroke();

          // Hydrogen bond dashes
          ctx.setLineDash([3, 3]);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // Add Node 1
      renderQueue.push({
        type: 'node',
        z: p1.z,
        draw: () => {
          const r = sphereRadius * p1.scale;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, r, 0, Math.PI * 2);
          ctx.fillStyle = color1;
          ctx.shadowColor = color1;
          ctx.shadowBlur = Math.min(10 * p1.scale, 8);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Inner highlight for 3D look
          ctx.beginPath();
          ctx.arc(p1.x - r * 0.3, p1.y - r * 0.3, r * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
          ctx.fill();
        }
      });

      // Add Node 2
      renderQueue.push({
        type: 'node',
        z: p2.z,
        draw: () => {
          const r = sphereRadius * p2.scale;
          ctx.beginPath();
          ctx.arc(p2.x, p2.y, r, 0, Math.PI * 2);
          ctx.fillStyle = color2;
          ctx.shadowColor = color2;
          ctx.shadowBlur = Math.min(10 * p2.scale, 8);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Inner highlight for 3D look
          ctx.beginPath();
          ctx.arc(p2.x - r * 0.3, p2.y - r * 0.3, r * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
          ctx.fill();
        }
      });
    }

    // Sort by Z (Painters algorithm: farthest first)
    renderQueue.sort((a, b) => b.z - a.z);

    // Render sorted elements
    renderQueue.forEach(item => item.draw());

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();

  // Interactive Mouse Drag Controls
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    rotationY += deltaX * 0.008;
    rotationX += deltaY * 0.008;

    // Constrain X tilt
    rotationX = Math.max(-0.8, Math.min(0.8, rotationX));

    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    rotationY += deltaX * 0.008;
    rotationX += deltaY * 0.008;
    rotationX = Math.max(-0.8, Math.min(0.8, rotationX));

    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Controls in Header Card
  const speedBtn = document.getElementById('dnaSpeedBtn');
  const resetBtn = document.getElementById('dnaResetBtn');

  if (speedBtn) {
    let speedIndex = 0;
    const speeds = [0.015, 0.035, 0.005];
    speedBtn.addEventListener('click', () => {
      speedIndex = (speedIndex + 1) % speeds.length;
      rotationSpeed = speeds[speedIndex];
      speedBtn.style.color = speedIndex === 1 ? '#0284c7' : '';
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (window.gsap) {
        gsap.to({ ry: rotationY, rx: rotationX }, {
          ry: 0,
          rx: 0.2,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: function() {
            rotationY = this.targets()[0].ry;
            rotationX = this.targets()[0].rx;
          }
        });
      } else {
        rotationY = 0;
        rotationX = 0.2;
      }
    });
  }
});
