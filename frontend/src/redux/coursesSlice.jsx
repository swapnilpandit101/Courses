import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch courses from the backend
export const fetchCourses = createAsyncThunk("courses/fetchCourses", async () => {
  const response = await fetch("http://localhost:5000/courses");
  return response.json();
});

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    status: "idle",
    error: null,
  },
  reducers: {
    markCourseCompleted: (state, action) => {
      const course = state.courses.find((course) => course.id === action.payload);
      if (course) {
        course.progress = 100;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { markCourseCompleted } = coursesSlice.actions;
export default coursesSlice.reducer;
