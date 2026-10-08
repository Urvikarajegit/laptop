/**
 * Interactive Bio-Informatics Sandbox Engine
 * DNA -> mRNA Transcription, Codon Translation, Physico-Chemical Analysis & Peptide Simulation
 */
document.addEventListener('DOMContentLoaded', () => {
  const dnaInput = document.getElementById('dnaInput');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const complementBtn = document.getElementById('complementBtn');
  const clearDnaBtn = document.getElementById('clearDnaBtn');
  const presetBtns = document.querySelectorAll('.preset-btn');

  // Metric displays
  const seqLengthBadge = document.getElementById('seqLengthBadge');
  const countA = document.getElementById('countA');
  const countT = document.getElementById('countT');
  const countG = document.getElementById('countG');
  const countC = document.getElementById('countC');
  const gcVal = document.getElementById('gcVal');
  const gcProgress = document.getElementById('gcProgress');
  const tmVal = document.getElementById('tmVal');
  const mwVal = document.getElementById('mwVal');
  const aaLenVal = document.getElementById('aaLenVal');
  const mrnaDisplay = document.getElementById('mrnaDisplay');
  const aminoAcidChain = document.getElementById('aminoAcidChain');
  const singleLetterProtein = document.getElementById('singleLetterProtein');
  const proteinStatusBadge = document.getElementById('proteinStatusBadge');

  if (!dnaInput || !analyzeBtn) return;

  // Presets Data
  const presets = {
    gfp: "ATGAGTAAAGGAGAAGAACTTTTCACTGGAGTTGTCCCAATTCTTGTTGAATTAGATGGTGATGTTAATGGGCACAAATTTTCTGTCAGTGGAGAGGGT",
    insulin: "GGCATTGTGGAGCAGTGCTGCACCAGCATCTGCTCCCTGTACCAGCTGGAGAACTACTGCAACTAG",
    crispr: "GAGTCCGAGCAGAAGAAGAAGGGCTCCCATCACCATCATCATCAC",
    silk: "GCTGCAGCTGCAGCAGCAGCTGGTGGTGCCGGACAAGGAGGATATGGTGGACTTGGAAGT"
  };

  // Genetic Code Dictionary
  const codonTable = {
    'ATA':'I', 'ATC':'I', 'ATT':'I', 'ATG':'M',
    'ACA':'T', 'ACC':'T', 'ACG':'T', 'ACT':'T',
    'AAC':'N', 'AAT':'N', 'AAA':'K', 'AAG':'K',
    'AGC':'S', 'AGT':'S', 'AGA':'R', 'AGG':'R',
    'CTA':'L', 'CTC':'L', 'CTG':'L', 'CTT':'L',
    'CCA':'P', 'CCC':'P', 'CCG':'P', 'CCT':'P',
    'CAC':'H', 'CAT':'H', 'CAA':'Q', 'CAG':'Q',
    'CGA':'R', 'CGC':'R', 'CGG':'R', 'CGT':'R',
    'GTA':'V', 'GTC':'V', 'GTG':'V', 'GTT':'V',
    'GCA':'A', 'GCC':'A', 'GCG':'A', 'GCT':'A',
    'GAC':'D', 'GAT':'D', 'GAA':'E', 'GAG':'E',
    'GGA':'G', 'GGC':'G', 'GGG':'G', 'GGT':'G',
    'TCA':'S', 'TCC':'S', 'TCG':'S', 'TCT':'S',
    'TTC':'F', 'TTT':'F', 'TTA':'L', 'TTG':'L',
    'TAC':'Y', 'TAT':'Y', 'TAA':'*', 'TAG':'*',
    'TGC':'C', 'TGT':'C', 'TGA':'*', 'TGG':'W',
  };

  const aminoAcidData = {
    'A': { name: 'Ala', fullName: 'Alanine', type: 'Hydrophobic', color: '#38bdf8' },
    'R': { name: 'Arg', fullName: 'Arginine', type: 'Basic (+)', color: '#6366f1' },
    'N': { name: 'Asn', fullName: 'Asparagine', type: 'Polar', color: '#0ea5e9' },
    'D': { name: 'Asp', fullName: 'Aspartate', type: 'Acidic (-)', color: '#f43f5e' },
    'C': { name: 'Cys', fullName: 'Cysteine', type: 'Thiol', color: '#eab308' },
    'E': { name: 'Glu', fullName: 'Glutamate', type: 'Acidic (-)', color: '#f43f5e' },
    'Q': { name: 'Gln', fullName: 'Glutamine', type: 'Polar', color: '#0ea5e9' },
    'G': { name: 'Gly', fullName: 'Glycine', type: 'Flexible', color: '#10b981' },
    'H': { name: 'His', fullName: 'Histidine', type: 'Basic (+)', color: '#8b5cf6' },
    'I': { name: 'Ile', fullName: 'Isoleucine', type: 'Hydrophobic', color: '#38bdf8' },
    'L': { name: 'Leu', fullName: 'Leucine', type: 'Hydrophobic', color: '#38bdf8' },
    'K': { name: 'Lys', fullName: 'Lysine', type: 'Basic (+)', color: '#6366f1' },
    'M': { name: 'Met', fullName: 'Methionine (Start)', type: 'Start / Hydrophobic', color: '#10b981' },
    'F': { name: 'Phe', fullName: 'Phenylalanine', type: 'Aromatic', color: '#0284c7' },
    'P': { name: 'Pro', fullName: 'Proline', type: 'Conformational', color: '#14b8a6' },
    'S': { name: 'Ser', fullName: 'Serine', type: 'Polar', color: '#0ea5e9' },
    'T': { name: 'Thr', fullName: 'Threonine', type: 'Polar', color: '#0ea5e9' },
    'W': { name: 'Trp', fullName: 'Tryptophan', type: 'Aromatic', color: '#0284c7' },
    'Y': { name: 'Tyr', fullName: 'Tyrosine', type: 'Polar Aromatic', color: '#06b6d4' },
    'V': { name: 'Val', fullName: 'Valine', type: 'Hydrophobic', color: '#38bdf8' },
    '*': { name: 'STOP', fullName: 'Stop Codon', type: 'Termination', color: '#ef4444' }
  };

  // Main Analysis Function
  function processSequence(seqRaw) {
    const seq = seqRaw.toUpperCase().replace(/[^ATGC]/g, '');
    dnaInput.value = seq;

    const len = seq.length;
    seqLengthBadge.textContent = `${len} bp`;

    if (len === 0) {
      countA.textContent = '0';
      countT.textContent = '0';
      countG.textContent = '0';
      countC.textContent = '0';
      gcVal.textContent = '0%';
      gcProgress.style.width = '0%';
      tmVal.textContent = '0 °C';
      mwVal.textContent = '0 Da';
      aaLenVal.textContent = '0 Residues';
      mrnaDisplay.textContent = 'Enter DNA sequence above...';
      aminoAcidChain.innerHTML = '<span class="text-muted" style="padding:10px;font-size:0.85rem;">No translation available.</span>';
      singleLetterProtein.textContent = '-';
      proteinStatusBadge.textContent = '0 AA';
      return;
    }

    // Counts
    let cA = 0, cT = 0, cG = 0, cC = 0;
    for (let i = 0; i < len; i++) {
      const b = seq[i];
      if (b === 'A') cA++;
      else if (b === 'T') cT++;
      else if (b === 'G') cG++;
      else if (b === 'C') cC++;
    }

    countA.textContent = cA;
    countT.textContent = cT;
    countG.textContent = cG;
    countC.textContent = cC;

    // GC%
    const gcCount = cG + cC;
    const gcPct = ((gcCount / len) * 100).toFixed(1);
    gcVal.textContent = `${gcPct}%`;
    gcProgress.style.width = `${gcPct}%`;

    // Melting Temp (Wallace / Nearest-Neighbor)
    let tm = 0;
    if (len < 14) {
      tm = ((cA + cT) * 2 + (cG + cC) * 4).toFixed(1);
    } else {
      tm = (64.9 + 41 * (gcCount - 16.4) / len).toFixed(1);
    }
    tmVal.textContent = `${tm} °C`;

    // Molecular Weight (Da)
    const mw = ((cA * 313.21) + (cT * 304.20) + (cC * 289.18) + (cG * 329.21) - 61.96).toFixed(0);
    mwVal.textContent = `${Number(mw).toLocaleString()} Da`;

    // mRNA Transcription (T -> U)
    const mrna = seq.replace(/T/g, 'U');
    mrnaDisplay.textContent = mrna.match(/.{1,3}/g)?.join(' ') || mrna;

    // Translation to Polypeptide
    aminoAcidChain.innerHTML = '';
    let peptide1Letter = '';
    const numCodons = Math.floor(len / 3);
    aaLenVal.textContent = `${numCodons} Residues`;
    proteinStatusBadge.textContent = `${numCodons} AA Peptides`;

    for (let i = 0; i <= len - 3; i += 3) {
      const codon = seq.substring(i, i + 3);
      const aaCode = codonTable[codon] || '?';
      const aaInfo = aminoAcidData[aaCode] || { name: '?', fullName: 'Unknown', type: 'Unknown', color: '#94a3b8' };
      peptide1Letter += aaCode;

      const pill = document.createElement('div');
      pill.className = 'aa-pill';
      pill.style.borderTop = `3px solid ${aaInfo.color}`;
      pill.innerHTML = `
        <span class="aa-code" style="color:${aaInfo.color}">${aaCode}</span>
        <span class="aa-name">${aaInfo.name}</span>
        <span class="aa-triplet">${codon}</span>
      `;
      pill.title = `${aaInfo.fullName} (${aaInfo.type}) - Codon: ${codon}`;
      aminoAcidChain.appendChild(pill);
    }

    singleLetterProtein.textContent = peptide1Letter || 'No full codons';

    // Trigger peptide canvas animation
    updateMoleculeCanvas(peptide1Letter);
  }

  // Mini Molecule Ribbon / Node Canvas Simulation
  const molCanvas = document.getElementById('moleculeCanvas');
  let molCtx = molCanvas ? molCanvas.getContext('2d') : null;
  let peptideNodes = [];
  let molAnimId;
  let molTime = 0;

  function resizeMolCanvas() {
    if (!molCanvas) return;
    const parent = molCanvas.parentElement;
    molCanvas.width = parent.clientWidth * (window.devicePixelRatio || 1);
    molCanvas.height = parent.clientHeight * (window.devicePixelRatio || 1);
    molCanvas.style.width = `${parent.clientWidth}px`;
    molCanvas.style.height = `${parent.clientHeight}px`;
    if (molCtx) molCtx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  window.addEventListener('resize', resizeMolCanvas);
  resizeMolCanvas();

  function updateMoleculeCanvas(peptideStr) {
    if (!molCanvas || !molCtx) return;
    const width = molCanvas.clientWidth || 300;
    const height = molCanvas.clientHeight || 120;

    peptideNodes = [];
    const count = Math.min(peptideStr.length, 24);
    if (count === 0) return;

    const step = width / (count + 1);

    for (let i = 0; i < count; i++) {
      const aa = peptideStr[i];
      const info = aminoAcidData[aa] || { color: '#0284c7' };
      peptideNodes.push({
        baseX: (i + 1) * step,
        baseY: height / 2,
        x: (i + 1) * step,
        y: height / 2,
        color: info.color,
        aa: aa,
        phase: i * 0.4
      });
    }
  }

  function animateMolecule() {
    if (!molCanvas || !molCtx) return;
    const width = molCanvas.clientWidth || 300;
    const height = molCanvas.clientHeight || 120;
    molCtx.clearRect(0, 0, width, height);

    molTime += 0.04;

    if (peptideNodes.length > 1) {
      // Draw connecting backbone ribbon
      molCtx.beginPath();
      molCtx.moveTo(peptideNodes[0].x, peptideNodes[0].y);

      for (let i = 0; i < peptideNodes.length; i++) {
        const node = peptideNodes[i];
        node.y = node.baseY + Math.sin(molTime + node.phase) * 18;

        if (i > 0) {
          const prev = peptideNodes[i - 1];
          const midX = (prev.x + node.x) / 2;
          const midY = (prev.y + node.y) / 2;
          molCtx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }
      }
      const last = peptideNodes[peptideNodes.length - 1];
      molCtx.lineTo(last.x, last.y);
      molCtx.strokeStyle = 'rgba(2, 132, 199, 0.4)';
      molCtx.lineWidth = 3;
      molCtx.stroke();

      // Draw amino acid beads
      peptideNodes.forEach((node) => {
        molCtx.beginPath();
        molCtx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        molCtx.fillStyle = node.color;
        molCtx.shadowColor = node.color;
        molCtx.shadowBlur = 6;
        molCtx.fill();
        molCtx.shadowBlur = 0;

        // Label
        molCtx.fillStyle = '#0f172a';
        molCtx.font = 'bold 9px monospace';
        molCtx.textAlign = 'center';
        molCtx.fillText(node.aa, node.x, node.y - 10);
      });
    }

    molAnimId = requestAnimationFrame(animateMolecule);
  }
  animateMolecule();

  // Initial Load with GFP preset
  processSequence(presets.gfp);

  // Event Listeners
  analyzeBtn.addEventListener('click', () => {
    processSequence(dnaInput.value);
    // Button click pop effect
    if (window.gsap) {
      gsap.fromTo(analyzeBtn, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
    }
  });

  dnaInput.addEventListener('input', () => {
    processSequence(dnaInput.value);
  });

  complementBtn.addEventListener('click', () => {
    const seq = dnaInput.value.toUpperCase();
    const complementMap = { 'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G' };
    const revComp = seq.split('').reverse().map(b => complementMap[b] || b).join('');
    dnaInput.value = revComp;
    processSequence(revComp);
  });

  clearDnaBtn.addEventListener('click', () => {
    dnaInput.value = '';
    processSequence('');
    presetBtns.forEach(b => b.classList.remove('active'));
  });

  // Preset Buttons Click Handler
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const presetKey = btn.getAttribute('data-preset');
      if (presets[presetKey]) {
        processSequence(presets[presetKey]);
      }
    });
  });
});
