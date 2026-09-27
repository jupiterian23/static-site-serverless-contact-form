# 🚀 Static Site with Serverless Contact Form

A complete serverless contact form application built using **React, JavaScript, HTML, CSS, Amazon S3, API Gateway, AWS Lambda, Amazon SNS, CloudWatch, and IAM**.

The project demonstrates how to build and deploy a static frontend with a completely serverless backend and real-time email notifications.

---

## 📌 Overview

This project contains a responsive React contact form hosted on **Amazon S3**.

When a user submits the form:

```text
User
  ↓
React Website
  ↓
Amazon S3
  ↓
Amazon API Gateway
  ↓
AWS Lambda
  ↓
Amazon SNS
  ↓
Email Notification
```

Lambda also sends execution and submission information to **Amazon CloudWatch Logs**.

---

## 🧩 AWS Services

* 🪣 **Amazon S3** — Static website hosting
* 🌐 **Amazon API Gateway** — HTTP API endpoint
* ⚡ **AWS Lambda** — Serverless backend
* 📧 **Amazon SNS** — Email notifications
* 📊 **Amazon CloudWatch** — Lambda logging and monitoring
* 🔐 **AWS IAM** — Roles and permissions

---

## 🛠️ Technologies

### Frontend

* React 18
* JavaScript
* HTML5
* CSS3
* Responsive Web Design

### Backend / Cloud

* Python 3.12
* AWS Lambda
* Amazon API Gateway
* Amazon SNS
* Amazon S3
* Amazon CloudWatch
* AWS IAM

### Tools

* AWS CLI
* Git
* GitHub
* Linux / WSL

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │        User         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Amazon S3        │
                    │  Static Website     │
                    └──────────┬──────────┘
                               │
                               │ POST
                               ▼
                    ┌─────────────────────┐
                    │  API Gateway        │
                    │     HTTP API        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    AWS Lambda       │
                    │     Python 3.12     │
                    └──────┬────────┬─────┘
                           │        │
                    Publish│        │Logs
                           ▼        ▼
                 ┌──────────────┐ ┌──────────────┐
                 │  Amazon SNS  │ │  CloudWatch  │
                 │ Notifications│ │     Logs     │
                 └───────┬──────┘ └──────────────┘
                         │
                         ▼
                  📧 Email Inbox
```

---

## 🌐 Live Website

**S3 Static Website:**

```text
http://jupiterian23-serverless-contact-form.s3-website.ap-south-1.amazonaws.com
```

The live website was tested successfully by submitting a real contact form.

---

## 🔗 API Gateway Endpoint

```text
https://hjf3crttfi.execute-api.ap-south-1.amazonaws.com
```

The frontend sends contact-form submissions to this endpoint using an HTTP `POST` request.

---

## 📧 SNS Notification

**SNS Topic:**

```text
serverless-contact-form-notifications
```

**Topic ARN:**

```text
arn:aws:sns:ap-south-1:751955865143:serverless-contact-form-notifications
```

The SNS topic has an email subscription configured for contact-form notifications.

---

## ⚡ Lambda Function

**Function Name:**

```text
serverless-contact-form
```

**Runtime:**

```text
Python 3.12
```

**Handler:**

```text
index.lambda_handler
```

The Lambda function:

1. Receives the API Gateway request.
2. Parses the JSON request body.
3. Validates the name, email, and message.
4. Logs the submission to CloudWatch.
5. Publishes the submission to SNS.
6. Returns a JSON success response.

---

## 🔐 IAM Configuration

Lambda uses the IAM role:

```text
serverless-contact-form-lambda-role
```

The role includes:

* AWS Lambda basic execution permissions
* Permission to publish messages to the project's SNS topic

The SNS publishing permission is restricted to:

```text
arn:aws:sns:ap-south-1:751955865143:serverless-contact-form-notifications
```

---

## 🌐 CORS Configuration

API Gateway is configured to allow:

```text
Methods:
POST
OPTIONS
```

```text
Headers:
content-type
```

The API was tested with an `OPTIONS` preflight request to verify CORS functionality.

---

## 🧪 Testing

### 1. Local Website

The frontend was tested using:

```bash
python3 -m http.server 8000 --directory website
```

Website:

```text
http://localhost:8000
```

---

### 2. API Gateway Test

The API was tested using `curl`:

```bash
curl -X POST \
  "https://hjf3crttfi.execute-api.ap-south-1.amazonaws.com" \
  -H "Content-Type: application/json" \
  -d '{"name":"Shubham","email":"test@example.com","message":"Hello from API Gateway"}'
