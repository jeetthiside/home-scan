# Home Scan 🏠🛒

Home Scan is a family grocery and household inventory management application designed to help families stay synchronized on items they need at home.

The goal is simple: no more forgotten grocery items, duplicate purchases, or confusion about who added what to the shopping list.

---

## Version 1 Features

### Authentication

* Google Sign-In using Supabase Authentication
* Persistent login sessions
* Secure user identification

### Group Management

* Create a new family/group
* Join an existing group using a group code
* View all groups linked to your account
* Switch between groups

### Shared Shopping List

* Add grocery items
* View shared items within a group
* Mark items as purchased
* Delete items

### User Experience

* Mobile-friendly design
* Web support
* Android support
* iOS support
* Simple and clean interface

---

## Tech Stack

### Frontend

* React Native
* Expo
* Expo Router
* TypeScript

### Backend

* Supabase

### Database

* PostgreSQL (via Supabase)

### Authentication

* Google OAuth
* Supabase Auth

---

## Database Structure

### profiles

Stores user information.

| Column     | Type      |
| ---------- | --------- |
| id         | uuid      |
| email      | text      |
| name       | text      |
| avatar_url | text      |
| created_at | timestamp |

### groups

Stores family/group information.

| Column     | Type      |
| ---------- | --------- |
| id         | uuid      |
| group_name | text      |
| group_code | text      |
| created_at | timestamp |

### memberships

Connects users with groups.

| Column      | Type      |
| ----------- | --------- |
| id          | uuid      |
| group_id    | uuid      |
| user_id     | uuid      |
| member_name | text      |
| joined_at   | timestamp |

### items

Stores grocery items.

| Column     | Type      |
| ---------- | --------- |
| id         | uuid      |
| group_id   | uuid      |
| item_name  | text      |
| purchased  | boolean   |
| created_at | timestamp |

---

## Project Vision

Home Scan aims to become a complete household management platform where family members can:

* Manage grocery lists together
* Receive real-time updates
* Get notifications when items are added or changed
* Track purchase history
* Manage multiple households/groups

---

## Planned Features (Version 2+)

* Real-time synchronization
* Push notifications
* Custom code genration by users 
* Purchase history
* Add multiple items at single time
* Leave group functionality
* Delete group functionality
* Navigation corrections 

---

## Author

Built by Jeet Sharma as an independent project to solve everyday family grocery coordination problems.

---

## Status

Version: 1.0.0 (MVP)

Current State:

* Authentication Complete
* Group Management Complete ( create group, join group ) 
* Shared Shopping List Complete
* Ready for Version 2 Development
