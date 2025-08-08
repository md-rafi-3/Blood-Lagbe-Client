# 🩸 Blood Donation Application

This application is a user-friendly platform that connects blood donors with those in need. Built using the MERN Stack, it aims to make the blood donation process easier and more efficient.

---

## 🔗 Live Links

- 🌐 **Live Site:** [blood-donation-app.web.app](https://blood-lagbe-6aef7.web.app)

---

## 🌟 Key Features

1. ✅ **Role-Based Access Control:** Dashboard and permissions vary based on Admin, Donor, and Volunteer roles.
2. 🔐 **Authentication via Email and Password (Firebase).**
3. 🏥 **District and Subdistrict Selection:** Dropdown with Bangladeshi district and upazila data (from GitHub).
4. 🖼️ **Image Upload:** Avatar and blog thumbnails uploaded using ImageBB API.
5. 🩸 **Blood Request Management:** Donors can create, update, delete, and change the status of their own requests.
6. 👥 **User Management (Admin):** Admin can block/unblock users and change roles.
7. 🔍 **Donor Search:** Search donors by blood group, district, and upazila.
8. 📝 **Blog & Content Management:** Add, publish/unpublish, delete, and filter blogs.
9. 📱 **Fully Responsive:** Optimized for mobile, tablet, and desktop devices.
10. 🔐 **Private Route Persistence:** Page doesn’t redirect to login even after reload.
11. 🛡️ **JWT Protection:** Private routes and APIs are secured via Firebase Admin SDK.
12. 📦 **Using TanStack Query:** For data fetching in all GET requests.
13. 📢 **SweetAlert2 Notifications:** Beautiful toast/sweet alerts for all operations.
14. 💳 **Stripe Integration:** Users can donate via the Funding page.
15. 📈 **Dashboard Statistics:** Displays Total Users, Total Funding, and Total Requests.
16. 👤 **Profile Page Update:** Users can edit profile info (except email) from dashboard.
17. 🕒 **Recent Requests View:** Donor Dashboard displays the 3 latest requests.
18. 📚 **Blog Detail Page:** Separate page to read full blog content.

---

## ⚙️ Technology Stack

- **Frontend:** React.js, Tailwind CSS, DaisyUI, React Router, TanStack Query, Firebase Auth
- **Backend:** Node.js, Express.js, MongoDB, Firebase Admin, JWT
- **Others:** ImageBB API, Stripe, Jodit Editor, SweetAlert2

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js & npm installed
- MongoDB database
- Firebase project setup (for authentication and admin SDK)
- Stripe account for payments

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/your-username/blood-donation-app.git
cd blood-donation-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the root directory and add the required variables:

```
VITE_API_URL=your_api_url
VITE_IMAGEBB_KEY=your_imgbb_key
VITE_FIREBASE_API_KEY=your_firebase_key
... other Firebase and Stripe keys ...
```

4. **Run the development server**

```bash
npm run dev
```



---

**Enjoy contributing to a life-saving platform!**
