# Cloud Video Uploader <!-- omit from toc -->

> A fullstack app to showcase the core functionality of a video uploading system in a cloud-based environment.
>
> Allows users to upload videos, which are then processed and stored in the cloud. The primary functionalities include user authentication, video upload, transcoding, and storage.

## Table of Contents <!-- omit from toc -->

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo])
- [High-Level Architecture](#high-level-architecture)
- [Usage Trace](#usage-trace)
- [License](#license)

## Features

- Users can sign in/out using their Google account.
- Authenticated users can upload videos.
- Uploaded videos are transcoded into multiple formats (e.g., 360p, 720p).
- Users, whether signed in or not, can view a list of uploaded videos.
- Users can view individual videos.

## Tech Stack

**Frontend:**

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js (React)](https://nextjs.org/)

**Backend:**

- [Express.js](https://expressjs.com/)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Firebase Functions](https://firebase.google.com/docs/functions)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)

**Cloud Services:**

- [Google Cloud Storage](https://cloud.google.com/storage)
- [Google Cloud Pub/Sub](https://cloud.google.com/pubsub)
- [Google Cloud Run](https://cloud.google.com/run)

**Containerization:**

- [Docker](https://www.docker.com/)

**Video Processing:**

- [FFmpeg](https://ffmpeg.org/)

## Demo

![main demo](demos/main_demo.gif)

## High-Level Architecture

The project utilizes various cloud services for different aspects of its functionality:

- **Video Storage (Cloud Storage):** Google Cloud Storage hosts raw and processed videos.
- **Video Upload Events (Cloud Pub/Sub):** Publish messages to a Cloud Pub/Sub topic to add durability for video upload events and process videos asynchronously.
- **Video Processing Workers (Cloud Run):** Utilizes Cloud Run to scale up and down based on video processing workloads using FFMPEG for transcoding.
- **Video Metadata (Firestore):** Stores metadata in Firestore for displaying processed videos in the web client.
- **Video API (Firebase Functions):** Uses Firebase Functions to create a simple API for uploading videos and retrieving video metadata.
- **Web Client (Next.js / Cloud Run):** Next.js is employed to build a web client for user interaction, hosted on Cloud Run.
- **Authentication (Firebase Auth):** Firebase Auth handles user authentication, integrating with Google Sign-in.

## Usage Trace

1. **User Sign Up:** Users can sign up using their Google account, with Firebase Auth handling user creation and Firestore storing additional user information.

2. **Video Upload:** Authenticated users can upload videos using a signed URL generated by a public Firebase Function. This ensures authentication before allowing video uploads.

3. **Video Processing:** Videos are processed asynchronously using Cloud Pub/Sub for decoupling upload and processing. Cloud Run scales based on processing workloads, and processed videos are stored in Cloud Storage with metadata in Firestore.

## License

This project is licensed under the [MIT License](./LICENSE).
