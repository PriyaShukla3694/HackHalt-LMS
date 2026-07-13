const listeners = new Set();

export const toastEmitter = {
  subscribe(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },
  emit(message, type = "info") {
    listeners.forEach((callback) => {
      try {
        callback(message, type);
      } catch (err) {
        console.error("Error invoking toast listener:", err);
      }
    });
  }
};
