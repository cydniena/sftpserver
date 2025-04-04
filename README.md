[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=18164197&assignment_repo_type=AssignmentRepo)
# Project
This repository contains your submissions for the project.

Note that this repo is writable by you. Any changes you or your team members made in this repo can be pushed to origin.

If you have changes or discover issues, you can also create an issue.

# Scrooge Global Bank CRM System

## Overview
Scrooge Global Bank requires a robust Customer Relationship Management (CRM) system to manage client interactions, streamline processes, and improve profitability. The system must be secure, scalable, cloud-native, and compliant with international banking regulations.

## Features
The CRM system will include the following functionalities:

### Data Management
- **Agents**: Bank representatives who manage client profiles.
- **Clients & Accounts**: Customer profiles and banking accounts.
- **Logs**: System and transaction logs.
- **Transactions**: Banking transactions linked to client accounts.

### Secure Transaction Processing
- Retrieves transaction logs from a **Secure File Transfer Protocol (SFTP) server**, which stores transaction data from the mainframe.
- A "mock" SFTP server will be used for project testing.

### User Roles
1. **Admin**
   - Manages accounts in the CRM.
   - Has access to all system data and user management features.
2. **Agent**
   - Can create client profiles and accounts.
   - Only has access to their assigned clients.

### Frontend Application
- A user-friendly web interface for back-office operations.
- Functional and easy to use (no need for fancy UI design).
- Includes pages to support core CRM operations.

## Technologies Used
- **Backend**: Node.js
- **Frontend**: React and Vite
- **Database**: [Specify database technology]
- **Cloud Services**: AWS
- **Security**: Implements industry-standard authentication and authorization mechanisms.

## Setup & Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/cs301-itsa/project-2024-25t2-project-2024-25t2-g1-t1.git
   cd your-repo-name
   ```
2. Install dependencies:
   ```sh
   [Provide commands based on the technology stack]
   ```
3. Configure environment variables:
   - Set up credentials for SFTP server.
   - Define database connection settings.
4. Run the application:
   ```sh
   [Provide the command to start the application]
   ```
