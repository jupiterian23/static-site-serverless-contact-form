# 🚀 Static Site with Serverless Contact Form

A serverless contact form built using React, JavaScript, HTML, CSS, and AWS managed services.

## 🏗️ Architecture

User → Amazon S3 → React → API Gateway → Lambda → SNS → Email

Lambda → CloudWatch Logs

## 🛠️ Technologies Used

- React 18
- JavaScript
- HTML5
- CSS3
- Amazon S3
- Amazon API Gateway
- AWS Lambda
- Amazon SNS
- Amazon CloudWatch
- AWS IAM

## ✨ Features

- Responsive contact form
- React-based frontend
- Form validation
- Loading state
- Success and error messages
- Serverless API
- Email notifications through Amazon SNS
- CloudWatch logging
- Static website hosting with Amazon S3

## 🔄 Request Flow

1. User opens the website hosted on S3.
2. User submits the contact form.
3. JavaScript sends the data to API Gateway.
4. API Gateway invokes Lambda.
5. Lambda validates the data.
6. Lambda publishes the message to SNS.
7. SNS sends the email notification.
8. Lambda records the submission in CloudWatch.

## 🧪 Testing

The application was successfully tested from the local development server and the live S3-hosted website.

The complete flow was verified:

React → API Gateway → Lambda → SNS → Email

## 🔐 Security

The Lambda execution role uses an IAM policy that allows publishing to the project SNS topic.

Sensitive credentials and generated AWS artifacts are excluded through .gitignore.

## 📚 What I Learned

- Building a serverless web application
- Integrating React with API Gateway
- Creating and deploying Lambda functions
- Configuring CORS
- Using IAM roles and permissions
- Publishing messages with SNS
- Monitoring Lambda with CloudWatch
- Hosting static websites with S3
- Testing an end-to-end AWS architecture

## 👨‍💻 Author

**Shubham Gorule**

GitHub: https://github.com/jupiterian23
