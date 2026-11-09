/* ═══════════ LESSON KEY HIGHLIGHT ═══════════ */
.kb-key.lesson-key {
  background: linear-gradient(145deg, rgba(99, 102, 241, 0.35), rgba(139, 92, 246, 0.2)) !important;
  border-color: var(--primary) !important;
  box-shadow: inset 0 0 12px rgba(99, 102, 241, 0.3);
}

/* ═══════════ SHIFT ACTIVE ═══════════ */
.kb-key.shift-active {
  background: linear-gradient(145deg, var(--success), #059669) !important;
  color: #fff !important;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
}

/* ═══════════ SMALL KEY ═══════════ */
.kb-key.small-key {
  min-width: 38px;
  height: 38px;
  font-size: 0.8rem;
}

/* ═══════════ HAND INDICATOR REFINEMENT ═══════════ */
.hand-indicator {
  position: absolute;
  font-size: 2.2rem;
  pointer-events: none;
  z-index: 100;
  filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.9))
          drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
  animation: handBob 0.9s ease-in-out infinite;
  transition: left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              top 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 0.2s ease;
  transform: translate(-50%, -100%);
}

@keyframes handBob {
  0%, 100% { transform: translate(-50%, -100%) rotate(-15deg) scale(1); }
  50% { transform: translate(-50%, -90%) rotate(-15deg) scale(1.08); }
}

.hand-indicator.pressing {
  animation: handPress 0.25s ease;
}

@keyframes handPress {
  0% { transform: translate(-50%, -100%) rotate(-15deg) scale(1); }
  50% { transform: translate(-50%, -70%) rotate(-15deg) scale(0.85); }
  100% { transform: translate(-50%, -100%) rotate(-15deg) scale(1); }
}
