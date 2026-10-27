import { LinkedQueue } from './structures.js';
import { AntrianLoket } from './antrian.js';
import { EditorRiwayat } from './riwayat.js';

/**
 * ====================================================================
 * FILE 4: app.js (DOM Binding & Interactivity)
 * ====================================================================
 * Connects data structure services to the Tailwind UI elements.
 */
document.addEventListener('DOMContentLoaded', () => {

  // Instantiate Core Services
  const antrianManager = new AntrianLoket();
  const editorManager = new EditorRiwayat();

  // UI Element References - Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // UI Element References - Antrian
  const displayNomor = document.getElementById('display-nomor-sekarang');
  const displayStatus = document.getElementById('display-status-panggilan');
  const containerAntrian = document.getElementById('container-daftar-antrian');
  const containerRiwayat = document.getElementById('container-riwayat-panggilan');
  const badgeTotal = document.getElementById('badge-total-antrian');
  const btnAmbil = document.getElementById('btn-ambil-nomor');
  const btnPanggil = document.getElementById('btn-panggil-selanjutnya');
  const btnReset = document.getElementById('btn-reset-antrian');

  // UI Element References - Editor
  const editorTextarea = document.getElementById('editor-catatan');
  const btnUndo = document.getElementById('btn-undo');
  const btnRedo = document.getElementById('btn-redo');
  const btnSimpan = document.getElementById('btn-simpan-catatan');
  const charCounter = document.getElementById('editor-char-counter');
  const undoSizeLabel = document.getElementById('undo-stack-size');
  const redoSizeLabel = document.getElementById('redo-stack-size');
  const undoPeekLabel = document.getElementById('undo-peek-text');
  const stackBadge = document.getElementById('stack-count-badge');

  // UI Element References - Benchmark
  const btnBenchmark = document.getElementById('btn-run-benchmark');
  const timeArrayShift = document.getElementById('time-array-shift');
  const timeLinkedQueue = document.getElementById('time-linked-queue');

  // --- Tab Switcher Logic ---
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => {
        b.classList.remove('text-teal-400', 'bg-slate-700/70', 'border-teal-500/30');
        b.classList.add('text-slate-400');
      });

      btn.classList.remove('text-slate-400');
      btn.classList.add('text-teal-400', 'bg-slate-700/70', 'border-teal-500/30');

      tabContents.forEach(content => {
        if (content.id === targetTab) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });

  // --- Toast Notification Helper ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const bgColors = {
      info: 'bg-indigo-900/90 text-indigo-200 border-indigo-700',
      success: 'bg-emerald-900/90 text-emerald-200 border-emerald-700',
      warning: 'bg-amber-900/90 text-amber-200 border-amber-700',
      error: 'bg-rose-900/90 text-rose-200 border-rose-700'
    };

    toast.className = `px-4 py-3 rounded-xl border text-xs font-semibold shadow-2xl flex items-center space-x-2 transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-auto ${bgColors[type] || bgColors.info}`;
    toast.innerHTML = `<span>${message}</span>`;

    container.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --- ANTRIAN DOM UPDATERS ---
  function updateAntrianUI() {
    const daftar = antrianManager.getDaftarMenunggu();
    const riwayat = antrianManager.getRiwayatDipanggil();
    const total = antrianManager.getJumlahAntrian();

    // Update Total Badge
    badgeTotal.textContent = `${total} Menunggu`;

    // Render Waiting Items
    if (daftar.length === 0) {
      containerAntrian.innerHTML = `
        <div class="w-full text-center py-8 text-slate-500 text-sm flex flex-col items-center justify-center space-y-2">
          <i class="fa-solid fa-folder-open text-2xl text-slate-600"></i>
          <span>Tidak ada antrean yang sedang menunggu.</span>
        </div>`;
    } else {
      containerAntrian.innerHTML = daftar.map((num, idx) => `
        <span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-slate-800 text-teal-300 border border-slate-700">
          <span class="text-slate-500 mr-1.5">#${idx + 1}</span> ${num}
        </span>
      `).join('');
    }

    // Render Call History
    if (riwayat.length === 0) {
      containerRiwayat.innerHTML = '<div class="text-center py-8 text-slate-500 text-sm">Belum ada riwayat dipanggil</div>';
    } else {
      containerRiwayat.innerHTML = riwayat.map((num, idx) => `
        <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/70 border border-slate-700/50">
          <span class="font-mono font-bold text-slate-200">${num}</span>
          <span class="text-[10px] text-slate-400 font-sans">${idx === 0 ? 'Baru saja' : `${idx} pendaftaran lalu`}</span>
        </div>
      `).join('');
    }
  }

  // Action: Ambil Nomor
  btnAmbil.addEventListener('click', () => {
    const nomor = antrianManager.ambilNomor();
    showToast(`Nomor antrean <strong>${nomor}</strong> berhasil diambil.`, 'success');
    updateAntrianUI();
  });

  // Action: Panggil Antrean
  btnPanggil.addEventListener('click', () => {
    const nomor = antrianManager.panggilBerikutnya();
    if (!nomor) {
      showToast('Antrean kosong! Tidak ada pasien yang menunggu.', 'warning');
      displayNomor.textContent = '---';
      displayStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-amber-400 mr-1"></i> Antrean Kosong';
      return;
    }

    displayNomor.textContent = nomor;
    displayStatus.innerHTML = `<i class="fa-solid fa-bell text-emerald-400 mr-1 animate-bounce"></i> Dipanggil ke Loket`;
    showToast(`Memanggil nomor antrean <strong>${nomor}</strong>`, 'info');
    updateAntrianUI();
  });

  // Action: Reset Antrean
  btnReset.addEventListener('click', () => {
    if (antrianManager.getJumlahAntrian() === 0 && displayNomor.textContent === '---') {
      showToast('Antrean sudah bersih.', 'info');
      return;
    }

    antrianManager.reset();
    displayNomor.textContent = '---';
    displayStatus.innerHTML = '<i class="fa-solid fa-circle-info mr-1 text-teal-400"></i> Antrean telah di-reset';
    showToast('Seluruh antrean telah berhasil di-reset.', 'error');
    updateAntrianUI();
  });

  // --- EDITOR UNDO / REDO LOGIC ---
  let typingTimer = null;

  function updateEditorStateUI() {
    btnUndo.disabled = !editorManager.canUndo();
    btnRedo.disabled = !editorManager.canRedo();

    undoSizeLabel.textContent = editorManager.getUndoSize();
    redoSizeLabel.textContent = editorManager.getRedoSize();
    undoPeekLabel.textContent = editorManager.getUndoPeek() || '(kosong)';
    stackBadge.textContent = `${editorManager.getUndoSize()}/50`;

    const text = editorTextarea.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    charCounter.textContent = `${text.length} karakter | ${words} kata`;
  }

  // Record state on typing (debounced)
  editorTextarea.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      editorManager.catatPerubahan(editorTextarea.value);
      updateEditorStateUI();
    }, 400);
  });

  // Undo Action
  btnUndo.addEventListener('click', () => {
    const prevText = editorManager.undo(editorTextarea.value);
    if (prevText !== null) {
      editorTextarea.value = prevText;
      updateEditorStateUI();
      showToast('Undo berhasil dijalankan.', 'info');
    }
  });

  // Redo Action
  btnRedo.addEventListener('click', () => {
    const nextText = editorManager.redo(editorTextarea.value);
    if (nextText !== null) {
      editorTextarea.value = nextText;
      updateEditorStateUI();
      showToast('Redo berhasil dijalankan.', 'info');
    }
  });

  // Save Action Simulation
  btnSimpan.addEventListener('click', () => {
    showToast('Catatan medis tersimpan secara lokal.', 'success');
  });

  // --- LAB 1: BENCHMARK EXECUTION ---
  btnBenchmark.addEventListener('click', () => {
    showToast('Memulai benchmark 100.000 data...', 'info');

    setTimeout(() => {
      const DATA_COUNT = 100000;

      // 1. Array Test (Shift - O(n))
      const arrayTest = Array.from({ length: DATA_COUNT }, (_, i) => i);
      const startArray = performance.now();
      while (arrayTest.length > 0) {
        arrayTest.shift();
      }
      const endArray = performance.now();
      const durationArray = (endArray - startArray).toFixed(2);
      timeArrayShift.textContent = `${durationArray} ms`;
      timeArrayShift.className = 'p-3 font-bold text-rose-400';

      // 2. LinkedQueue Test (Dequeue - O(1))
      const queueTest = new LinkedQueue();
      for (let i = 0; i < DATA_COUNT; i++) queueTest.enqueue(i);
      
      const startQueue = performance.now();
      while (!queueTest.isEmpty()) {
        queueTest.dequeue();
      }
      const endQueue = performance.now();
      const durationQueue = (endQueue - startQueue).toFixed(2);
      timeLinkedQueue.textContent = `${durationQueue} ms`;
      timeLinkedQueue.className = 'p-3 font-bold text-emerald-400';

      showToast('Benchmark selesai!', 'success');
    }, 50);
  });

  // Initialize UI State
  updateAntrianUI();
  updateEditorStateUI();
});