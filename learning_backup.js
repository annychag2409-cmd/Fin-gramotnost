(function () {
  function collectLearningState() {
    return {
      completedLessons: JSON.parse(localStorage.getItem("completedLessons") || "[]"),
      notes: Object.keys(localStorage)
        .filter((key) => key.startsWith("release3LessonNotes:"))
        .reduce((result, key) => {
          result[key] = JSON.parse(localStorage.getItem(key) || "{}");
          return result;
        }, {}),
      exportedAt: new Date().toISOString()
    };
  }

  function exportLearningState() {
    const blob = new Blob([JSON.stringify(collectLearningState(), null, 2)], {
      type: "application/json"
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "learning-progress-backup.json";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function importLearningState(state) {
    if (Array.isArray(state.completedLessons)) {
      localStorage.setItem("completedLessons", JSON.stringify(state.completedLessons));
    }

    Object.entries(state.notes || {}).forEach(([key, value]) => {
      if (key.startsWith("release3LessonNotes:")) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    });
  }

  window.release5LearningBackup = {
    collectLearningState,
    exportLearningState,
    importLearningState
  };
})();
