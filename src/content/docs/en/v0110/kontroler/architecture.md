---
title: "Kontroler Architecture"
description: "Detailed explanation of how Kontroler's components work together"
---

## Architecture Overview

Kontroler consists of three main components that work together to provide a complete workflow orchestration solution. Each component has specific responsibilities and can operate independently when needed.


## Kubernetes Controller

The controller is the core component responsible for workflow execution and management within Kubernetes.

### Core Features
- Manages API documents (DAG and DAGRun)
- Manages schedule-based executions
- Determines task execution order
- Tracks task states and dependencies
- Handles workflow resumption and retries
- Includes a webhook system for task outcomes


## API Server

The API server acts as the bridge between the UI and the controller, providing:

### Key Responsibilities
- API based DAG creation and management
- Authentication system/Role-based access control (RBAC)
- Log Fetching

### Authentication
The server maintains its own authentication system, separate from the controller. This allows:
- Multiple authentication methods
- Fine-grained access control
- User management
- Token-based authentication
- Integration with existing auth systems

### DAG Management
- Validates DAG definitions
- Stores workflow configurations
- Manages workflow versions
- Handles API requests for workflow operations
- Coordinates with the controller for execution

## Web Interface

The web interface provides a user-friendly way to interact with Kontroler, but it's entirely optional. Kontroler has been architected in a way you can built your own UI if your organisation has certain requirements it needs!

Key features include:

- Visual DAG creation and editing
- Workflow monitoring and status tracking
- Log viewing and debugging tools
- Task execution history
- Workflow visualization
- Basic Pagination (plans to improve this)

The UI communicates exclusively through the API server and never directly with the controller, maintaining a clear separation of concerns.

## Security Considerations

Each component maintains its own security boundary:
- UI relies on API server authentication
- API server manages user permissions
- Controller should operate with limited cluster permissions
- Webhooks currently don't use any authentication mechanisms (coming soon!)


