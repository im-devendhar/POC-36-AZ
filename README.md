# POC-36-AZ

# Node.js CI/CD Project on Azure

This project demonstrates a full **CI/CD pipeline** for a Node.js web application using **Azure DevOps** and **Azure App Service**.

---

## Step 1: Create a Resource Group
1. Go to [Azure Portal](https://portal.azure.com).  
2. In the search bar, type **Resource Groups** → click **+ Create**.  
3. Select your **Subscription**.  
4. Enter a **Resource Group name** (e.g., `nodejs-cicd-rg`).  
5. Choose a **Region** close to you (e.g., East US).  
6. Click **Review + Create** → then **Create**.  

---

## Step 2: Create an App Service Plan
1. In the search bar, type **App Service plans** → click **+ Create**.  
2. Select your **Subscription** and the Resource Group you created.  
3. Enter **App Service Plan name** (e.g., `nodejs-cicd-plan`).  
4. Select **Operating System = Linux**.  
5. Select **Region** = same as Resource Group.  
6. Choose **Pricing Plan** → **Free F1** (good for testing).  
7. Click **Review + Create** → then **Create**.  

---

## Step 3: Create an App Service (Web App)
1. In the search bar, type **App Services** → click **+ Create**.  
2. Select **Subscription** and **Resource Group**.  
3. Enter a unique **Name** (e.g., `nodejs-cicd-demo`).  
   - This becomes your URL → `https://nodejs-cicd-demo.azurewebsites.net`.  
4. Publish → **Code**.  
5. Runtime stack → **Node.js 16 LTS** (or latest LTS).  
6. Operating System → **Linux**.  
7. Region → same as Resource Group.  
8. App Service Plan → select the one you created (`nodejs-cicd-plan`).  
9. Click **Review + Create** → then **Create**.  

---

## Step 4 (Optional): Enable Application Insights
1. Go to your App Service → left menu → **Application Insights**.  
2. Click **Enable** → choose a new or existing resource.  
3. Select **Region** (same as app).  
4. Click **Apply**.  

---

## Step 5: Note down values for Pipeline
- **App Service Name** → e.g., `nodejs-cicd-demo` → use as `webAppName` in CD pipeline.  
- **Resource Group Name** → e.g., `nodejs-cicd-rg`.  
- **Subscription ID** → for creating Azure DevOps service connection.  

# 🔵 Step 6: Create an Azure Service Connection in Azure DevOps

To allow your pipeline to deploy to Azure App Service, you need to create a Service Connection.

---

## 1️⃣ Navigate to Service Connections

1. Open your **Azure DevOps Project**.
2. Click **Project Settings** (bottom-left corner).
3. Under **Pipelines**, select **Service connections**.
4. Click **New service connection** → choose **Azure Resource Manager** → **Next**.

---

## 2️⃣ Configure the Service Connection

- **Identity Type:** `App registration (automatic)`  
  - Azure DevOps will automatically create a service principal for secure access.

- **Credential:** `Workload identity federation`  
  - Recommended for secure authentication without storing secrets.

- **Scope Level:** `Subscription`  
  - Gives access to your Azure subscription.  
  - *(Optional)* To restrict access, select **Resource Group** → `nodejs-cicd-rg`.

- **Service Connection Name:** `NodeJS-CI-CD-Connection`  
  - Use a meaningful name to reference it in your pipeline.

- **Service Management Reference:** Leave blank unless your organization requires it.

- **Description:** `Service connection for Node.js CI/CD pipeline` (optional)

- **Security:** Check **Grant access permission to all pipelines** ✅

---

## 3️⃣ Save the Service Connection

1. Click **Save**.
2. Azure DevOps will create the connection and verify access to your subscription/resource group.
3. You can now use this connection in your pipeline YAML under `azureSubscription`.

   
## Step 7: Create CI/CD Pipeline for Node.js Express App

This step sets up the **Azure DevOps pipeline** to automatically build, test, and deploy your Node.js Express app from GitHub to Azure App Service.

---

### 7.1: Create a New Pipeline

1. Open your **Azure DevOps Project** → go to **Pipelines → Create Pipeline**.
2. Select **GitHub** as the repository source.
3. Authorize Azure DevOps to access your GitHub account.
4. Select the repository containing your Node.js Express app.
5. When prompted to select a template, choose **Node.js Express Web app to Linux on Azure**.

---

### 7.2: Configure Pipeline

1. Use the default pipeline template or customize it as needed.
2. Set your **Azure Service Connection** (created in Step 6) so the pipeline can deploy to Azure.
3. Set your **App Service Name** to match the one you created (e.g., `nodejs-cicd-demo`).
4. Configure the pipeline to:
   - Install Node.js
   - Install project dependencies
   - Build the app (if applicable)
   - Run tests (optional)
   - Package artifacts for deployment
   - Deploy to Azure App Service

---

### 7.3: Run the Pipeline

1. Commit your pipeline configuration to your GitHub repository.
2. In Azure DevOps → **Pipelines**, click **Run pipeline** → select the branch (e.g., `main`) → click **Run**.
3. The pipeline will:
   - Pull code from GitHub
   - Build and test your app
   - Deploy it to Azure App Service

---

### 7.4: Verify Deployment

- Open your browser → go to your App Service URL, e.g., `https://nodejs-cicd-demo.azurewebsites.net`.
- You should see your Node.js app running (e.g., `Hello from Node.js CI/CD with Azure 🚀`).

---

✅ Now, **every push to the main branch** will automatically trigger the pipeline to build and deploy your Node.js Express app to Azure.

---

✅ Your pipeline can now securely deploy your Node.js application to Azure App Service.

---

Once these resources are ready, you can connect Azure DevOps pipelines to deploy your Node.js app automatically.