```

Expected response:

```json
{
  "message": "Message received successfully!"
}
```

---

### 3. CORS Test

The API Gateway preflight request was tested successfully:

```bash
curl --max-time 10 -i -X OPTIONS \
  "https://hjf3crttfi.execute-api.ap-south-1.amazonaws.com" \
  -H "Origin: http://localhost:8000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type"
```

---

### 4. Lambda Test

Lambda was verified as:

```text
Function: serverless-contact-form
Runtime: Python 3.12
State: Active
```

---

### 5. CloudWatch Test

Lambda submissions were verified using:

```bash
aws logs tail /aws/lambda/serverless-contact-form \
  --since 10m \
  --profile shubham-admin \
  --region ap-south-1
```

CloudWatch successfully recorded the submitted contact information.

---

### 6. Email Notification Test

A real submission was sent through the **live S3 website**.

The complete notification flow was successfully verified:

```text
Website
   ↓
API Gateway
   ↓
Lambda
   ↓
SNS
   ↓
Email Inbox
```

---

## 📁 Project Structure

```text
static-site-serverless-contact-form/
│
├── website/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── lambda/
│   └── index.py
│
├── .gitignore
├── README.md
├── bucket-policy.json
├── lambda-trust-policy.json
└── sns-publish-policy.json
```

Generated files such as:

```text
lambda.zip
response.json
__pycache__/
```

are excluded from Git using `.gitignore`.

---

## 🚀 Deployment

### Upload Website to S3

```bash
aws s3 sync website/ \
  s3://jupiterian23-serverless-contact-form/ \
  --profile shubham-admin \
  --region ap-south-1
```

### Deploy Lambda

```bash
aws lambda update-function-code \
  --function-name serverless-contact-form \
  --zip-file fileb://lambda.zip \
  --profile shubham-admin \
  --region ap-south-1
```

---

## 🔄 End-to-End Request Flow

```text
1. User opens S3 website
        ↓
2. React renders contact form
        ↓
3. User submits name, email and message
        ↓
4. JavaScript sends POST request
        ↓
5. API Gateway receives request
        ↓
6. API Gateway invokes Lambda
        ↓
7. Lambda validates request
        ↓
8. Lambda logs submission to CloudWatch
        ↓
9. Lambda publishes message to SNS
        ↓
10. SNS sends email notification
        ↓
11. User receives confirmation response
```

---

## 🎯 Skills Demonstrated

* ☁️ AWS Serverless Architecture
* ⚡ AWS Lambda
* 🌐 API Gateway
* 🪣 S3 Static Website Hosting
* 📧 SNS Notifications
* 📊 CloudWatch Logging
* 🔐 IAM Roles and Policies
* 🌍 CORS Configuration
* ⚛️ React
* 🟨 JavaScript
* 🎨 HTML & CSS
* 🐍 Python
* 🐧 Linux / WSL
* 🔧 AWS CLI
* 🐙 Git & GitHub

---

## 🧠 Learning Outcome

Through this project, I learned how to:

* Build a React-based frontend without a traditional backend server.
* Host a static website using Amazon S3.
* Create and integrate an HTTP API using API Gateway.
* Develop a Python Lambda function.
* Configure CORS for browser-based API requests.
* Use IAM roles and least-privilege permissions.
* Publish application events through Amazon SNS.
* Send automated email notifications.
* Monitor serverless applications using CloudWatch.
* Test a complete serverless application from frontend to email delivery.

---

## 🏆 Project Status

```text
✅ React Frontend
✅ Responsive HTML/CSS
✅ JavaScript Form Handling
✅ S3 Static Website
✅ API Gateway
✅ AWS Lambda
✅ SNS Email Notifications
✅ CloudWatch Logging
✅ IAM Configuration
✅ CORS Configuration
✅ End-to-End Testing
✅ GitHub Repository
```

**Project #6 — Completed Successfully 🚀**

---

## 👨‍💻 Author

**Shubham Gorule**

GitHub: https://github.com/jupiterian23
