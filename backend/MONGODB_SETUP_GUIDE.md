# 🗄️ MongoDB Integration Setup Guide - MediTrust AI

## ✅ What's Been Completed

All MongoDB integration files have been created and configured:

### 1️⃣ Packages Installed
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variable management

### 2️⃣ Files Created
- ✅ `db.js` - MongoDB connection handler
- ✅ `models/Patient.js` - Patient data schema
- ✅ `models/MedicalRecord.js` - Medical records schema
- ✅ `models/AiLog.js` - AI chat logs schema
- ✅ `models/AccessLog.js` - Access control logs schema
- ✅ `.env` - Environment configuration file

### 3️⃣ API Routes Added to server.js
- `POST /api/add-mock-data` - Insert sample data
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `GET /api/records` - Get all medical records
- `GET /api/records/patient/:patientId` - Get records by patient
- `GET /api/ai-logs` - Get AI conversation logs
- `GET /api/access-logs` - Get access control logs

---

## 🚀 Next Steps - Connect to MongoDB Atlas

### Step 1: Create MongoDB Atlas Account
1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** and create an account
3. Create a **free M0 cluster** (select your nearest region)

### Step 2: Get Your Connection String
1. In MongoDB Atlas, click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Select **Node.js** as the driver
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```

### Step 3: Update .env File
1. Open `backend/.env` file
2. Replace the `MONGO_URI` value with your actual connection string:
   ```env
   MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/meditrust
   ```
   
   **Important:** Replace:
   - `<username>` → your MongoDB username
   - `<password>` → your MongoDB password
   - `cluster0.xxxxx` → your actual cluster address
   - Keep `meditrust` as the database name (or change it if you prefer)

### Step 4: Whitelist Your IP Address
1. In MongoDB Atlas, go to **Network Access**
2. Click **"Add IP Address"**
3. Either:
   - Click **"Add Current IP Address"** (recommended for testing)
   - Or **"Allow Access from Anywhere"** (0.0.0.0/0) for development

### Step 5: Restart the Server
Stop the current server (Ctrl+C) and restart:
```bash
cd backend
node server.js
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 MediTrust AI Backend running on http://localhost:3001
```

---

## 🧪 Testing the Integration

### 1. Add Mock Data
```bash
# Using curl
curl -X POST http://localhost:3001/api/add-mock-data

# Or use Postman/Thunder Client with POST request to:
# http://localhost:3001/api/add-mock-data
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Mock data added successfully!",
  "patient": { ... },
  "record": { ... }
}
```

### 2. Fetch Patients
```bash
curl http://localhost:3001/api/patients
```

### 3. Fetch Medical Records
```bash
curl http://localhost:3001/api/records
```

---

## 📊 Verify in MongoDB Atlas

1. Go to your MongoDB Atlas dashboard
2. Click **"Browse Collections"** on your cluster
3. You should see the `meditrust` database with collections:
   - `patients`
   - `medicalrecords`
   - `ailogs`
   - `accesslogs`

---

## 🔗 Frontend Integration

To use MongoDB data in your React frontend, update your API calls:

### Example: Fetch Records
```typescript
// In your React component or API service
const fetchRecordsFromDB = async () => {
  const response = await fetch('http://localhost:3001/api/records');
  const data = await response.json();
  return data;
};

// Usage
useEffect(() => {
  fetchRecordsFromDB()
    .then(records => {
      console.log('Records from MongoDB:', records);
      setRecords(records);
    })
    .catch(err => console.error('Error:', err));
}, []);
```

---

## ⚙️ Environment Variables Reference

Your `.env` file should contain:

```env
# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/meditrust

# OpenAI (already configured)
OPENAI_API_KEY=your_openai_key_here

# SendGrid (optional - for email features)
SENDGRID_API_KEY=your_sendgrid_key_here

# SerpAPI (optional - for Google Search)
SERPAPI_KEY=your_serpapi_key_here
```

---

## 🐛 Troubleshooting

### Error: "MongoDB Connection Failed"
- ✅ Check your connection string is correct in `.env`
- ✅ Verify your IP is whitelisted in MongoDB Atlas
- ✅ Ensure your MongoDB password doesn't contain special characters (or URL encode them)
- ✅ Check if your cluster is active in MongoDB Atlas

### Error: "MongoServerError: bad auth"
- Your username or password is incorrect
- Update credentials in `.env` file

### Warning: "Duplicate schema index"
- This is just a warning, not an error
- The application will work fine

---

## 📚 Data Models

### Patient Schema
```javascript
{
  patientId: String (unique),
  name: String,
  email: String,
  age: Number,
  gender: String,
  walletId: String,
  healthScore: Number,
  vitals: {
    bp, sugar, cholesterol, bmi
  },
  permissions: Array,
  reminders: Array
}
```

### MedicalRecord Schema
```javascript
{
  patientId: ObjectId (ref: Patient),
  type: String (Lab Report, Scan, etc.),
  doctor: String,
  ipfsHash: String,
  blockchainHash: String,
  summary: String,
  encrypted: Boolean
}
```

---

## 🎯 Summary

✅ **All MongoDB integration files are ready**
⏳ **Waiting for:** Your MongoDB Atlas credentials in `.env` file
🚀 **Once connected:** Your app will store and retrieve real data from MongoDB!

Need help? Check the troubleshooting section or review your MongoDB Atlas setup.
