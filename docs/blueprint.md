# **App Name**: Local Video Streamer

## Core Features:

- Video Path Retrieval: Read the local video directory and create a list of video file paths. Make sure to handle file system access securely.
- Video Clip Display: Display video clips as thumbnails in a grid layout. Each thumbnail should be clickable.
- Video Playback: Implement a video player component that streams and plays the selected video when a clip is clicked.
- Routing and Navigation: Set up routing to handle navigation between the clip display and the video player. Use Next.js routing for smooth transitions.
- Play / Pause: Starts or stops video playback.
- Seek Bar / Timeline: Allows jumping to a specific part of the video.
- Volume Control: Increase, decrease, or mute sound.
- Full Screen Toggle: Expands video to full screen.
- Playback Speed: Allows setting video speed (e.g., 0.5x, 1x, 2x).
- Current Time / Duration Display: Shows current playback time and total duration.

## Style Guidelines:

- Primary color: Dark grey (#333) for the background to provide a theater-like feel.
- Secondary color: Light grey (#f0f0f0) for text to ensure readability against the dark background.
- Accent: Teal (#008080) for interactive elements like play buttons and search highlights.
- Use a grid layout for displaying video clips, ensuring responsiveness for different screen sizes.
- Simple and recognizable icons for playback controls (play, pause, volume, etc.).
- Subtle transitions when hovering over video clips or when starting/pausing playback.
- Background color of the whole page: Dark navy blue (#1a1a2e)
- Text color, button text: White (#fff)
- Primary button background: Bootstrap blue (#0d6efd)
- Subtext / muted text: Bootstrap secondary gray (#6c757d)
- Info card background, error message background: Dark grayish blue (#2f2f3d)
- Play button: Bootstrap green (#28a745)
- Pause button: Bootstrap yellow (#ffc107)
- Video player background: Black (#000)
- Error message text: Bootstrap red (#dc3545)
- Loader border: Light gray (#f3f3f3)
- Border around video clips: Dark border (#3d3f4b)
- Clip thumbnail background: Slate gray (#4a4e5e)
- Secondary clip info text: Light gray-blue (#adb5bd)

## Original User Request:
I want to implement a project where all videos from a specific local folder (e.g., C:\Users\Downloads\all) are uploaded to the web and displayed as clips. When a clip is clicked, it should play the corresponding video. Currently, I’m able to fetch and display all videos using Clip.tsx with the help of a Flask backend (server.py). However, when I click on a video in Clip.tsx, it doesn’t play in Play.tsx. I’ve attached screenshots showing the outputs of both components.

The main files used in this project are:

server.py – Flask backend for serving video files

App.tsx – Main React component for routing

Clip.tsx – Displays all videos as clickable clips

Play.tsx – Plays the selected video

I would like to build a simple React-based webpage that loads all videos from my custom path (C:\Users\Downloads\all) and handles playback properly.
  