export const FIRESTORE_RULES = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
    match /feedback/{id} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if false;
    }
    match /usageLogs/{id} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userID;
      allow create: if request.auth != null && request.resource.data.userID == request.auth.uid;
      allow update, delete: if false;
    }
  }
}`;

export const STORAGE_RULES = `
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profilePhotos/{uid}.jpg {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}`;