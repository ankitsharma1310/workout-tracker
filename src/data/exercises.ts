export interface ExerciseLibraryItem {
  name: string;
  muscleGroup: string;
  equipment: string;
}

export const exerciseLibrary: ExerciseLibraryItem[] = [

  // Chest
  { name: "Bench Press", muscleGroup: "Chest", equipment: "Barbell" },
  { name: "Incline Bench Press", muscleGroup: "Chest", equipment: "Barbell" },
  { name: "Decline Bench Press", muscleGroup: "Chest", equipment: "Barbell" },
  { name: "Dumbbell Bench Press", muscleGroup: "Chest", equipment: "Dumbbell" },
  { name: "Incline Dumbbell Press", muscleGroup: "Chest", equipment: "Dumbbell" },
  { name: "Decline Dumbbell Press", muscleGroup: "Chest", equipment: "Dumbbell" },
  { name: "Chest Fly", muscleGroup: "Chest", equipment: "Machine" },
  { name: "Cable Fly", muscleGroup: "Chest", equipment: "Cable" },
  { name: "Pec Deck", muscleGroup: "Chest", equipment: "Machine" },
  { name: "Push Up", muscleGroup: "Chest", equipment: "Bodyweight" },

  // Back
  { name: "Pull Up", muscleGroup: "Back", equipment: "Bodyweight" },
  { name: "Chin Up", muscleGroup: "Back", equipment: "Bodyweight" },
  { name: "Lat Pulldown", muscleGroup: "Back", equipment: "Cable" },
  { name: "Close Grip Pulldown", muscleGroup: "Back", equipment: "Cable" },
  { name: "Barbell Row", muscleGroup: "Back", equipment: "Barbell" },
  { name: "Pendlay Row", muscleGroup: "Back", equipment: "Barbell" },
  { name: "T-Bar Row", muscleGroup: "Back", equipment: "Machine" },
  { name: "Seated Cable Row", muscleGroup: "Back", equipment: "Cable" },
  { name: "Single Arm Dumbbell Row", muscleGroup: "Back", equipment: "Dumbbell" },
  { name: "Straight Arm Pulldown", muscleGroup: "Back", equipment: "Cable" },

  // Shoulders
  { name: "Overhead Press", muscleGroup: "Shoulders", equipment: "Barbell" },
  { name: "Shoulder Press", muscleGroup: "Shoulders", equipment: "Machine" },
  { name: "Dumbbell Shoulder Press", muscleGroup: "Shoulders", equipment: "Dumbbell" },
  { name: "Arnold Press", muscleGroup: "Shoulders", equipment: "Dumbbell" },
  { name: "Lateral Raise", muscleGroup: "Shoulders", equipment: "Dumbbell" },
  { name: "Cable Lateral Raise", muscleGroup: "Shoulders", equipment: "Cable" },
  { name: "Rear Delt Fly", muscleGroup: "Shoulders", equipment: "Machine" },
  { name: "Face Pull", muscleGroup: "Shoulders", equipment: "Cable" },

  // Biceps
  { name: "Barbell Curl", muscleGroup: "Biceps", equipment: "Barbell" },
  { name: "EZ Bar Curl", muscleGroup: "Biceps", equipment: "EZ Bar" },
  { name: "Dumbbell Curl", muscleGroup: "Biceps", equipment: "Dumbbell" },
  { name: "Hammer Curl", muscleGroup: "Biceps", equipment: "Dumbbell" },
  { name: "Incline Dumbbell Curl", muscleGroup: "Biceps", equipment: "Dumbbell" },
  { name: "Cable Curl", muscleGroup: "Biceps", equipment: "Cable" },
  { name: "Preacher Curl", muscleGroup: "Biceps", equipment: "Machine" },

  // Triceps
  { name: "Triceps Pushdown", muscleGroup: "Triceps", equipment: "Cable" },
  { name: "Rope Pushdown", muscleGroup: "Triceps", equipment: "Cable" },
  { name: "Skull Crushers", muscleGroup: "Triceps", equipment: "EZ Bar" },
  { name: "Close Grip Bench Press", muscleGroup: "Triceps", equipment: "Barbell" },
  { name: "Overhead Triceps Extension", muscleGroup: "Triceps", equipment: "Cable" },
  { name: "Dips", muscleGroup: "Triceps", equipment: "Bodyweight" },

  // Forearms
  { name: "Wrist Curl", muscleGroup: "Forearms", equipment: "Barbell" },
  { name: "Reverse Wrist Curl", muscleGroup: "Forearms", equipment: "Barbell" },
  { name: "Behind The Back Wrist Curl", muscleGroup: "Forearms", equipment: "Barbell" },
  { name: "Farmer Walk", muscleGroup: "Forearms", equipment: "Dumbbell" },

  // Legs
  { name: "Back Squat", muscleGroup: "Legs", equipment: "Barbell" },
  { name: "Front Squat", muscleGroup: "Legs", equipment: "Barbell" },
  { name: "Hack Squat", muscleGroup: "Legs", equipment: "Machine" },
  { name: "Leg Press", muscleGroup: "Legs", equipment: "Machine" },
  { name: "Bulgarian Split Squat", muscleGroup: "Legs", equipment: "Dumbbell" },
  { name: "Walking Lunge", muscleGroup: "Legs", equipment: "Dumbbell" },
  { name: "Reverse Lunge", muscleGroup: "Legs", equipment: "Dumbbell" },
  { name: "Romanian Deadlift", muscleGroup: "Legs", equipment: "Barbell" },
  { name: "Stiff Leg Deadlift", muscleGroup: "Legs", equipment: "Barbell" },
  { name: "Good Morning", muscleGroup: "Legs", equipment: "Barbell" },
  { name: "Leg Extension", muscleGroup: "Legs", equipment: "Machine" },
  { name: "Lying Leg Curl", muscleGroup: "Legs", equipment: "Machine" },
  { name: "Seated Leg Curl", muscleGroup: "Legs", equipment: "Machine" },
  { name: "Standing Calf Raise", muscleGroup: "Legs", equipment: "Machine" },
  { name: "Seated Calf Raise", muscleGroup: "Legs", equipment: "Machine" },
  { name: "Smith Machine Squat", muscleGroup: "Legs", equipment: "Smith Machine" },

  // Glutes
  { name: "Hip Thrust", muscleGroup: "Glutes", equipment: "Barbell" },
  { name: "Glute Bridge", muscleGroup: "Glutes", equipment: "Bodyweight" },
  { name: "Cable Kickback", muscleGroup: "Glutes", equipment: "Cable" },
  { name: "Abductor Machine", muscleGroup: "Glutes", equipment: "Machine" },

  // Core
  { name: "Crunch", muscleGroup: "Core", equipment: "Bodyweight" },
  { name: "Cable Crunch", muscleGroup: "Core", equipment: "Cable" },
  { name: "Sit Up", muscleGroup: "Core", equipment: "Bodyweight" },
  { name: "Plank", muscleGroup: "Core", equipment: "Bodyweight" },
  { name: "Side Plank", muscleGroup: "Core", equipment: "Bodyweight" },
  { name: "Hanging Leg Raise", muscleGroup: "Core", equipment: "Bodyweight" },
  { name: "Ab Wheel Rollout", muscleGroup: "Core", equipment: "Ab Wheel" },
  { name: "Russian Twist", muscleGroup: "Core", equipment: "Bodyweight" },
  { name: "Mountain Climbers", muscleGroup: "Core", equipment: "Bodyweight" },

  // Cardio
  { name: "Walking", muscleGroup: "Cardio", equipment: "None" },
  { name: "Running", muscleGroup: "Cardio", equipment: "None" },
  { name: "Treadmill", muscleGroup: "Cardio", equipment: "Machine" },
  { name: "Cycling", muscleGroup: "Cardio", equipment: "Bike" },
  { name: "Exercise Bike", muscleGroup: "Cardio", equipment: "Bike" },
  { name: "Rowing Machine", muscleGroup: "Cardio", equipment: "Machine" },
  { name: "Stair Climber", muscleGroup: "Cardio", equipment: "Machine" },
  { name: "Jump Rope", muscleGroup: "Cardio", equipment: "Rope" },
  { name: "Elliptical", muscleGroup: "Cardio", equipment: "Machine" },

];
